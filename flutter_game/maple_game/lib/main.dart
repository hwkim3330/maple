import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async';
import 'dart:math';

void main() {
  runApp(const MapleStoryApp());
}

class MapleStoryApp extends StatelessWidget {
  const MapleStoryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MapleStory x Demon Slayer',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: const GameScreen(),
    );
  }
}

// Character definition
class CharacterDef {
  final String id;
  final String name;
  final String movePrefix;
  final int moveFrames;
  final bool hasEyes;

  const CharacterDef({
    required this.id,
    required this.name,
    required this.movePrefix,
    required this.moveFrames,
    required this.hasEyes,
  });
}

const characters = [
  CharacterDef(id: '9401960', name: 'Nezuko', movePrefix: 'Nezuko', moveFrames: 4, hasEyes: true),
  CharacterDef(id: '9401961', name: 'Zenitsu', movePrefix: 'Zenitsu', moveFrames: 3, hasEyes: true),
  CharacterDef(id: '9401962', name: 'Kanao', movePrefix: 'Kanao', moveFrames: 4, hasEyes: true),
  CharacterDef(id: '9401963', name: 'Inosuke', movePrefix: 'Inosuke', moveFrames: 3, hasEyes: false),
];

// Foothold from Nexon game data (993257000 map style)
class Foothold {
  final double x1, y1, x2, y2;
  Foothold(this.x1, this.y1, this.x2, this.y2);

  double getYAt(double x) {
    if (x < x1 || x > x2) return double.infinity;
    if ((x2 - x1).abs() < 0.1) return y1;
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
  }
}

class GameScreen extends StatefulWidget {
  const GameScreen({super.key});

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> with TickerProviderStateMixin {
  // Game state
  bool gameStarted = false;
  bool gameOver = false;
  int selectedCharIndex = 0;
  int currentStage = 0; // 0: main, 1-3: stages

  // Player state
  double playerX = 0;
  double playerY = 0;
  double playerVx = 0;
  double playerVy = 0;
  int playerFacing = 1;
  bool onGround = false;
  int playerFrame = 0;
  bool isMoving = false;
  bool isAttacking = false;
  int attackFrame = 0;

  // Stats
  int hp = 100;
  int maxHp = 100;
  int mp = 50;
  int maxMp = 50;
  int exp = 0;
  int level = 1;
  int score = 0;
  int kills = 0;
  int combo = 0;
  int maxCombo = 0;

  // Mobs
  List<Mob> mobs = [];
  Timer? mobSpawnTimer;

  // Footholds (from Nexon game 993257010 style)
  late List<Foothold> footholds;

  // Camera
  double cameraX = 0;
  double cameraY = 0;

  // Map bounds
  double mapLeft = -620;
  double mapRight = 960;
  double mapTop = -200;
  double mapBottom = 400;

  // Keys pressed
  final Set<LogicalKeyboardKey> _keysPressed = {};

  // Animation
  late AnimationController _animController;
  Timer? _gameLoop;

  // Damage numbers
  List<DamageNumber> damageNumbers = [];

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    )..repeat();

