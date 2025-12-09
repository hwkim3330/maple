# MapleStory Mini Games

MapleStory 스타일의 미니게임 컬렉션입니다. 실제 메이플스토리 스프라이트를 활용한 게임!

## Games

### 1. MapleStory Mini RPG (New!)
**실제 메이플스토리 몬스터 스프라이트**를 사용한 본격 액션 RPG!

**[Play Now](https://hwkim3330.github.io/maple/game/)**

#### Features
- **실제 스프라이트**: 원본 메이플스토리 몬스터 이미지 사용
- **6종 몬스터**: Wood Doll, Blue Doll, Slime, Orange Mushroom, Snail, Ribbon Pig
- **레벨 시스템**: 몬스터 사냥 → 경험치 획득 → 레벨업
- **스킬 시스템**:
  - Z: 기본 공격
  - X: 광역 스킬 (쿨타임 3초)
  - C: 힐 (HP 30% 회복, 쿨타임 5초)
- **크리티컬**: 10% 확률로 2배 데미지
- **플랫폼 맵**: 여러 층의 발판에서 전투

#### Controls
| Key | Action |
|-----|--------|
| ← → | 이동 |
| ↑ | 점프 |
| Z | 기본 공격 |
| X | 광역 스킬 |
| C | HP 회복 |

#### Monsters (from actual game data)
| Monster | Level | HP | EXP |
|---------|-------|-----|-----|
| Slime | 23 | 465 | 40 |
| Orange Mushroom | - | - | - |
| Snail | - | - | - |
| Ribbon Pig | - | - | - |
| Wood Doll | 136 | 915,750 | 6,369 |
| Blue Doll | - | - | - |

(몬스터 스탯은 플레이어 레벨에 맞게 조정됨)

---

### 2. MapleStory Collabo (Original Flutter)
넥슨 공식 메이플스토리 콜라보 미니게임

**[Play Now](https://hwkim3330.github.io/maple/)**

---

## Screenshots

### Mini RPG with Real Sprites
```
┌────────────────────────────────────────┐
│ [Lv.1]              [Score: 0] [Kills] │
│                                        │
│     ╔════╗                             │
│  🎭 ║    ║     🎭 Wood Doll            │
│  ═══════════════════════════════       │
│                 🎭 Slime               │
│  [████████] HP: 100/100                │
│  [        ] EXP: 0/100                 │
│  [Z⚔️] [X✨] [C❤️]                      │
└────────────────────────────────────────┘
```

## Game Assets

이 게임은 실제 메이플스토리 리소스를 사용합니다:
- `game/sprites/mobs/` - 몬스터 스프라이트 (stand, move, hit, die 애니메이션)
- `game/sprites/character/` - 캐릭터 스프라이트
- `assets/assets/data/*.zip` - 원본 게임 데이터

### Extracted Mob Sprites
```
sprites/mobs/
├── 5120504/      # Wood Doll
├── 5120503/      # Blue Doll
├── 9300027/      # Slime
├── 1541175/      # Orange Mushroom
├── 9001007/      # Snail
├── 7130602/      # Ribbon Pig
└── *.json        # Mob metadata
```

## Tech Stack
- Pure HTML5 Canvas
- Vanilla JavaScript ES6+
- Real MapleStory sprites
- JSON mob data with stats
- No external dependencies

## Local Development
```bash
# Clone the repository
git clone https://github.com/hwkim3330/maple.git
cd maple

# Serve with any static server
python3 -m http.server 8080
# or
npx serve .

# Open http://localhost:8080/game/
```

## Links
- [GitHub Repository](https://github.com/hwkim3330/maple)
- [Mini RPG Game](https://hwkim3330.github.io/maple/game/)
- [Original Collabo Game](https://hwkim3330.github.io/maple/)

## Credits
- Original assets from Nexon MapleStory
- Sprites extracted from official minigame
- Fan-made for educational purposes

## License
This project is for personal/educational use only. MapleStory and all related assets are property of Nexon.
