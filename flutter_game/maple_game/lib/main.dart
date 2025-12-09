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
      title: 'MapleStory x 鬼滅の刃',
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

  // Player state
  double playerX = 400;
  double playerY = 300;
  double playerVx = 0;
  double playerVy = 0;
  int playerFacing = 1;
  bool onGround = false;
  int playerFrame = 0;
  bool isMoving = false;
  bool isAttacking = false;

  // Stats
  int hp = 100;
  int maxHp = 100;
  int mp = 50;
  int maxMp = 50;
  int exp = 0;
  int level = 1;
  int score = 0;
  int kills = 0;

  // Mobs
  List<Mob> mobs = [];
  Timer? mobSpawnTimer;

  // Platforms
  final platforms = [
    Platform(x: 100, y: 450, width: 600),
    Platform(x: 200, y: 350, width: 400),
    Platform(x: 300, y: 250, width: 200),
  ];

  // Camera
  double cameraX = 0;

  // Keys pressed
  final Set<LogicalKeyboardKey> _keysPressed = {};

  // Animation
  late AnimationController _animController;
  Timer? _gameLoop;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    )..repeat();
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
      playerX = 400;
      playerY = 300;
      playerVx = 0;
      playerVy = 0;
      hp = 100;
      mp = 50;
      exp = 0;
      level = 1;
      score = 0;
      kills = 0;
      mobs.clear();
    });

    _gameLoop = Timer.periodic(const Duration(milliseconds: 16), (_) => update());
    mobSpawnTimer = Timer.periodic(const Duration(seconds: 2), (_) => spawnMob());
  }

  void spawnMob() {
    if (mobs.length < 10) {
      final random = Random();
      mobs.add(Mob(
        x: random.nextDouble() * 700 + 50,
        y: 100,
        hp: 30 + level * 10,
      ));
    }
  }

  void update() {
    if (!gameStarted || gameOver) return;

    setState(() {
      // Movement
      const speed = 5.0;
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
        playerVx = 0;
      }

      // Jump
      if ((_keysPressed.contains(LogicalKeyboardKey.arrowUp) ||
           _keysPressed.contains(LogicalKeyboardKey.keyC)) && onGround) {
        playerVy = -15;
        onGround = false;
      }

      // Attack
      if (_keysPressed.contains(LogicalKeyboardKey.keyZ) && !isAttacking) {
        isAttacking = true;
        performAttack();
        Future.delayed(const Duration(milliseconds: 300), () {
          if (mounted) {
            setState(() => isAttacking = false);
          }
        });
      }

      // Gravity
      playerVy += 0.8;

      // Apply velocity
      playerX += playerVx;
      playerY += playerVy;

      // Platform collision
      onGround = false;
      for (final platform in platforms) {
        if (playerVy >= 0 &&
            playerX >= platform.x - 20 &&
            playerX <= platform.x + platform.width + 20 &&
            playerY >= platform.y - 65 &&
            playerY <= platform.y + 10) {
          playerY = platform.y - 65;
          playerVy = 0;
          onGround = true;
          break;
        }
      }

      // Bounds
      if (playerY > 500) {
        playerY = 100;
        playerVy = 0;
      }
      playerX = playerX.clamp(30, 770);

      // Update mobs
      for (final mob in mobs) {
        mob.update(playerX);

        // Mob collision with player
        if (!mob.isDead && (mob.x - playerX).abs() < 30 && (mob.y - playerY).abs() < 50) {
          hp -= 1;
          if (hp <= 0) {
            gameOver = true;
            _gameLoop?.cancel();
            mobSpawnTimer?.cancel();
          }
        }
      }

      // Remove dead mobs
      mobs.removeWhere((m) => m.isDead && m.deathTimer > 30);

      // Animation frame
      if (isMoving || isAttacking) {
        playerFrame = (playerFrame + 1) % characters[selectedCharIndex].moveFrames;
      }

      // Camera
      cameraX = playerX - 400;
    });
  }

  void performAttack() {
    for (final mob in mobs) {
      if (!mob.isDead) {
        final dist = (mob.x - playerX).abs();
        if (dist < 100 && (mob.y - playerY).abs() < 50) {
          final damage = 20 + level * 5 + Random().nextInt(10);
          mob.hp -= damage;
          if (mob.hp <= 0) {
            mob.isDead = true;
            kills++;
            score += 100;
            exp += 20;
            if (exp >= level * 100) {
              exp = 0;
              level++;
              maxHp += 20;
              hp = maxHp;
              maxMp += 10;
              mp = maxMp;
            }
          }
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
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
            height: 600,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.orange, width: 2),
            ),
            child: Stack(
              children: [
                // Background gradient
                Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Color(0xFF87CEEB), Color(0xFFE0F6FF)],
                    ),
                  ),
                ),

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
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'MapleStory x 鬼滅の刃',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: Colors.orange,
              shadows: [
                Shadow(color: Colors.black, offset: Offset(3, 3), blurRadius: 5),
              ],
            ),
          ),
          const SizedBox(height: 30),
          const Text('Select Character', style: TextStyle(color: Colors.white70)),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(characters.length, (index) {
              final char = characters[index];
              final isSelected = index == selectedCharIndex;
              return GestureDetector(
                onTap: () => setState(() => selectedCharIndex = index),
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: isSelected ? Colors.orange.withOpacity(0.3) : Colors.white10,
                    border: Border.all(
                      color: isSelected ? Colors.orange : Colors.grey,
                      width: isSelected ? 3 : 1,
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      Image.asset(
                        'assets/npc/${char.id}/stand_0.png',
                        width: 50,
                        height: 70,
                        fit: BoxFit.contain,
                        errorBuilder: (_, __, ___) => Container(
                          width: 50,
                          height: 70,
                          color: Colors.grey,
                          child: const Icon(Icons.person),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(char.name, style: const TextStyle(fontSize: 12)),
                    ],
                  ),
                ),
              );
            }),
          ),
          const SizedBox(height: 40),
          ElevatedButton(
            onPressed: startGame,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.orange,
              padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
            ),
            child: const Text('Start Game', style: TextStyle(fontSize: 20)),
          ),
          const SizedBox(height: 20),
          const Text(
            'Arrow Keys: Move | Z: Attack | C: Jump',
            style: TextStyle(color: Colors.white54, fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildGameOverScreen() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Game Over',
            style: TextStyle(fontSize: 48, color: Colors.red, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),
          Text('Level: $level | Score: $score | Kills: $kills',
              style: const TextStyle(fontSize: 20)),
          const SizedBox(height: 30),
          ElevatedButton(
            onPressed: () => setState(() {
              gameStarted = false;
              gameOver = false;
            }),
            child: const Text('Back to Title'),
          ),
        ],
      ),
    );
  }

  Widget _buildGameContent() {
    final char = characters[selectedCharIndex];

    return Stack(
      children: [
        // Platforms
        ...platforms.map((p) => Positioned(
          left: p.x - cameraX,
          top: p.y,
          child: Container(
            width: p.width,
            height: 10,
            decoration: BoxDecoration(
              color: const Color(0xFF5a3d2b),
              borderRadius: BorderRadius.circular(5),
            ),
          ),
        )),

        // Mobs
        ...mobs.map((mob) => Positioned(
          left: mob.x - 25 - cameraX,
          top: mob.y - 50,
          child: Opacity(
            opacity: mob.isDead ? 0.5 : 1.0,
            child: Image.asset(
              'assets/mob/5120504/${mob.isDead ? "die1_0" : (mob.isMoving ? "move_${mob.frame % 6}" : "stand_${mob.frame % 6}")}.png',
              width: 50,
              height: 50,
              fit: BoxFit.contain,
              errorBuilder: (_, __, ___) => Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.red.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.pest_control, color: Colors.white),
              ),
            ),
          ),
        )),

        // Player
        Positioned(
          left: playerX - 35 - cameraX,
          top: playerY - 5,
          child: Transform(
            alignment: Alignment.center,
            transform: Matrix4.identity()..scale(playerFacing.toDouble(), 1.0),
            child: AnimatedBuilder(
              animation: _animController,
              builder: (context, child) {
                String spritePath;
                if (isMoving || isAttacking) {
                  final frame = playerFrame % char.moveFrames;
                  spritePath = 'assets/npc/${char.id}/${char.movePrefix}_0$frame.png';
                } else {
                  spritePath = 'assets/npc/${char.id}/stand_0.png';
                }
                return Image.asset(
                  spritePath,
                  width: 70,
                  height: 80,
                  fit: BoxFit.contain,
                  errorBuilder: (_, __, ___) => Container(
                    width: 70,
                    height: 80,
                    color: Colors.yellow.withOpacity(0.5),
                    child: const Icon(Icons.person, size: 40),
                  ),
                );
              },
            ),
          ),
        ),

        // UI - HP/MP/EXP bars
        Positioned(
          top: 10,
          left: 10,
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.black54,
              borderRadius: BorderRadius.circular(5),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Lv.$level ${char.name}', style: const TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 5),
                _buildBar('HP', hp, maxHp, Colors.red),
                _buildBar('MP', mp, maxMp, Colors.blue),
                _buildBar('EXP', exp, level * 100, Colors.yellow),
              ],
            ),
          ),
        ),

        // Score
        Positioned(
          top: 10,
          right: 10,
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.black54,
              borderRadius: BorderRadius.circular(5),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text('Score: $score', style: const TextStyle(color: Colors.orange, fontSize: 18)),
                Text('Kills: $kills', style: const TextStyle(color: Colors.white70)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBar(String label, int current, int max, Color color) {
    return Row(
      children: [
        SizedBox(width: 30, child: Text(label, style: const TextStyle(fontSize: 12))),
        Container(
          width: 150,
          height: 15,
          decoration: BoxDecoration(
            color: Colors.grey[800],
            borderRadius: BorderRadius.circular(3),
          ),
          child: Stack(
            children: [
              FractionallySizedBox(
                widthFactor: (current / max).clamp(0, 1),
                child: Container(
                  decoration: BoxDecoration(
                    color: color,
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),
              ),
              Center(
                child: Text('$current / $max', style: const TextStyle(fontSize: 10)),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class Platform {
  final double x;
  final double y;
  final double width;

  Platform({required this.x, required this.y, required this.width});
}

class Mob {
  double x;
  double y;
  double vx = 0;
  double vy = 0;
  int hp;
  bool isDead = false;
  int frame = 0;
  int frameTimer = 0;
  int deathTimer = 0;
  bool isMoving = false;

  Mob({required this.x, required this.y, required this.hp});

  void update(double playerX) {
    if (isDead) {
      deathTimer++;
      return;
    }

    // Simple AI - move towards player
    final dx = playerX - x;
    if (dx.abs() > 50) {
      vx = dx.sign * 2;
      isMoving = true;
    } else {
      vx = 0;
      isMoving = false;
    }

    // Gravity
    vy += 0.5;

    x += vx;
    y += vy;

    // Ground
    if (y > 385) {
      y = 385;
      vy = 0;
    }

    // Animation
    frameTimer++;
    if (frameTimer > 10) {
      frameTimer = 0;
      frame++;
    }
  }
}
