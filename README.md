# MapleStory Mini Games

MapleStory 스타일의 미니게임 컬렉션입니다.

## Games

### 1. MapleStory Mini RPG
레벨업, 경험치, 몬스터 사냥이 있는 본격 액션 RPG!

**[Play Now](https://hwkim3330.github.io/maple/game/)**

#### Features
- **레벨 시스템**: 몬스터를 사냥하고 경험치를 얻어 레벨업!
- **3가지 몬스터**: 슬라임, 버섯, 달팽이 (레벨에 따라 강해짐)
- **스탯 성장**: 레벨업마다 HP, MP, 공격력, 방어력 상승
- **스킬**: MP를 소모해서 강력한 광역 공격
- **플랫폼**: 다양한 높이의 발판에서 전투

#### Controls
| Key | Action |
|-----|--------|
| ← → | 이동 |
| X / Space | 점프 |
| Z | 기본 공격 |
| C | 스킬 (MP 10 소모) |

---

### 2. MapleStory Collabo (Original)
넥슨 공식 메이플스토리 콜라보 미니게임

**[Play Now](https://hwkim3330.github.io/maple/)**

---

## Screenshots

### Mini RPG
```
┌────────────────────────────────────┐
│  Lv. 5                             │
│  [████████████] HP: 200/200        │
│  [██████████  ] MP: 80/100         │
│  [████        ] EXP: 150/375       │
│                                    │
│     🟢 Slime                       │
│            🧑 Player   🍄 Mushroom │
│  ═══════╗        ╔═══════════════  │
│         ║        ║                 │
│  ════════════════════════════════  │
│  Kills: 23                         │
└────────────────────────────────────┘
```

## Tech Stack
- Pure HTML5 Canvas
- Vanilla JavaScript
- No dependencies
- Mobile-friendly touch controls

## Local Development
```bash
# Clone the repository
git clone https://github.com/hwkim3330/maple.git
cd maple

# Serve with any static server
python3 -m http.server 8080
# or
npx serve .
```

## Game Mechanics

### Level System
| Level | EXP Required | HP | MP | Attack | Defense |
|-------|-------------|----|----|--------|---------|
| 1 | 100 | 100 | 50 | 15 | 5 |
| 2 | 150 | 120 | 60 | 20 | 7 |
| 3 | 225 | 140 | 70 | 25 | 9 |
| ... | x1.5 | +20 | +10 | +5 | +2 |

### Monsters
| Monster | HP | Attack | EXP | Speed |
|---------|-----|--------|-----|-------|
| Green Slime | 30 + Lv×5 | 8 + Lv×2 | 20 + Lv×5 | Slow |
| Red Mushroom | 50 + Lv×5 | 12 + Lv×2 | 35 + Lv×5 | Medium |
| Purple Snail | 80 + Lv×5 | 15 + Lv×2 | 50 + Lv×5 | Fast |

### Combat
- **크리티컬 히트**: 15% 확률로 1.5배 데미지
- **데미지 계산**: `공격력 × (0.9~1.1) - 적방어력`
- **넉백**: 공격 시 몬스터를 밀어냄
- **무적 시간**: 피격 후 1초간 무적

## Links
- [GitHub Repository](https://github.com/hwkim3330/maple)
- [Mini RPG Game](https://hwkim3330.github.io/maple/game/)
- [Original Collabo Game](https://hwkim3330.github.io/maple/)

## Credits
- Original assets from Nexon MapleStory
- Fan-made for educational purposes

## License
This project is for personal/educational use only. MapleStory and all related assets are property of Nexon.