    _initFootholds();
  }

  void _initFootholds() {
    // Footholds based on Nexon game data (main stage 993257000)
    footholds = [
      // Ground level
      Foothold(-55, 10, 960, 10),
      // Left platform
      Foothold(-620, -86, -55, 10),
      // Upper platforms
      Foothold(200, -80, 400, -80),
      Foothold(500, -150, 700, -150),
      Foothold(100, -200, 300, -200),
    ];
  }

  @override
  void dispose() {
    _animController.dispose();
    _gameLoop?.cancel();
    mobSpawnTimer?.cancel();
    super.dispose();
  }

  void startGame() {
    setState(() {
      gameStarted = true;
      gameOver = false;
      playerX = 100;
      playerY = -50;
      playerVx = 0;
      playerVy = 0;
      hp = maxHp;
      mp = maxMp;
      exp = 0;
      score = 0;
      kills = 0;
      combo = 0;
      maxCombo = 0;
      mobs.clear();
      damageNumbers.clear();
    });

    _gameLoop = Timer.periodic(const Duration(milliseconds: 16), (_) => update());
    mobSpawnTimer = Timer.periodic(const Duration(seconds: 2), (_) => spawnMob());

    // Initial mobs
    for (int i = 0; i < 3; i++) {
      spawnMob();
    }
  }

  void spawnMob() {
    if (mobs.length < 8) {
      final random = Random();
      final spawnPoints = [
        [300.0, -100.0],
        [500.0, -100.0],
        [700.0, -100.0],
        [200.0, -200.0],
        [600.0, -200.0],
      ];
      final spawn = spawnPoints[random.nextInt(spawnPoints.length)];
      mobs.add(Mob(
        x: spawn[0] + random.nextDouble() * 100 - 50,
        y: spawn[1],
        hp: 30 + level * 10,
        maxHp: 30 + level * 10,
      ));
    }
  }

  void update() {
    if (!gameStarted || gameOver) return;

    setState(() {
      // Movement
      const speed = 4.0;
      isMoving = false;

      if (_keysPressed.contains(LogicalKeyboardKey.arrowLeft)) {
        playerVx = -speed;
        playerFacing = -1;
        isMoving = true;
      } else if (_keysPressed.contains(LogicalKeyboardKey.arrowRight)) {
        playerVx = speed;
        playerFacing = 1;
        isMoving = true;
      } else {
        playerVx *= 0.8; // Friction
        if (playerVx.abs() < 0.1) playerVx = 0;
      }

      // Jump
      if ((_keysPressed.contains(LogicalKeyboardKey.arrowUp) ||
           _keysPressed.contains(LogicalKeyboardKey.keyC) ||
           _keysPressed.contains(LogicalKeyboardKey.space)) && onGround) {
        playerVy = -12;
        onGround = false;
      }

      // Attack
      if (_keysPressed.contains(LogicalKeyboardKey.keyZ) && !isAttacking) {
        isAttacking = true;
        attackFrame = 0;
        performAttack();
        Future.delayed(const Duration(milliseconds: 400), () {
          if (mounted) {
            setState(() => isAttacking = false);
          }
        });
      }

      // Gravity
      playerVy += 0.6;
      if (playerVy > 15) playerVy = 15; // Terminal velocity

      // Apply velocity
      playerX += playerVx;
      playerY += playerVy;

      // Foothold collision
      onGround = false;
      if (playerVy >= 0) {
        for (final fh in footholds) {
          final fhY = fh.getYAt(playerX);
          if (fhY != double.infinity && playerY >= fhY - 5 && playerY <= fhY + 15) {
            playerY = fhY;
            playerVy = 0;
            onGround = true;
            break;
          }
        }
      }

      // Map bounds
      if (playerY > mapBottom) {
        playerY = mapTop;
        playerVy = 0;
        hp -= 10;
      }
      playerX = playerX.clamp(mapLeft + 30, mapRight - 30);

      // Camera follow (smooth)
      final targetCameraX = playerX - 400;
      final targetCameraY = playerY - 250;
      cameraX += (targetCameraX - cameraX) * 0.1;
      cameraY += (targetCameraY - cameraY) * 0.1;
      cameraX = cameraX.clamp(mapLeft, mapRight - 800);
      cameraY = cameraY.clamp(mapTop, mapBottom - 400);

      // Update mobs
      for (final mob in mobs) {
        mob.update(playerX, playerY, footholds);

        // Mob collision with player (contact damage)
        if (!mob.isDead && (mob.x - playerX).abs() < 25 && (mob.y - playerY).abs() < 40) {
          if (mob.attackCooldown <= 0) {
            hp -= 5 + level;
            mob.attackCooldown = 60;
            combo = 0;
            if (hp <= 0) {
              hp = 0;
              gameOver = true;
              _gameLoop?.cancel();
              mobSpawnTimer?.cancel();
            }
          }
        }
      }

      // Remove dead mobs
      mobs.removeWhere((m) => m.isDead && m.deathTimer > 30);

      // Update damage numbers
      damageNumbers.removeWhere((d) {
        d.y -= 1.5;
        d.life--;
        return d.life <= 0;
      });

      // Animation frame
      if (isMoving && onGround) {
        playerFrame = (playerFrame + 1) % (characters[selectedCharIndex].moveFrames * 4);
      }
      if (isAttacking) {
        attackFrame++;
      }
    });
  }

  void performAttack() {
    final attackRange = 80.0;
    bool hitAny = false;

    for (final mob in mobs) {
      if (!mob.isDead) {
        final dx = mob.x - playerX;
        final dist = dx.abs();
        // Check if mob is in front of player
        if (dist < attackRange &&
            (mob.y - playerY).abs() < 50 &&
            (playerFacing > 0 ? dx > -20 : dx < 20)) {
          final baseDamage = 20 + level * 8;
          final damage = baseDamage + Random().nextInt(baseDamage ~/ 2);
          final isCrit = Random().nextDouble() < 0.2;
          final finalDamage = isCrit ? (damage * 1.5).toInt() : damage;

          mob.hp -= finalDamage;
          mob.hitStun = 10;
          hitAny = true;

          // Knockback
          mob.vx = playerFacing * 3;

          // Damage number
          damageNumbers.add(DamageNumber(
            x: mob.x,
            y: mob.y - 30,
            damage: finalDamage,
            isCrit: isCrit,
          ));

          if (mob.hp <= 0) {
            mob.isDead = true;
            kills++;
            score += 100 + combo * 10;
            combo++;
            if (combo > maxCombo) maxCombo = combo;
            exp += 15 + level * 3;

            // Level up
            if (exp >= level * 100) {
              exp -= level * 100;
              level++;
              maxHp += 15;
              hp = maxHp;
              maxMp += 8;
              mp = maxMp;
            }
          }
        }
      }
    }

    if (!hitAny) {
      combo = 0;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1a1a2e),
      body: KeyboardListener(
        focusNode: FocusNode()..requestFocus(),
        autofocus: true,
        onKeyEvent: (event) {
          if (event is KeyDownEvent) {
            _keysPressed.add(event.logicalKey);
          } else if (event is KeyUpEvent) {
            _keysPressed.remove(event.logicalKey);
          }
        },
        child: Center(
          child: Container(
            width: 800,
            height: 500,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFFff6b35), width: 3),
              borderRadius: BorderRadius.circular(8),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFFff6b35).withOpacity(0.3),
                  blurRadius: 20,
                  spreadRadius: 5,
                ),
              ],
            ),
            child: Stack(
              children: [
                if (!gameStarted) ...[
                  _buildTitleScreen(),
                ] else if (gameOver) ...[
                  _buildGameOverScreen(),
                ] else ...[
                  _buildGameContent(),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTitleScreen() {
    return Stack(
      children: [
        // Background - Demon Slayer map
        Positioned.fill(
          child: Image.asset(
            'assets/map/2024Collabo/foothold_base_0_0.png',
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0xFF2d1b4e), Color(0xFF1a1a2e)],
                ),
              ),
            ),
          ),
        ),
        // Overlay
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Colors.black.withOpacity(0.3),
                Colors.black.withOpacity(0.7),
              ],
            ),
          ),
        ),
        // Content
        Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Title
              ShaderMask(
                shaderCallback: (bounds) => const LinearGradient(
                  colors: [Color(0xFFff6b35), Color(0xFFffd700)],
                ).createShader(bounds),
                child: const Text(
                  'MAPLESTORY',
                  style: TextStyle(
                    fontSize: 42,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    letterSpacing: 4,
                  ),
                ),
              ),
              const Text(
                'x Demon Slayer',
                style: TextStyle(
                  fontSize: 24,
                  color: Color(0xFFff6b35),
                  fontStyle: FontStyle.italic,
                ),
              ),
              const SizedBox(height: 40),

              // Character selection
              const Text('SELECT CHARACTER',
                style: TextStyle(color: Colors.white70, letterSpacing: 2)),
              const SizedBox(height: 15),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(characters.length, (index) {
                  final char = characters[index];
                  final isSelected = index == selectedCharIndex;
                  return GestureDetector(
                    onTap: () => setState(() => selectedCharIndex = index),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      margin: const EdgeInsets.symmetric(horizontal: 8),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: isSelected
                          ? const Color(0xFFff6b35).withOpacity(0.3)
                          : Colors.black45,
                        border: Border.all(
                          color: isSelected ? const Color(0xFFff6b35) : Colors.grey[700]!,
                          width: isSelected ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: isSelected ? [
                          BoxShadow(
                            color: const Color(0xFFff6b35).withOpacity(0.4),
                            blurRadius: 10,
                          ),
                        ] : null,
                      ),
                      child: Column(
                        children: [
                          Image.asset(
                            'assets/npc/${char.id}/stand_0.png',
                            width: 50,
                            height: 65,
                            fit: BoxFit.contain,
                            errorBuilder: (_, __, ___) => Container(
                              width: 50, height: 65,
                              color: Colors.grey[800],
                              child: const Icon(Icons.person, color: Colors.white54),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(char.name,
                            style: TextStyle(
                              fontSize: 11,
                              color: isSelected ? Colors.white : Colors.white70,
                              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                            )),
                        ],
                      ),
                    ),
                  );
                }),
              ),
              const SizedBox(height: 35),

              // Start button
              MouseRegion(
                cursor: SystemMouseCursors.click,
                child: GestureDetector(
                  onTap: startGame,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 12),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFff6b35), Color(0xFFff8c42)],
                      ),
                      borderRadius: BorderRadius.circular(25),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFff6b35).withOpacity(0.5),
                          blurRadius: 15,
                          offset: const Offset(0, 5),
                        ),
                      ],
                    ),
                    child: const Text(
                      'GAME START',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 2,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 25),

              // Controls
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                decoration: BoxDecoration(
                  color: Colors.black38,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Text(
                  'Move: Arrow Keys  |  Jump: C/Space  |  Attack: Z',
                  style: TextStyle(color: Colors.white54, fontSize: 12),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildGameOverScreen() {
    return Stack(
      children: [
        // Dimmed background
        Container(color: Colors.black87),
        Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'GAME OVER',
                style: TextStyle(
                  fontSize: 48,
                  color: Color(0xFFff4444),
                  fontWeight: FontWeight.bold,
                  letterSpacing: 4,
                ),
              ),
              const SizedBox(height: 30),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.black54,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.white24),
                ),
                child: Column(
                  children: [
                    _resultRow('Level', '$level'),
                    _resultRow('Score', '$score'),
                    _resultRow('Kills', '$kills'),
                    _resultRow('Max Combo', '$maxCombo'),
                  ],
                ),
              ),
              const SizedBox(height: 30),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _menuButton('RETRY', Colors.orange, startGame),
                  const SizedBox(width: 20),
                  _menuButton('TITLE', Colors.grey, () {
                    setState(() {
                      gameStarted = false;
                      gameOver = false;
                    });
                  }),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _resultRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(width: 100, child: Text(label, style: const TextStyle(color: Colors.white70))),
          Text(value, style: const TextStyle(color: Colors.orange, fontSize: 18, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _menuButton(String text, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
        decoration: BoxDecoration(
          color: color.withOpacity(0.2),
          border: Border.all(color: color),
          borderRadius: BorderRadius.circular(5),
        ),
        child: Text(text, style: TextStyle(color: color, fontWeight: FontWeight.bold)),
      ),
    );
  }

  Widget _buildGameContent() {
    final char = characters[selectedCharIndex];

    return Stack(
      children: [
        // Background - Demon Slayer map (scrolling)
        Positioned(
          left: -cameraX * 0.5,
          top: 0,
          child: Image.asset(
            'assets/map/2024Collabo/foothold_base_0_0.png',
            height: 500,
            fit: BoxFit.fitHeight,
            errorBuilder: (_, __, ___) => Container(
              width: 1400,
              height: 500,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0xFF87CEEB), Color(0xFFE0F6FF)],
                ),
              ),
            ),
          ),
        ),

        // Second background layer
        Positioned(
          left: 700 - cameraX * 0.5,
          top: 0,
          child: Image.asset(
            'assets/map/2024Collabo/foothold_base_1_0.png',
            height: 500,
            fit: BoxFit.fitHeight,
            errorBuilder: (_, __, ___) => const SizedBox(),
          ),
        ),

        // Footholds (debug/visual)
        ...footholds.map((fh) => Positioned(
          left: fh.x1 - cameraX,
          top: fh.y1 - cameraY + 250,
          child: Container(
            width: (fh.x2 - fh.x1).abs(),
            height: 8,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  const Color(0xFF5a3d2b).withOpacity(0.8),
                  const Color(0xFF8b6914).withOpacity(0.8),
                ],
              ),
              borderRadius: BorderRadius.circular(4),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
          ),
        )),

        // Mobs
        ...mobs.map((mob) => Positioned(
          left: mob.x - 30 - cameraX,
          top: mob.y - 50 - cameraY + 250,
          child: Column(
            children: [
              // Mob HP bar
              if (!mob.isDead)
                Container(
                  width: 40,
                  height: 5,
                  margin: const EdgeInsets.only(bottom: 3),
                  decoration: BoxDecoration(
                    color: Colors.grey[800],
                    borderRadius: BorderRadius.circular(2),
                  ),
                  child: FractionallySizedBox(
                    alignment: Alignment.centerLeft,
                    widthFactor: (mob.hp / mob.maxHp).clamp(0, 1),
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                ),
              // Mob sprite
              Transform(
                alignment: Alignment.center,
                transform: Matrix4.identity()..scale(mob.facing.toDouble(), 1.0),
                child: Opacity(
                  opacity: mob.isDead ? (1 - mob.deathTimer / 30).clamp(0, 1) : 1.0,
                  child: Image.asset(
                    'assets/mob/5120504/${mob.isDead ? "die1_${(mob.deathTimer ~/ 5).clamp(0, 5)}" : (mob.isMoving ? "move_${mob.frame % 6}" : "stand_${mob.frame % 6}")}.png',
                    width: 60,
                    height: 60,
                    fit: BoxFit.contain,
                    errorBuilder: (_, __, ___) => Container(
                      width: 60, height: 60,
                      decoration: BoxDecoration(
                        color: Colors.red.withOpacity(0.5),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.pest_control, color: Colors.white),
                    ),
                  ),
                ),
              ),
            ],
          ),
        )),

        // Player
        Positioned(
          left: playerX - 40 - cameraX,
          top: playerY - 70 - cameraY + 250,
          child: Transform(
            alignment: Alignment.center,
            transform: Matrix4.identity()..scale(playerFacing.toDouble(), 1.0),
            child: AnimatedBuilder(
              animation: _animController,
              builder: (context, child) {
                String spritePath;
                if (isAttacking) {
                  final frame = (attackFrame ~/ 5).clamp(0, char.moveFrames - 1);
                  spritePath = 'assets/npc/${char.id}/${char.movePrefix}_0$frame.png';
                } else if (isMoving && onGround) {
                  final frame = (playerFrame ~/ 4) % char.moveFrames;
                  spritePath = 'assets/npc/${char.id}/${char.movePrefix}_0$frame.png';
                } else {
                  spritePath = 'assets/npc/${char.id}/stand_0.png';
                }
                return Image.asset(
                  spritePath,
                  width: 80,
                  height: 90,
                  fit: BoxFit.contain,
                  errorBuilder: (_, __, ___) => Container(
                    width: 80, height: 90,
                    color: Colors.yellow.withOpacity(0.5),
                    child: const Icon(Icons.person, size: 40),
                  ),
                );
              },
            ),
          ),
        ),

        // Damage numbers
        ...damageNumbers.map((d) => Positioned(
          left: d.x - cameraX - 20,
          top: d.y - cameraY + 200,
          child: Opacity(
            opacity: (d.life / 30).clamp(0, 1),
            child: Text(
              '${d.damage}',
              style: TextStyle(
                fontSize: d.isCrit ? 22 : 16,
                fontWeight: FontWeight.bold,
                color: d.isCrit ? Colors.yellow : Colors.white,
                shadows: const [
                  Shadow(color: Colors.black, blurRadius: 3, offset: Offset(1, 1)),
                ],
              ),
            ),
          ),
        )),

        // UI Layer
        _buildUI(char),
      ],
    );
  }

  Widget _buildUI(CharacterDef char) {
    return Stack(
      children: [
        // HP/MP/EXP Panel (top-left)
        Positioned(
          top: 10,
          left: 10,
          child: Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.7),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: const Color(0xFFff6b35).withOpacity(0.5)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0xFFff6b35),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text('Lv.$level',
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(width: 8),
                    Text(char.name,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  ],
                ),
                const SizedBox(height: 8),
                _buildStatBar('HP', hp, maxHp, const Color(0xFFe63946), const Color(0xFFff6b6b)),
                const SizedBox(height: 4),
                _buildStatBar('MP', mp, maxMp, const Color(0xFF4361ee), const Color(0xFF4cc9f0)),
                const SizedBox(height: 4),
                _buildStatBar('EXP', exp, level * 100, const Color(0xFFfca311), const Color(0xFFffd60a)),
              ],
            ),
          ),
        ),

        // Score/Combo Panel (top-right)
        Positioned(
          top: 10,
          right: 10,
          child: Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.7),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.white24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.star, color: Color(0xFFffd700), size: 18),
                    const SizedBox(width: 5),
                    Text('$score',
                      style: const TextStyle(
                        color: Color(0xFFffd700),
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      )),
                  ],
                ),
                const SizedBox(height: 5),
                Text('Kills: $kills', style: const TextStyle(color: Colors.white70, fontSize: 12)),
                if (combo > 1)
                  Text('$combo COMBO!',
                    style: TextStyle(
                      color: combo > 5 ? Colors.orange : Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: combo > 5 ? 16 : 14,
                    )),
              ],
            ),
          ),
        ),

        // Mobile controls hint
        Positioned(
          bottom: 10,
          left: 10,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            decoration: BoxDecoration(
              color: Colors.black54,
              borderRadius: BorderRadius.circular(5),
            ),
            child: const Text(
              'Arrow:Move | C:Jump | Z:Attack',
              style: TextStyle(color: Colors.white38, fontSize: 10),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildStatBar(String label, int current, int max, Color colorStart, Color colorEnd) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 28,
          child: Text(label, style: const TextStyle(fontSize: 11, color: Colors.white70)),
        ),
        Container(
          width: 130,
          height: 14,
          decoration: BoxDecoration(
            color: Colors.grey[900],
            borderRadius: BorderRadius.circular(7),
            border: Border.all(color: Colors.grey[700]!, width: 1),
          ),
          child: Stack(
            children: [
              FractionallySizedBox(
                widthFactor: (current / max).clamp(0, 1),
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: [colorStart, colorEnd]),
                    borderRadius: BorderRadius.circular(6),
                  ),
                ),
              ),
              Center(
                child: Text(
                  '$current / $max',
                  style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class DamageNumber {
  double x, y;
  final int damage;
  final bool isCrit;
  int life = 30;

  DamageNumber({required this.x, required this.y, required this.damage, this.isCrit = false});
}

class Mob {
  double x, y;
  double vx = 0, vy = 0;
  int hp, maxHp;
  bool isDead = false;
  int frame = 0;
  int frameTimer = 0;
  int deathTimer = 0;
  bool isMoving = false;
  int facing = 1;
  int attackCooldown = 0;
  int hitStun = 0;

  Mob({required this.x, required this.y, required this.hp, required this.maxHp});

  void update(double playerX, double playerY, List<Foothold> footholds) {
    if (isDead) {
      deathTimer++;
      return;
    }

    attackCooldown--;

    if (hitStun > 0) {
      hitStun--;
      x += vx;
      vx *= 0.8;
    } else {
      // AI - move towards player
      final dx = playerX - x;
      final dy = playerY - y;

      if (dx.abs() > 30 && dy.abs() < 100) {
        vx = dx.sign * 1.5;
        facing = dx.sign.toInt();
        isMoving = true;
      } else {
        vx *= 0.8;
        isMoving = false;
      }

      x += vx;
    }

    // Gravity
    vy += 0.5;
    y += vy;

    // Foothold collision
    for (final fh in footholds) {
      final fhY = fh.getYAt(x);
      if (fhY != double.infinity && vy >= 0 && y >= fhY - 5 && y <= fhY + 20) {
        y = fhY;
        vy = 0;
        break;
      }
    }

    // Bounds
    x = x.clamp(-600, 950);
    if (y > 400) {
      y = -100;
      vy = 0;
    }

    // Animation
    frameTimer++;
    if (frameTimer > 8) {
      frameTimer = 0;
      frame++;
    }
  }
}
