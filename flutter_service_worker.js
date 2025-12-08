'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "9787903e7393774463d96e5cdc67958f",
"assets/AssetManifest.bin.json": "123d3419133b27614eea73fc88e2c22b",
"assets/AssetManifest.json": "d1eb0c8054ab91c09b5172e0532246cc",
"assets/assets/audio/etc/count1.mp3": "aff388c4e9dd7306e4e8d9abf3caf0c5",
"assets/assets/audio/etc/default_jump.mp3": "8ea893358df484f39454ee467d450f34",
"assets/assets/audio/skill/121001000_hit.mp3": "dd2cd94d0734b0e3d44cff949e64f72e",
"assets/assets/audio/skill/121001000_use.mp3": "cbd58fec014d6e7b1b4462b77496c340",
"assets/assets/audio/skill/121001000_voice.mp3": "bddc662cf5f8306f99dd67aaef25469c",
"assets/assets/audio/skill/121001001_hit.mp3": "dd2cd94d0734b0e3d44cff949e64f72e",
"assets/assets/audio/skill/121001001_use.mp3": "db737de56da6985c3ee04ab7abb62e72",
"assets/assets/audio/skill/121001001_voice.mp3": "a820cac77bfa203391d1d26b1cf62bbb",
"assets/assets/audio/skill/121001002_hit.mp3": "dd2cd94d0734b0e3d44cff949e64f72e",
"assets/assets/audio/skill/121001002_use.mp3": "435850eda2f2ce055735bae072133622",
"assets/assets/audio/skill/121001003_hit.mp3": "dd2cd94d0734b0e3d44cff949e64f72e",
"assets/assets/audio/skill/121001003_use.mp3": "af8f4f5d8939de8894310a33c6344056",
"assets/assets/audio/skill/121001006_use.mp3": "b953c13971962d92a1aabc695c69d407",
"assets/assets/audio/skill/121001007_use.mp3": "b953c13971962d92a1aabc695c69d407",
"assets/assets/audio/skill/121001008_hit.mp3": "dd2cd94d0734b0e3d44cff949e64f72e",
"assets/assets/audio/skill/121001008_use.mp3": "aba20d482f4a95ea7e635addb2d9b18a",
"assets/assets/audio/skill/121002000_hit.mp3": "644b9ef004b4f1469259053d0a3d1019",
"assets/assets/audio/skill/121002000_use.mp3": "d462c1ff061185923a78c5391691c726",
"assets/assets/audio/skill/121002000_voice.mp3": "c361f32ac60ee094e29849e2f83f7a73",
"assets/assets/audio/skill/121002001_hit.mp3": "56e9f55bf51db9b21b5ee535df845c17",
"assets/assets/audio/skill/121002001_use.mp3": "3557167a7aec5ebbe4d171ebd41dd40a",
"assets/assets/audio/skill/121002001_voice.mp3": "116d60ab04f2af899eb142a7be4b9d5d",
"assets/assets/audio/Sound/Bgm00/2024collabo_eventmap_loop.mp3": "d1d7fe96fdaea03c538ab1e4e7fdbf91",
"assets/assets/audio/Sound/Bgm00/2024collabo_minigame_loop.mp3": "0aafa98450d45301f7a7ec7f3c86bbab",
"assets/assets/audio/Sound/Game/DropItem.mp3": "98b3d9aa7a877fc6a3bd2e3bb6e13da2",
"assets/assets/audio/Sound/Game/finish.mp3": "6705d82c18d3dc86298d3780e45ea744",
"assets/assets/audio/Sound/Game/Jump.mp3": "dd2bf3dfe7468a6d08caca7038547f88",
"assets/assets/audio/Sound/Game/LevelUp.mp3": "810b5c88e8abdacbe062edff0ab58ed7",
"assets/assets/audio/Sound/Game/PickUpItem.mp3": "c823e5d2a1dacaed5afbd455512b0e48",
"assets/assets/audio/Sound/Game/Portal.mp3": "7478350ae1db275ec1a17dfa8f45b4e0",
"assets/assets/audio/Sound/Game/Tombstone.mp3": "96fb8ace9730c3dae9fce567587f8321",
"assets/assets/audio/Sound/Mob/1210100Damage.mp3": "751843330c8a35b8f072cc690dd5d3aa",
"assets/assets/audio/Sound/Mob/1210100Die.mp3": "f386c6ae27faa0d2fbac6f50c73eea71",
"assets/assets/audio/Sound/Mob/1210102Damage.mp3": "751843330c8a35b8f072cc690dd5d3aa",
"assets/assets/audio/Sound/Mob/1210102Die.mp3": "df6ad37f31c5f31ddc92f31eee8a2f9f",
"assets/assets/audio/Sound/Mob/1210111Damage.mp3": "751843330c8a35b8f072cc690dd5d3aa",
"assets/assets/audio/Sound/Mob/1210111Die.mp3": "f386c6ae27faa0d2fbac6f50c73eea71",
"assets/assets/audio/Sound/Mob/9100045Damage.mp3": "fccb7b1bd5a4671eeadff7a2a1a85c16",
"assets/assets/audio/Sound/Mob/9100045Die.mp3": "6b367d14cd3ca4d7afb5f66aed0e4600",
"assets/assets/audio/Sound/Mob/9300385Damage.mp3": "c77d1077517f38d56eb75dc4132fc6c2",
"assets/assets/audio/Sound/Mob/9300385Die.mp3": "6b9ab58cf83009da6add96d3550c692e",
"assets/assets/audio/Sound/Ui/BtMouseClick.mp3": "08dd03fc09d0deccc533b232ee655343",
"assets/assets/audio/Sound/Ui/BtMouseOver.mp3": "e77c9fed96e27cd491a5ca31cf2c16a5",
"assets/assets/audio/Sound/Ui/DlgNotice.mp3": "c0b6d4e0cb4e5e36ef6753c11bec7d46",
"assets/assets/audio/Sound/Ui/DragEnd.mp3": "98b3d9aa7a877fc6a3bd2e3bb6e13da2",
"assets/assets/audio/Sound/Ui/DragStart.mp3": "d36084f0b14e09c495bf976dbc56e850",
"assets/assets/audio/Sound/Ui/Invite.mp3": "6dbe495c2988997cab701d3cc9406804",
"assets/assets/audio/Sound/Ui/MenuDown.mp3": "1b25e06fe78e00f981d2ca1a2be3014d",
"assets/assets/audio/Sound/Ui/MenuUp.mp3": "ee10a8e885636e73f97ef2d91fc4e9a2",
"assets/assets/audio/Sound/Ui/Tab.mp3": "b6ac0aa44af6d85a31ca47410c4a2a05",
"assets/assets/audio/Sound/Weapon/Attack.mp3": "eaf911e3ad72d076439081187e757b19",
"assets/assets/data/character.zip": "f1cee2391974f8ae02747bcb73544dc9",
"assets/assets/data/effect.zip": "d8a85423badb699f7e17b3e18815a848",
"assets/assets/data/etc.zip": "366e3f4556b694f39ecadb4b324a8400",
"assets/assets/data/item.zip": "e43addbdaa05d65e2502c509a2004f31",
"assets/assets/data/map.zip": "ceec3fccce483832b6f16f7453973594",
"assets/assets/data/mob.zip": "4f5efc872d4419f203492608b7919d6a",
"assets/assets/data/npc.zip": "ac26fb8a360ce33dd36ef69de838647c",
"assets/assets/data/quest.zip": "0ed09cd5620aeb66be86f468680c414e",
"assets/assets/data/reactor.zip": "ceefe90db7ce2968ad975ff2f1659d00",
"assets/assets/data/skill.zip": "4d3dbd8955792e9cc0c50497a6d9e9ed",
"assets/assets/data/string.zip": "0ae3dc518f9f9bcabdd05e169a61111a",
"assets/assets/data/ui.zip": "a19cb2654ffc38201bd585109063f675",
"assets/assets/data_table/audio.yml": "0eea6a303c82d5ad028c882cba0c2bb5",
"assets/assets/data_table/character_setting.yml": "c1cff977256eb1777823779cb3520ce8",
"assets/assets/data_table/field.yml": "a402f62988194685ceee8321984dd2ab",
"assets/assets/data_table/level.yml": "9121a030a2f27039b964d36863337415",
"assets/assets/data_table/mob_reward.yml": "45580abd94d601732e0a0ccb5de5dd5e",
"assets/assets/data_table/npc.yml": "3980e327026189924426be902d5d8127",
"assets/assets/data_table/pc.yml": "c714787395045c920e1a66b1b3a3700a",
"assets/assets/data_table/quest_navigation.yml": "4f37c0763a2167f8d50cbb2c153b4cf2",
"assets/assets/data_table/random_box.yml": "4d308cfbb6aed2ba36d60f3d88429229",
"assets/assets/data_table/sprite.yml": "c6f54bd1938e4be2b194a2d1547cfbc6",
"assets/assets/data_table/stage.yml": "f1ce072f412b3030f8de96470543f6f2",
"assets/assets/images/damage_skins/default/0.png": "c2680a8505c8decdc504495b37180af4",
"assets/assets/images/damage_skins/default/1.png": "f4b537dde4dad6c301d1abc53e58b079",
"assets/assets/images/damage_skins/default/10000.png": "30868b2587c7870a4d0d8cfa669cf50b",
"assets/assets/images/damage_skins/default/2.png": "91cdea7e022ad5e71878108add7afd2d",
"assets/assets/images/damage_skins/default/3.png": "3a9ebab13c01dd687cf9f17f0f4bc322",
"assets/assets/images/damage_skins/default/4.png": "a20879a6748dae5c0016fbe73300d552",
"assets/assets/images/damage_skins/default/5.png": "9175efc24a011988a615648db3939d86",
"assets/assets/images/damage_skins/default/6.png": "b2bacc9a0b75791a62f50a94af287094",
"assets/assets/images/damage_skins/default/7.png": "a551359117a435f7626941439f8277e8",
"assets/assets/images/damage_skins/default/8.png": "cc1c9ce40491c21f9fcfbb6090bbf0a4",
"assets/assets/images/damage_skins/default/9.png": "5a3f5198f196ce4f31a7c22d1a82074d",
"assets/assets/images/damage_skins/default/critical.png": "34e651d9606ef3867279369760277647",
"assets/assets/images/damage_skins/default/miss.png": "7a28adc4b0bbc3ea25e91f6ddc810245",
"assets/assets/images/skill/0/icon.png": "df3084c58b3041ff078240258a8cd5b4",
"assets/assets/images/skill/skill_slot.png": "6d5a575958cd4bd5e7bcf7db57a42e6d",
"assets/assets/images/skill/skill_slot_number.png": "1d8fea802d6896b477672b7853356f45",
"assets/assets/images/skill/_skill_slot_number.png": "e1e881fd13761d4808e0ea7f89b0e2ee",
"assets/assets/images/ui/2024_collabo/ani_tutorial_attack_1.png": "3c7a8820bc3ef1d6aa674343856c4b96",
"assets/assets/images/ui/2024_collabo/ani_tutorial_attack_2.png": "9833fa0615cdefcfe6679eb6f911826d",
"assets/assets/images/ui/2024_collabo/ani_tutorial_a_1.png": "92dfb9fff2cea68eeef512315e125b6f",
"assets/assets/images/ui/2024_collabo/ani_tutorial_a_2.png": "b167e0481acb6b5dfc7942dcbbd463d0",
"assets/assets/images/ui/2024_collabo/ani_tutorial_boss_1.png": "62dbc08cbda03ce9e87e7b067aff2ce7",
"assets/assets/images/ui/2024_collabo/ani_tutorial_boss_2.png": "ccb95f428f5f37a59fd24407161f1388",
"assets/assets/images/ui/2024_collabo/ani_tutorial_dauble_1.png": "51dc62dc3094d2d35b0dc8dc2b2652ce",
"assets/assets/images/ui/2024_collabo/ani_tutorial_dauble_2.png": "ec7e79c5c75fd29dfd00e2874eddb8fa",
"assets/assets/images/ui/2024_collabo/ani_tutorial_jump_1.png": "e162581f971cfc1f385b6e9a2b09c4f0",
"assets/assets/images/ui/2024_collabo/ani_tutorial_jump_2.png": "b2c2609f061c84862a4e1b601ca4ffc6",
"assets/assets/images/ui/2024_collabo/ani_tutorial_s_1.png": "b75cc9f21fbcfb45d6ae38fd73102773",
"assets/assets/images/ui/2024_collabo/ani_tutorial_s_2.png": "69c5c3b591047575b2416d21c0cdf198",
"assets/assets/images/ui/2024_collabo/bg_hp_boss.png": "7bf50e43f9ce2159b8859cec3c676075",
"assets/assets/images/ui/2024_collabo/btn_install_mouseover_0.png": "6d9331e9c597b02d00ee9ce5da0a214b",
"assets/assets/images/ui/2024_collabo/btn_install_normal_0.png": "37e23b80a9b5ab27fff9d6f91e5cc4a4",
"assets/assets/images/ui/2024_collabo/btn_install_pressed_0.png": "67406f490c2e0deffadde6d10e7c94d0",
"assets/assets/images/ui/2024_collabo/btn_link_home_nomal.png": "cfd6a8af5411f078b911ca12d2273903",
"assets/assets/images/ui/2024_collabo/btn_link_home_over.png": "ab90161c8cc7c9e037cd4c1ce9119cc9",
"assets/assets/images/ui/2024_collabo/btn_link_instar_nomal.png": "493e5e5d2a1c92e0c75f80f1d7530f05",
"assets/assets/images/ui/2024_collabo/btn_link_instar_over.png": "4ea96b435cbcdc158da368012dbfd267",
"assets/assets/images/ui/2024_collabo/btn_link_youtube_nomal.png": "91f4412f64e4d9c1e86184aa7951ddc0",
"assets/assets/images/ui/2024_collabo/btn_link_youtube_over.png": "a8e46437e56638c15ac0db70fa37d1ae",
"assets/assets/images/ui/2024_collabo/btn_orange_mouseover_0.png": "004c95bc57e7ced304a7022f5aa8b7f8",
"assets/assets/images/ui/2024_collabo/btn_orange_normal_0.png": "fab43d8992522799cd48ef1aa7d2b012",
"assets/assets/images/ui/2024_collabo/btn_orange_pressed_0.png": "97da78c4259b4394456374afda9016bf",
"assets/assets/images/ui/2024_collabo/btn_pink_mouseover_0.png": "8c253c7fec86144874ab4fcebae23b19",
"assets/assets/images/ui/2024_collabo/btn_pink_normal_0.png": "69a904cb5f9de0ae6bb1c6f6cb54a505",
"assets/assets/images/ui/2024_collabo/btn_pink_pressed_0.png": "d227998d75a34827ac1ee1d64b790b33",
"assets/assets/images/ui/2024_collabo/btn_replay_mouseover_0.png": "ae98ef3ad53ac5914ad58ca00ea902bf",
"assets/assets/images/ui/2024_collabo/btn_replay_normal_0.png": "24e2a0ac177e50c2bb0ba4ceb84b8f75",
"assets/assets/images/ui/2024_collabo/btn_replay_pressed_0.png": "f4033d02ce6b6f8dfbc814997de4b46f",
"assets/assets/images/ui/2024_collabo/btn_skill_up_a.png": "cf88a16639d69868f0925389813631e8",
"assets/assets/images/ui/2024_collabo/btn_skill_up_a_over.png": "f6e9f7287e45904ad259c008bc76f1d7",
"assets/assets/images/ui/2024_collabo/btn_skill_up_a_press.png": "cc4ef6d16acfe7a39f0c9cdbe9f3e987",
"assets/assets/images/ui/2024_collabo/btn_skill_up_ctrl.png": "c5137d875140fb008aade9cba6873424",
"assets/assets/images/ui/2024_collabo/btn_skill_up_ctrl_over.png": "a86a68b4ebf201c0b95a5cc3479a345f",
"assets/assets/images/ui/2024_collabo/btn_skill_up_ctrl_press.png": "225458227a1a3c31b90d3557832d6879",
"assets/assets/images/ui/2024_collabo/btn_skill_up_s.png": "3920d77d582f26b3094cc6de6751b480",
"assets/assets/images/ui/2024_collabo/btn_skill_up_s_over.png": "24820a75d6e2cf302811b952125c9ac7",
"assets/assets/images/ui/2024_collabo/btn_skill_up_s_press.png": "8c876466da3210092665cbea8cfa7ca8",
"assets/assets/images/ui/2024_collabo/copylight.png": "77d02abe7f3ef25418509ba4aeb8aa92",
"assets/assets/images/ui/2024_collabo/count_number.png": "3d2d4efc779cfecbdc14e9c92120d95e",
"assets/assets/images/ui/2024_collabo/count_start.png": "7688eec380b8e7d38eabe41839873ab4",
"assets/assets/images/ui/2024_collabo/gauge_bg.png": "8a43bfd63f6e27d06c5bbb3e34220d03",
"assets/assets/images/ui/2024_collabo/glow.png": "a8014d12a8e4a1fadc3afda9b9190695",
"assets/assets/images/ui/2024_collabo/hp_boss.png": "852e847bedcb6d1f677e18e9ac0fd0e2",
"assets/assets/images/ui/2024_collabo/icon_down.png": "ca957ca7074948d0ef9056369e742015",
"assets/assets/images/ui/2024_collabo/icon_down_press.png": "c57259c211b61a4b0fbab7633d43d79a",
"assets/assets/images/ui/2024_collabo/icon_jump.png": "1ce5e24529d629a740cde8c24d625c2a",
"assets/assets/images/ui/2024_collabo/icon_jump_press.png": "922f5bd4c5d012216c2e9fda82d343e0",
"assets/assets/images/ui/2024_collabo/icon_left.png": "ed7413eba56867498e54d4749dbdf2b4",
"assets/assets/images/ui/2024_collabo/icon_left_press.png": "036e72682e3386d4c34b99900e51d7fb",
"assets/assets/images/ui/2024_collabo/icon_right.png": "07882caa992bd617178d841c6a877321",
"assets/assets/images/ui/2024_collabo/icon_right_press.png": "a12b76338af59701bfe863aba6d5fadd",
"assets/assets/images/ui/2024_collabo/icon_skill_2.png": "6dcf2d0febcd40fa19c89ee8fd32b668",
"assets/assets/images/ui/2024_collabo/icon_up.png": "fb9ce71098d7e7db9681552e87630124",
"assets/assets/images/ui/2024_collabo/icon_up_press.png": "74e758334274a727ce68de533a301de9",
"assets/assets/images/ui/2024_collabo/img_nametag.png": "730057cd2c6e0d8a8c709495214e04b9",
"assets/assets/images/ui/2024_collabo/img_scroll.png": "33ecb480d424c178224a2921438de0c7",
"assets/assets/images/ui/2024_collabo/loading.png": "b10742298573ce56e60564bbade62d3a",
"assets/assets/images/ui/2024_collabo/logo.png": "9b74a1f0f9edaa09aee676f334a9a8bf",
"assets/assets/images/ui/2024_collabo/minigame/bg_hpbar.png": "64d8b5453505fff587c81f7b45c16434",
"assets/assets/images/ui/2024_collabo/minigame/bg_meter.png": "945d5c68c3358efa48396a21f2339b20",
"assets/assets/images/ui/2024_collabo/minigame/bg_result_meter.png": "186a5d511c92b29e482ae21beff70bb3",
"assets/assets/images/ui/2024_collabo/minigame/btn_Play_now.png": "27ee5a9034e86526e69266d47b58e940",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_green_mouseover_0.png": "d3e7b3c2e8885f0b021c585e1029a057",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_green_normal_0.png": "916f4d89507248212aeda7893804182e",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_green_pressed_0.png": "990a785857a77a31cf0c8a341c00eb4a",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_green_s_mouseover_0.png": "756ae23e4a68ae87255cf84af99d077c",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_green_s_normal_0.png": "2b343a4d76af1a227bea4cf8eb640734",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_green_s_pressed_0.png": "4c41423048aef1731d99cfc75225490a",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_orange_mouseover_0.png": "7f1b9d5cd7f611f688705b17c7a0dc2c",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_orange_normal_0.png": "a26f427bb326f286dedfcf95f1c16bc0",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_orange_pressed_0.png": "a5e18d43ca3f2580543bcf7f90effdfe",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_pink_mouseover_0.png": "67e87b903a4b1e7bdb486b1f1d271f5a",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_pink_normal_0.png": "dcbda9acd30ed7b799c389a378415062",
"assets/assets/images/ui/2024_collabo/minigame/button/btn_pink_pressed_0.png": "8166579a3f93d683441c2fc57eb98929",
"assets/assets/images/ui/2024_collabo/minigame/hpbar.png": "fb014ea8af92b7c88f7e4913faca5215",
"assets/assets/images/ui/2024_collabo/minigame/hpbar_monster.png": "5062841c12a4ef8e87b0ef0997b4d5f4",
"assets/assets/images/ui/2024_collabo/minigame/hp_bar_green.png": "abdc1046f6f6846dd37631b0646bbf34",
"assets/assets/images/ui/2024_collabo/minigame/hp_bar_red.png": "c926b2c7d5b59d34812b6fa957711a1a",
"assets/assets/images/ui/2024_collabo/minigame/hp_bg.png": "462c244ad6d6c3322dbb3bdeec4267f8",
"assets/assets/images/ui/2024_collabo/minigame/logo_Collaboration.png": "31273aacbbe6d88b827f538ad198966c",
"assets/assets/images/ui/2024_collabo/minigame/number/0.png": "6db9ede781c965f87c71bb09689c6949",
"assets/assets/images/ui/2024_collabo/minigame/number/1.png": "f06093c9794e5a2005ca7444aca1233e",
"assets/assets/images/ui/2024_collabo/minigame/number/2.png": "fa14f4817c159903a6aff7e2e79f3e0c",
"assets/assets/images/ui/2024_collabo/minigame/number/3.png": "1e8ab2e9f669d1cb9e210345453d6a0a",
"assets/assets/images/ui/2024_collabo/minigame/number/4.png": "c6d796b2a5f6570093e004f384d56e7a",
"assets/assets/images/ui/2024_collabo/minigame/number/5.png": "e41edd1976dea59184140e03054721b2",
"assets/assets/images/ui/2024_collabo/minigame/number/6.png": "f6c6edb92397310393149acf5f65cdee",
"assets/assets/images/ui/2024_collabo/minigame/number/7.png": "718b008981f1006d6989030232235abf",
"assets/assets/images/ui/2024_collabo/minigame/number/8.png": "39e0c60dd9cfbc48034f90ca0dd702d6",
"assets/assets/images/ui/2024_collabo/minigame/number/9.png": "b8cfed7c2d253335bd2f227c2ea08eed",
"assets/assets/images/ui/2024_collabo/minigame/result_character.png": "1456e1d5a5d68c46c29e6e2a397f7df5",
"assets/assets/images/ui/2024_collabo/minigame/skill_slot_0.png": "3d4700d7c06db68c8baa6e3f42b45864",
"assets/assets/images/ui/2024_collabo/minigame/skill_slot_1.png": "3ae52b7fde563c86855f896e8bc6b834",
"assets/assets/images/ui/2024_collabo/minigame/skill_slot_2.png": "6a99f34ab58fb50334a04b4833afb332",
"assets/assets/images/ui/2024_collabo/minigame/utildlgex_bar.png": "2f6228bc68f7966bc101f6aa8d936f70",
"assets/assets/images/ui/2024_collabo/minigame/utildlgex_ic.png": "44e3544d55ee7a1ae3d04e9bedebe783",
"assets/assets/images/ui/2024_collabo/minigame/utildlgex_is.png": "fac90de9280b66a340529f2c1926007a",
"assets/assets/images/ui/2024_collabo/minigame/utildlgex_it.png": "2e72ffbbdd2b7d9b7e287b9cc0d95621",
"assets/assets/images/ui/2024_collabo/skill_121001000_icon.png": "dc95a2672277f6c0902060380cf62d56",
"assets/assets/images/ui/2024_collabo/skill_121001000_icondisabled.png": "f0603209ffaa8a00a014f7e9a768d527",
"assets/assets/images/ui/2024_collabo/skill_121001000_iconmouseover.png": "10eea22b70002bb1f09935b47cd0ae9f",
"assets/assets/images/ui/2024_collabo/skill_121001000_iconpress.png": "ba996eccaac58514b4c090a30ffe4e82",
"assets/assets/images/ui/2024_collabo/skill_121002000_icon.png": "196ae3224b78dac13b02a8fbd51949f7",
"assets/assets/images/ui/2024_collabo/skill_121002000_icondisabled.png": "bab84e90c4b227fa4a8618db2c93d0ac",
"assets/assets/images/ui/2024_collabo/skill_121002000_iconmouseover.png": "26ceb5cf7072010e2e94cc01c88824bc",
"assets/assets/images/ui/2024_collabo/skill_121002000_iconpress.png": "8c5c07b641ec6ef43d2b056d0a09a517",
"assets/assets/images/ui/2024_collabo/skill_121002001_icon.png": "d8415edfe2df6effc9b33003332f5942",
"assets/assets/images/ui/2024_collabo/skill_121002001_icondisabled.png": "ea186448cc41f9238e841d66f9c8ad06",
"assets/assets/images/ui/2024_collabo/skill_121002001_iconmouseover.png": "2d3c7addea2fb36f4c36eb1a7ce404e2",
"assets/assets/images/ui/2024_collabo/skill_121002001_iconpress.png": "c518f88c7d694c5d3f4f64005deea914",
"assets/assets/images/ui/2024_collabo/skill_bg.png": "8825dff38404735419a40ba8f6ba84f7",
"assets/assets/images/ui/2024_collabo/skill_popup_121002000.png": "bd9080d526d196dd04619dd3598b9761",
"assets/assets/images/ui/2024_collabo/skill_popup_121002001.png": "38fd0c6206c56ba267afe3dd50ede4f6",
"assets/assets/images/ui/2024_collabo/skill_popup_bg.png": "a21acfffa115497fdc227471a45f63e7",
"assets/assets/images/ui/2024_collabo/skill_slot_bg.png": "3ba4940cc2c5facde81eb176fa5ac456",
"assets/assets/images/ui/2024_collabo/start_guide_jp.png": "d5d74f40c9440e0a9523941aa41c28fa",
"assets/assets/images/ui/2024_collabo/start_guide_jp_1.png": "a50f1aab88b6bd1ea6869a55c6bc6648",
"assets/assets/images/ui/2024_collabo/start_guide_jp_2.png": "ae3bf1a7f7ad60cf5713ff97df4f5b1e",
"assets/assets/images/ui/2024_collabo/start_guide_jp_3.png": "eef3d4776a4e39e263cc630871020f01",
"assets/assets/images/ui/2024_collabo/start_guide_jp_4.png": "7453d51443ab22ada1f159315c9e7439",
"assets/assets/images/ui/2024_collabo/txt_run_info.png": "9cd19783fb8021907a742f17b23f6425",
"assets/assets/images/ui/2024_collabo/txt_run_info2.png": "89f07dace16f519d878c4b03b1737092",
"assets/assets/images/ui/bg_black.png": "60e690fe3d371e200a9fa53b0089a31a",
"assets/assets/images/ui/bg_roulette.png": "a7f06b7cd085abc2b6eb0bcc7f4ff375",
"assets/assets/images/ui/bg_sound_off.png": "d9af450359bdab0db1539b642bdcc2da",
"assets/assets/images/ui/bg_sound_on.png": "a458ac878b70e446b4a45b4cc1b42b6f",
"assets/assets/images/ui/bg_sound_on_controller.png": "0790bdd16d14e6027a956c093f6d77e2",
"assets/assets/images/ui/bg_sound_on_controller_bar.png": "d37910bfb15d5cb3579fd88f26349922",
"assets/assets/images/ui/bg_sound_on_controller_btn.png": "7a51f0a9916b4a3ce97973d6d781f398",
"assets/assets/images/ui/bg_white.png": "efe680c5eeb3a3471bdfb894304a9138",
"assets/assets/images/ui/btn_checkbox_ball_race_off.png": "c7717158f5a5fd435df68725b78eccea",
"assets/assets/images/ui/btn_checkbox_ball_race_on.png": "b3da1d6f9a654c6b3a08a4f3f7e3eb04",
"assets/assets/images/ui/btn_download.png": "d3544b5eec7e78ed3330d4333224c604",
"assets/assets/images/ui/button/bg_roulette.png": "30a5f6f495be7554401709e552af2afd",
"assets/assets/images/ui/button/btn_exit.png": "5b9c7474932ca6f860c10fe180401766",
"assets/assets/images/ui/button/btn_gamestart.png": "86e02dedb39e0d1f4799a76e3594c4ac",
"assets/assets/images/ui/button/btn_home.png": "a5ad234419d003ba603d87d8213d4761",
"assets/assets/images/ui/button/btn_input.png": "da7378b86f991b2100eb3cb3973b4a23",
"assets/assets/images/ui/button/btn_page_next.png": "6a550ea275b38bc59bd467064717c465",
"assets/assets/images/ui/button/btn_page_next_1.png": "d5c3714faa48a5c14dd12699023042d6",
"assets/assets/images/ui/button/btn_page_next_all.png": "54bcdb3d5fb14bb3fac5e9cb9d0d7b1f",
"assets/assets/images/ui/button/btn_page_prev.png": "c8c5a5600b2093abf93c68b2c0fda757",
"assets/assets/images/ui/button/btn_page_prev_1.png": "e7cbac6fb91ff76c072bcb6cbdbb77c3",
"assets/assets/images/ui/button/btn_page_prev_all.png": "7d95f41c802cbc065f408fd1e83600e8",
"assets/assets/images/ui/button/btn_play_game.png": "de73c3f3a7e37393d7e3ff85a2c27a21",
"assets/assets/images/ui/button/btn_play_multi.png": "d99e5529c300bf4aad8996fa564bbaa5",
"assets/assets/images/ui/button/btn_play_single.png": "ae30d0e5f84a491431245a401837daa4",
"assets/assets/images/ui/button/btn_rank.png": "8b18b40ff941c4d132bf60dd0841d1d3",
"assets/assets/images/ui/button/btn_replay.png": "2df5ef8e35f9f565f547d24a2efa4df9",
"assets/assets/images/ui/button/btn_replay2.png": "fdabce010628acd825b30482d503b350",
"assets/assets/images/ui/button/btn_survey.png": "a445e961b4fcbeef3e935b67309d6201",
"assets/assets/images/ui/button/btn_tab_rank.png": "8bc4625eae69bf76cf612a17c81d4ced",
"assets/assets/images/ui/button/btn_tuto.png": "2b80e4a7cb96cd97c18d0de02ac89a01",
"assets/assets/images/ui/chatBalloon.png": "069ddf39e212c85d10254bdb9b94780f",
"assets/assets/images/ui/common/bg_round_black.png": "dadf3da09d46cec76c3f7c8de90aea30",
"assets/assets/images/ui/dropdown/0_c.png": "b6a58eff0adb52f21fb3fe9f579ab8fb",
"assets/assets/images/ui/dropdown/0_e.png": "8ba73d9b6729b2f69d983c86c077b0a0",
"assets/assets/images/ui/dropdown/0_n.png": "fa6b449442b00f40095245e28623323d",
"assets/assets/images/ui/dropdown/0_ne.png": "ff58ebdaa6f5532d12bd00697b3c6a58",
"assets/assets/images/ui/dropdown/0_nw.png": "28e7d810beabe89ae859386157f91a64",
"assets/assets/images/ui/dropdown/0_s.png": "e105769892f1d9828311cf0c74766fd8",
"assets/assets/images/ui/dropdown/0_se.png": "438ae1fb7b4ced0692561a068a103f6d",
"assets/assets/images/ui/dropdown/0_sw.png": "6055c1e57544e6018698bfff744f8131",
"assets/assets/images/ui/dropdown/0_w.png": "652253cd6bd930c9f3a0d02cf4919b73",
"assets/assets/images/ui/dropdown/btn_dropbox_ball_race_n.png": "565512b7b63dfb09ef44cd54a5e99662",
"assets/assets/images/ui/dropdown/btn_dropbox_ball_race_p.png": "96de2bd218974f3b733d0d55645bc0b1",
"assets/assets/images/ui/dropdown/hover.png": "6c67fdd49a3ac55d816063e5b3267777",
"assets/assets/images/ui/empty.png": "35800716e266902e4fe68ab558d981fb",
"assets/assets/images/ui/icon_rank_none.png": "0ffe76dca5f4abb9bf7ae5f836edec5a",
"assets/assets/images/ui/img_arrow.png": "8c22e364f0d56d58619a6f287955d1b0",
"assets/assets/images/ui/img_line_ball_race.png": "71a3b2e686dfcc575a262feb37e24e66",
"assets/assets/images/ui/img_txtbox_ball_race.png": "d3e6428c6eb916313fc36b39ce93b61e",
"assets/assets/images/ui/info_rank_btn.png": "939a630eff223ae15aade2c7dd9d0833",
"assets/assets/images/ui/input_name.png": "515c0ff6e7756c071651fb41daa3ea99",
"assets/assets/images/ui/keyboard/KeyDraw.%255B.png": "fd0f9fcbe67298c2482aedf2a9c8c2d9",
"assets/assets/images/ui/keyboard/KeyDraw.%255D.png": "4cfe4b45ba0ad3116c40848464338857",
"assets/assets/images/ui/keyboard/KeyDraw.%2560.png": "3b1ff79d38cac7e71a19ceed2266ab38",
"assets/assets/images/ui/keyboard/KeyDraw.'.png": "b6641e32356d69dd47d0ceaaac6b4432",
"assets/assets/images/ui/keyboard/KeyDraw.,.png": "af4b5e445d314cfd2398eff39208f90a",
"assets/assets/images/ui/keyboard/KeyDraw.-.png": "40c2dd18c2701b3e307500e39e806b49",
"assets/assets/images/ui/keyboard/KeyDraw...png": "ab951a9844ef4706d5757afde0a68d0c",
"assets/assets/images/ui/keyboard/KeyDraw.0.png": "83ecb1be4d0a9908760f6f38a625b609",
"assets/assets/images/ui/keyboard/KeyDraw.1.png": "649ea436da3aa3bae07d99ffb53258fe",
"assets/assets/images/ui/keyboard/KeyDraw.2.png": "5bff693bbf680240b229c8e0d9f75541",
"assets/assets/images/ui/keyboard/KeyDraw.3.png": "5b7e584c1e3001ea145fce742cc80bc0",
"assets/assets/images/ui/keyboard/KeyDraw.4.png": "9f3d30d8b1a9592a0ea1a84422ae3471",
"assets/assets/images/ui/keyboard/KeyDraw.5.png": "0ee34af81f50618d8de9d30dc90974ef",
"assets/assets/images/ui/keyboard/KeyDraw.6.png": "9db150d7a30e1bb32644f224590a19e8",
"assets/assets/images/ui/keyboard/KeyDraw.7.png": "dcb13e1ade2cf6331d2898ad76d73ab1",
"assets/assets/images/ui/keyboard/KeyDraw.8.png": "a8b83a83601f22ba93dac973afb67fa7",
"assets/assets/images/ui/keyboard/KeyDraw.9.png": "dbcfdbf13ea33296c462120961b6d820",
"assets/assets/images/ui/keyboard/KeyDraw.;.png": "b8c6751717e86583a1af909cecea1680",
"assets/assets/images/ui/keyboard/KeyDraw.=.png": "b1e0819138ac3e44765868d45bb5aeb0",
"assets/assets/images/ui/keyboard/KeyDraw.A.png": "4d406c4b9ef04093edc67bc24c0e930b",
"assets/assets/images/ui/keyboard/KeyDraw.Alt.png": "67965a678c57d4ce0f3a118ef426409c",
"assets/assets/images/ui/keyboard/KeyDraw.B.png": "525a2fd4ba4ab970736134fc283359ef",
"assets/assets/images/ui/keyboard/KeyDraw.Back%2520Slash.png": "9209a5791104bda8c31e7b6636d2ef4d",
"assets/assets/images/ui/keyboard/KeyDraw.C.png": "a4e42fc783f88374688109ab69173e3b",
"assets/assets/images/ui/keyboard/KeyDraw.Control.png": "dc7cdf49ef3ced5a2f9f6d8e273d6a57",
"assets/assets/images/ui/keyboard/KeyDraw.D.png": "3ab57affb1c586d8ef0887cc95183f16",
"assets/assets/images/ui/keyboard/KeyDraw.Delete.png": "f09954acfe98f6fda05f7955b30db4ee",
"assets/assets/images/ui/keyboard/KeyDraw.E.png": "c978df3dbdbbe915d8b3dd8e6b4bca36",
"assets/assets/images/ui/keyboard/KeyDraw.End.png": "775ab257d246b6244d67b2b3e067a722",
"assets/assets/images/ui/keyboard/KeyDraw.Escape.png": "9f5fd890a40c43d69dfd9530fdbb8ed1",
"assets/assets/images/ui/keyboard/KeyDraw.F.png": "aacf8cc2267d19ed2491f6f861a2587f",
"assets/assets/images/ui/keyboard/KeyDraw.F1.png": "4b8c865a82e9f9c93b7cd40e00e74ca7",
"assets/assets/images/ui/keyboard/KeyDraw.F10.png": "cd53cadd72dcde048e179a57f141461d",
"assets/assets/images/ui/keyboard/KeyDraw.F11.png": "0110b51ac5bb48306eb91edf480f22be",
"assets/assets/images/ui/keyboard/KeyDraw.F12.png": "0233fb0e366a06e8a6cf00972cc17bae",
"assets/assets/images/ui/keyboard/KeyDraw.F2.png": "3cf4c708741c2130093d95bdae4177ba",
"assets/assets/images/ui/keyboard/KeyDraw.F3.png": "baadca4507b34f165bb513713047b081",
"assets/assets/images/ui/keyboard/KeyDraw.F4.png": "f3001cc1e46dcc6306a47e80c8dfd4e7",
"assets/assets/images/ui/keyboard/KeyDraw.F5.png": "83c2f28ff5344e02ae46a80646643327",
"assets/assets/images/ui/keyboard/KeyDraw.F6.png": "f81f389f4d6814b23c30da0abb7f4b15",
"assets/assets/images/ui/keyboard/KeyDraw.F7.png": "cf1c89e27986265eba34ed02c97435bf",
"assets/assets/images/ui/keyboard/KeyDraw.F8.png": "b2037980ec413ab4afab8da050f7b1fe",
"assets/assets/images/ui/keyboard/KeyDraw.F9.png": "f5463c7c90e8d8e95185375524375594",
"assets/assets/images/ui/keyboard/KeyDraw.G.png": "d64bfe9ec22c4db0d78827878bec4a14",
"assets/assets/images/ui/keyboard/KeyDraw.H.png": "da5010df1fdc43783c74820f815e2014",
"assets/assets/images/ui/keyboard/KeyDraw.Home.png": "2a584da8d5e68083548aebdd3e3c9b33",
"assets/assets/images/ui/keyboard/KeyDraw.I.png": "d81858fd6afaedba119dccabf45c94de",
"assets/assets/images/ui/keyboard/KeyDraw.Insert.png": "89f35c7b7f03b07c005e582087238f53",
"assets/assets/images/ui/keyboard/KeyDraw.J.png": "43b8c09163ebe1841844a6faebf73f4c",
"assets/assets/images/ui/keyboard/KeyDraw.K.png": "62825343f619ac3356a627b04f5c6935",
"assets/assets/images/ui/keyboard/KeyDraw.L.png": "2ab0d429877d330ea934d9c0cea8fe6f",
"assets/assets/images/ui/keyboard/KeyDraw.M.png": "8a725c667710cef178c65465af8455e3",
"assets/assets/images/ui/keyboard/KeyDraw.N.png": "83f0d7ea8a13e92175400cb10607baba",
"assets/assets/images/ui/keyboard/KeyDraw.O.png": "b7c8bb84b9c42b7e0de44098a3004f3a",
"assets/assets/images/ui/keyboard/KeyDraw.P.png": "61ef8e8520a545a793b6299fa170e58a",
"assets/assets/images/ui/keyboard/KeyDraw.Page%2520Down.png": "1b5d5fa7ce097b52d65f104daa6e5033",
"assets/assets/images/ui/keyboard/KeyDraw.Page%2520Up.png": "ca2b59048e5616e74f135c6fe110e39f",
"assets/assets/images/ui/keyboard/KeyDraw.Q.png": "d0070c188b0b3d292bd1e8e2ed8c5229",
"assets/assets/images/ui/keyboard/KeyDraw.R.png": "fd1300ffafefbf733a3b44f38e223fab",
"assets/assets/images/ui/keyboard/KeyDraw.S.png": "f967fd9e7a7a7d8dffca03914c68829c",
"assets/assets/images/ui/keyboard/KeyDraw.Scroll%2520Lock.png": "f257ea03ec861cb4569736aa8d3ddb8f",
"assets/assets/images/ui/keyboard/KeyDraw.Shift.png": "305324327ef214ccd3fc8627a2de34a8",
"assets/assets/images/ui/keyboard/KeyDraw.Space.png": "baa5b686010bdb3f95f3209be99e83b1",
"assets/assets/images/ui/keyboard/KeyDraw.T.png": "5b7cdd742b6aa69d143d725c1c1ff958",
"assets/assets/images/ui/keyboard/KeyDraw.U.png": "dc086169c4b22989f60cbf5b3c2fb07e",
"assets/assets/images/ui/keyboard/KeyDraw.V.png": "684f6c9b4e43f60db65a68b3a3fda632",
"assets/assets/images/ui/keyboard/KeyDraw.W.png": "7cfdf9feaa10eb897e4a4d80ce22465f",
"assets/assets/images/ui/keyboard/KeyDraw.X.png": "7c00e274a22ec04a9baf7cb1ae2d7de2",
"assets/assets/images/ui/keyboard/KeyDraw.Y.png": "103487c8e985c97c2fc9c6febf1acb07",
"assets/assets/images/ui/keyboard/KeyDraw.Z.png": "10f0917c22a9432ef30aef5e39972e4e",
"assets/assets/images/ui/light_green.png": "c8a156eb2318967a347e007a6e23562c",
"assets/assets/images/ui/light_red.png": "9794d20ead9b6da3c58931633feda54a",
"assets/assets/images/ui/loading_bar.png": "d29ae5c8756507862867beead44bbd41",
"assets/assets/images/ui/mobile/pad.png": "e5b039160780e2b14a23de68fdf82caa",
"assets/assets/images/ui/number/yellow/0.png": "3905fd95dac6f4abe6850a8d7b13e4fa",
"assets/assets/images/ui/number/yellow/1.png": "b535c265944965ada42577f4a2f9e4e0",
"assets/assets/images/ui/number/yellow/2.png": "505eca749e7dc749b3e1c71952e986cf",
"assets/assets/images/ui/number/yellow/3.png": "b418232b695b019fb591cfc1e5abc783",
"assets/assets/images/ui/number/yellow/4.png": "63250868d1bd0398e90fdfc787649c98",
"assets/assets/images/ui/number/yellow/5.png": "c9342d881b779c05cf06ffcc5f83faad",
"assets/assets/images/ui/number/yellow/6.png": "68c2a8c4f958a7753b322d52b35aa5e1",
"assets/assets/images/ui/number/yellow/7.png": "cb7130482fb538eb2ead47b774e50de1",
"assets/assets/images/ui/number/yellow/8.png": "64d03cf060213a9631329e589ed6cda0",
"assets/assets/images/ui/number/yellow/9.png": "5784c12f8058266f4d41da6ea4b0f5c5",
"assets/assets/images/ui/portrait.png": "74d1c3c50aae9649023fdf0bc521c431",
"assets/assets/images/ui/remain_kill_count.png": "6db79efe335884275e76a1ce15c3c6c8",
"assets/assets/images/ui/remain_time.png": "321db7ed9746f93929e4761ccb097ce6",
"assets/assets/images/ui/result_bg_rank_plus.png": "1106a5910a2c745cd8ea7722dc418ab1",
"assets/assets/images/ui/result_message.png": "16ad259a1a6568bb9c04d7520741980c",
"assets/assets/images/ui/screen_zoom_in.png": "b3cf79fb4f8cace7cc02046fb561d02f",
"assets/assets/images/ui/screen_zoom_out.png": "a1dcdb107205e91a60e6a8b2463f0e6d",
"assets/assets/images/ui/slot_select.png": "ebf3b8517e38d16f489ba00b8a4ed93d",
"assets/assets/images/ui/sound_bgm_off.png": "519b5482aaaa3416ba30498d97c20b21",
"assets/assets/images/ui/sound_bgm_on.png": "c01e5ac8f90e633efb818f61541b5086",
"assets/assets/images/ui/sound_off.png": "4aedde9aeee256a8eaef01b4cbdec65b",
"assets/assets/images/ui/sound_on.png": "074ecd991c29c0fb4bc37b68847b4536",
"assets/assets/images/ui/tuto_message.png": "e1cd05db6b01d82dd6817574980b5ea8",
"assets/assets/ui/boss_hp.yml": "93ff2478bbe891dfa9d42e09a4d33578",
"assets/assets/ui/buff.yml": "975d544d0bffbe3fd43f1a178f5107a6",
"assets/assets/ui/charger_skill.yml": "c775d653bac8d9d87edadd33be040977",
"assets/assets/ui/count.yml": "fc97c9819e5ed8df2215f8575960d726",
"assets/assets/ui/develop.yml": "6e56de51afed7e188ea57928e698fac2",
"assets/assets/ui/inventory.yml": "fa1001623c991feb8fc0175b5edc8c83",
"assets/assets/ui/skillselect.yml": "5906f17af1ebc20d5f70f2ece01fc38e",
"assets/assets/ui/sns.yml": "434eba54470bb4892478c48911a28b3c",
"assets/assets/ui/startguide.yml": "020d935b6748a4f6c238822999a4a253",
"assets/assets/ui/success.yml": "c1279bd23b8a6c0c516c196f8c83f397",
"assets/assets/ui/timeout.yml": "ad297f9a087d3719edcdf78336b124a4",
"assets/assets/ui/timer.yml": "5843d327281eb70923476d1bdd72103f",
"assets/FontManifest.json": "42641c42b92c61132d2454511d3cfabd",
"assets/fonts/JejuGothic.ttf": "f6e8df338bf87a0ed32026de4f38559f",
"assets/NOTICES": "b840dd62aaaa2eb3846932fa973e9826",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "1961cec7c28da2e6637c8f1db418009f",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "3ab9ff62cba6db1f3c8c73903f970e47",
"icons/Icon-192.png": "1961cec7c28da2e6637c8f1db418009f",
"icons/Icon-512.png": "1961cec7c28da2e6637c8f1db418009f",
"icons/Icon-maskable-192.png": "1961cec7c28da2e6637c8f1db418009f",
"icons/Icon-maskable-512.png": "1961cec7c28da2e6637c8f1db418009f",
"index.html": "9ae7261c023a5b9ef2f240ed62dd978d",
"/": "9ae7261c023a5b9ef2f240ed62dd978d",
"loading.gif": "624daf0e1f93ca361c54588b3cc68bf8",
"main.dart.js": "547144b891907efb1c1e1ab8a2579f14",
"manifest.json": "62b216488a2b9b01276b29826c2b91ec",
"version.json": "8ed6f44ca93e850fa96cc2fa3e2af96d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
