# Ch.15-B — 최종 프로젝트 B: 먹고 먹히는 구 게임

**Part 5: 설계와 완성** | 핵심: 키보드 조종 + 충돌 감지 + 조건 분기

---

## 🎬 오늘의 미션

여러분은 혹시 **Agar.io**라는 게임을 알고 있나요?

화면에 작은 구가 있습니다. 여러분이 이 구를 조종합니다.
먹이(아주 작은 구)를 먹으면 조금씩 커지고, 다른 적 구와 만나면 — **더 큰 쪽이 작은 쪽을 먹어버립니다.**

단순한 규칙이지만, 플레이할수록 긴장감이 생깁니다.
"저 빨간 구보다 내가 더 클까? 먹을 수 있을까, 도망쳐야 할까?"

오늘의 미션: **구를 조종하며 먹이를 먹고, 적보다 커지고, 먹히지 않는 게임을 만들기.**

Ch.8에서 배운 키보드 조종, Ch.9의 충돌 감지, Ch.7의 조건문이 모두 합쳐집니다.

---

## 📋 설계하기

### 세 가지 질문으로 정리

**무엇이 움직이나요?**
플레이어 구가 키보드로 움직이고, 적 구가 랜덤으로 돌아다닌다.

**사용자가 뭘 조절하나요?**
WASD 또는 방향키로 플레이어를 이동한다.

**어떤 규칙이 적용되나요?**
먹이를 먹으면 플레이어가 커진다. 적과 부딪히면 큰 쪽이 작은 쪽을 먹는다. 플레이어가 먹히면 게임 오버.

### 물체 목록

- **플레이어** (sphere, 하늘색, 키보드로 조종)
- **먹이 30개** (sphere, 아주 작고 알록달록, 먹으면 리스폰)
- **적 5마리** (sphere, 다양한 크기, 랜덤 이동)
- **경기장 테두리** (curve, 흰색 직사각형)
- **점수 라벨** (label)
- **다시 시작 버튼** (button)

### 사용하는 개념

- **sphere** — 플레이어, 먹이, 적
- **keysdown()** — 플레이어 이동 (Ch.8)
- **mag()** — 충돌 감지 (Ch.9)
- **if/elif/else** — 크기 비교 → 먹기/먹히기 (Ch.7)
- **for + 리스트** — 먹이 30개, 적 5마리 관리 (Ch.11-12)
- **random()** — 먹이/적 위치, 적 이동 방향 (Ch.5)
- **함수** — 먹이 생성, 적 생성 (Ch.13)
- **button** — 다시 시작 (Ch.14)
- **애니메이션** — while True + rate() (Ch.6)

---

## 🛠️ 단계별 구현 가이드

### Step 1: 무대 만들기 — 경기장과 플레이어

배경을 어둡게 설정하고, 경기장 테두리와 플레이어를 만듭니다.

```python
GlowScript 3.2 VPython

scene.background = vector(0.05, 0.05, 0.1)
scene.caption = "먹고 먹히는 구 게임\n"

# 경기장 크기
L = 15

# 경기장 테두리
curve(pos=[
    vector(-L,-L,0), vector(L,-L,0),
    vector(L,L,0), vector(-L,L,0),
    vector(-L,-L,0)],
    color=color.white)

# 플레이어
player = sphere(pos=vector(0,0,0),
    radius=0.5,
    color=color.cyan)

speed = 0.2
```

실행하면 어두운 배경에 흰색 테두리 경기장, 그리고 중앙에 하늘색 구가 보입니다. 아직 움직이지는 않아요.

### Step 2: 먹이 뿌리기 — 함수 + 리스트 + 랜덤

경기장 곳곳에 알록달록한 먹이를 뿌립니다.

```python
foods = []

def create_food():
    f = sphere(
        pos=vector(
            random()*2*L - L,
            random()*2*L - L, 0),
        radius=0.15,
        color=vector(
            random(), random(), random()))
    foods.append(f)

for i in range(30):
    create_food()
```

`random()*2*L - L`은 -15에서 +15 사이의 랜덤 좌표를 만듭니다. 먹이 30개가 경기장 곳곳에 흩어집니다.

!!! tip "먹이 수 바꾸기"

    `range(30)`의 숫자를 바꾸면 먹이 수가 달라집니다. 50개, 100개도 가능해요!

### Step 3: 키보드 조종 — 이동과 경계

Ch.8에서 배운 `keysdown()`으로 플레이어를 움직입니다.

```python
while True:
    rate(60)

    keys = keysdown()
    if 'd' in keys or 'right' in keys:
        player.pos.x += speed
    if 'a' in keys or 'left' in keys:
        player.pos.x -= speed
    if 'w' in keys or 'up' in keys:
        player.pos.y += speed
    if 's' in keys or 'down' in keys:
        player.pos.y -= speed

    # 경기장 밖으로 나가지 않게
    if player.pos.x > L:
        player.pos.x = L
    if player.pos.x < -L:
        player.pos.x = -L
    if player.pos.y > L:
        player.pos.y = L
    if player.pos.y < -L:
        player.pos.y = -L
```

실행해 보세요! WASD 또는 방향키로 하늘색 구를 움직일 수 있습니다. 경기장 테두리 밖으로는 나갈 수 없어요.

### Step 4: 먹이 먹기 — 충돌 감지 + 성장

이제 핵심입니다! 플레이어가 먹이에 닿으면 먹이를 먹고 조금 커집니다.

메인 루프 안에 아래 코드를 추가합니다. (Step 3의 `while True` 안에)

```python
    # 먹이 충돌 검사
    for f in foods:
        dist = mag(player.pos - f.pos)
        if dist < player.radius + f.radius:
            # 먹었다! 커지기
            player.radius += 0.02
            # 먹이를 새 위치로 리스폰
            f.pos = vector(
                random()*2*L - L,
                random()*2*L - L, 0)
```

`mag(player.pos - f.pos)`는 두 구 사이의 거리입니다 (Ch.9에서 배웠죠). 거리가 두 구의 반지름 합보다 작으면 충돌!

실행하면 먹이를 먹을 때마다 플레이어가 조금씩 커지는 걸 볼 수 있습니다.

### Step 5: 적 등장 — AI 경쟁자

게임에 긴장감을 더합시다. 적 구들이 등장해 경기장을 돌아다닙니다.

`while True` 위에 적 생성 코드를 추가합니다.

```python
enemies = []
enemy_dirs = []

def create_enemy():
    e = sphere(
        pos=vector(
            random()*2*L - L,
            random()*2*L - L, 0),
        radius=0.3 + random()*0.7,
        color=vector(
            random()*0.5 + 0.5,
            random()*0.3,
            random()*0.3))
    enemies.append(e)
    dx = random()*0.1 - 0.05
    dy = random()*0.1 - 0.05
    enemy_dirs.append(vector(dx, dy, 0))

for i in range(5):
    create_enemy()
```

적의 반지름은 `0.3 + random()*0.7`이므로 0.3~1.0 사이입니다. 플레이어 시작 크기(0.5)보다 작을 수도, 클 수도 있어요!

메인 루프 안에 적 이동 코드를 추가합니다.

```python
    # 적 이동
    for i in range(len(enemies)):
        if not enemies[i].visible:
            continue
        enemies[i].pos += enemy_dirs[i]
        # 벽에 닿으면 방향 전환
        if abs(enemies[i].pos.x) > L:
            enemy_dirs[i].x = -enemy_dirs[i].x
        if abs(enemies[i].pos.y) > L:
            enemy_dirs[i].y = -enemy_dirs[i].y
```

그리고 적과의 충돌을 검사합니다. **여기가 Agar.io의 핵심 규칙입니다!**

```python
    # 적과 충돌 — 크기 비교!
    for i in range(len(enemies)):
        if not enemies[i].visible:
            continue
        dist = mag(player.pos - enemies[i].pos)
        if dist < player.radius + enemies[i].radius:
            if player.radius > enemies[i].radius:
                # 내가 더 크다 → 먹기!
                player.radius += enemies[i].radius * 0.2
                enemies[i].visible = False
            else:
                # 적이 더 크다 → 먹힘! 게임 오버
                game_over = True
                player.color = color.red
```

`if player.radius > enemies[i].radius` — 이 한 줄이 게임의 운명을 결정합니다!

### Step 6: 마무리 — 점수, 게임 오버, 재시작

점수 표시와 게임 오버 처리, 다시 시작 버튼을 추가합니다.

`while True` 위에 추가합니다.

```python
score = 0
game_over = False

score_label = label(
    pos=vector(0, L+2, 0),
    text='점수: 0',
    height=18,
    color=color.white,
    box=False)

def restart(b):
    global game_over, score
    game_over = False
    score = 0
    player.radius = 0.5
    player.pos = vector(0,0,0)
    player.color = color.cyan
    score_label.text = '점수: 0'
    # 적 리스폰
    for i in range(len(enemies)):
        enemies[i].visible = True
        enemies[i].pos = vector(
            random()*2*L - L,
            random()*2*L - L, 0)

button(text="다시 시작", bind=restart)
```

메인 루프에서 점수 업데이트 코드를 추가합니다.

먹이를 먹을 때:

```python
            score += 1
            score_label.text = '점수: ' + str(score)
```

적을 먹을 때:

```python
                score += 10
                score_label.text = '점수: ' + str(score)
```

게임 오버일 때:

```python
    if game_over:
        score_label.text = '게임 오버! 점수: ' + str(score)
        continue
```

---

## 🐛 흔한 문제와 해결

!!! bug "플레이어가 안 움직여요!"

    `keysdown()`을 `while True` 루프 **안에서** 매 프레임 호출하고 있는지 확인하세요. 루프 밖에서 한 번만 호출하면 첫 프레임의 키 상태만 읽습니다.

!!! bug "먹이를 먹어도 커지지 않아요!"

    `player.radius += 0.02`에서 `+=`인지 확인하세요. `=`을 쓰면 매번 0.02로 고정됩니다. 또한 충돌 조건 `dist < player.radius + f.radius`에서 부등호 방향이 맞는지 확인하세요.

!!! bug "적과 부딪혀도 아무 일도 안 일어나요!"

    `enemies[i].visible`을 확인하는 `if not enemies[i].visible: continue`가 충돌 검사 **앞에** 있는지 확인하세요. 이미 먹은 적(visible=False)은 건너뛰어야 합니다.

!!! bug "게임 오버 후 다시 시작이 안 돼요!"

    `restart` 함수 안에 `global game_over, score`를 넣었는지 확인하세요. 함수 안에서 전역 변수를 바꾸려면 `global` 선언이 필요합니다.

!!! bug "적이 한쪽으로만 쏠려요!"

    `enemy_dirs`의 x, y 값이 양수만 되고 있지 않은지 확인하세요. `random()*0.1 - 0.05`처럼 **- 0.05**를 빼야 음수 방향도 나옵니다.

---

## 📝 완성 예시

무대와 플레이어를 만듭니다.

```python
GlowScript 3.2 VPython

# WHAT: 어두운 배경의 경기장
scene.background = vector(0.05, 0.05, 0.1)
scene.caption = "먹고 먹히는 구 게임\n"

L = 15

# WHAT: 경기장 테두리
curve(pos=[
    vector(-L,-L,0), vector(L,-L,0),
    vector(L,L,0), vector(-L,L,0),
    vector(-L,-L,0)],
    color=color.white)

# WHAT: 플레이어 — 하늘색 구
player = sphere(pos=vector(0,0,0),
    radius=0.5,
    color=color.cyan)

speed = 0.2
score = 0
game_over = False
```

먹이 생성 함수와 30개 먹이를 뿌립니다.

```python
# WHAT: 먹이 리스트와 생성 함수
# WHY: 먹으면 새 위치로 리스폰해야 하므로 리스트로 관리
foods = []

def create_food():
    f = sphere(
        pos=vector(
            random()*2*L - L,
            random()*2*L - L, 0),
        radius=0.15,
        color=vector(
            random(), random(), random()))
    foods.append(f)

for i in range(30):
    create_food()
```

적 생성 함수와 5마리 적을 배치합니다.

```python
# WHAT: 적 리스트와 생성 함수
# WHY: 적마다 크기와 이동 방향이 다르다
enemies = []
enemy_dirs = []

def create_enemy():
    e = sphere(
        pos=vector(
            random()*2*L - L,
            random()*2*L - L, 0),
        radius=0.3 + random()*0.7,
        color=vector(
            random()*0.5 + 0.5,
            random()*0.3,
            random()*0.3))
    enemies.append(e)
    dx = random()*0.1 - 0.05
    dy = random()*0.1 - 0.05
    enemy_dirs.append(vector(dx, dy, 0))

for i in range(5):
    create_enemy()
```

점수 라벨과 다시 시작 버튼을 추가합니다.

```python
# WHAT: 점수 표시
score_label = label(
    pos=vector(0, L+2, 0),
    text='점수: 0',
    height=18,
    color=color.white,
    box=False)

# WHAT: 다시 시작 버튼
# WHY: 게임 오버 후 처음부터 다시
def restart(b):
    global game_over, score
    game_over = False
    score = 0
    player.radius = 0.5
    player.pos = vector(0,0,0)
    player.color = color.cyan
    score_label.text = '점수: 0'
    for i in range(len(enemies)):
        enemies[i].visible = True
        enemies[i].pos = vector(
            random()*2*L - L,
            random()*2*L - L, 0)

button(text="다시 시작", bind=restart)
```

마지막으로 메인 루프입니다.

```python
# WHAT: 메인 루프
while True:
    rate(60)

    # 게임 오버면 멈춤
    if game_over:
        score_label.text = '게임 오버! 점수: ' + str(score)
        continue

    # WHAT: 키보드 이동
    keys = keysdown()
    if 'd' in keys or 'right' in keys:
        player.pos.x += speed
    if 'a' in keys or 'left' in keys:
        player.pos.x -= speed
    if 'w' in keys or 'up' in keys:
        player.pos.y += speed
    if 's' in keys or 'down' in keys:
        player.pos.y -= speed

    # WHAT: 경계 체크
    if player.pos.x > L: player.pos.x = L
    if player.pos.x < -L: player.pos.x = -L
    if player.pos.y > L: player.pos.y = L
    if player.pos.y < -L: player.pos.y = -L

    # WHAT: 먹이 충돌 → 성장
    for f in foods:
        dist = mag(player.pos - f.pos)
        if dist < player.radius + f.radius:
            player.radius += 0.02
            score += 1
            score_label.text = '점수: ' + str(score)
            f.pos = vector(
                random()*2*L - L,
                random()*2*L - L, 0)

    # WHAT: 적 이동 + 벽 반사
    for i in range(len(enemies)):
        if not enemies[i].visible:
            continue
        enemies[i].pos += enemy_dirs[i]
        if abs(enemies[i].pos.x) > L:
            enemy_dirs[i].x = -enemy_dirs[i].x
        if abs(enemies[i].pos.y) > L:
            enemy_dirs[i].y = -enemy_dirs[i].y

    # WHAT: 적 충돌 → 크기 비교
    # WHY: 큰 쪽이 작은 쪽을 먹는 핵심 규칙
    for i in range(len(enemies)):
        if not enemies[i].visible:
            continue
        dist = mag(player.pos - enemies[i].pos)
        if dist < player.radius + enemies[i].radius:
            if player.radius > enemies[i].radius:
                player.radius += enemies[i].radius * 0.2
                enemies[i].visible = False
                score += 10
                score_label.text = '점수: ' + str(score)
            else:
                game_over = True
                player.color = color.red
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — WASD로 움직이며 먹이를 먹고 적을 피하세요!</div>
<iframe src="../demos/ch15b_final.html"></iframe>
</div>

??? success "실행 결과"

    어두운 경기장에 하늘색 플레이어 구가 중앙에 있고, 알록달록한 먹이 30개와 붉은 계열의 적 5마리가 보입니다.

    WASD로 움직이며 먹이를 먹으면 점수가 오르고 플레이어가 조금씩 커집니다. 작은 적을 만나면 먹어서 한번에 10점! 하지만 나보다 큰 적을 만나면... 게임 오버.

    "다시 시작" 버튼을 누르면 처음부터 다시 도전할 수 있습니다.

---

## 💡 업그레이드 아이디어

### 적도 먹이를 먹고 성장

현재 적은 크기가 고정되어 있습니다. 적도 먹이를 먹으면 커지게 하면 훨씬 긴장감이 생깁니다!

```python
    # 적도 먹이를 먹는다
    for i in range(len(enemies)):
        if not enemies[i].visible:
            continue
        for f in foods:
            dist = mag(enemies[i].pos - f.pos)
            if dist < enemies[i].radius:
                enemies[i].radius += 0.01
                f.pos = vector(
                    random()*2*L - L,
                    random()*2*L - L, 0)
```

### 플레이어 궤적 남기기

플레이어가 지나간 자리에 궤적을 남기면 멋집니다.

```python
player = sphere(pos=vector(0,0,0),
    radius=0.5,
    color=color.cyan,
    make_trail=True,
    trail_type="points",
    interval=10,
    retain=30)
```

### 슬라이더로 난이도 조절

적의 속도를 슬라이더로 조절할 수 있게 하면 난이도 설정이 가능합니다.

```python
difficulty = 1

def set_difficulty(s):
    global difficulty
    difficulty = s.value

slider(min=0.5, max=3, value=1,
    bind=set_difficulty)
wtext(text="  난이도")
```

메인 루프에서 적 이동할 때 `enemy_dirs[i] * difficulty`를 곱하면 됩니다.

### 적 추가 생성 버튼

게임 도중 적을 더 추가하는 버튼으로 스릴을 높여 보세요!

```python
def add_enemy(b):
    create_enemy()

button(text="적 추가!", bind=add_enemy)
```

---

## ✅ 3줄 정리

1. `keysdown()`으로 실시간 이동, `mag()`로 충돌 감지 — Ch.8과 Ch.9가 게임의 핵심 엔진이 됩니다
2. `if player.radius > enemy.radius` 한 줄이 "먹기 vs 먹히기"를 결정합니다 — **조건문은 게임의 규칙을 코드로 표현하는 도구**입니다
3. `visible = False`로 먹힌 적을 숨기고, 버튼의 `restart` 함수로 모든 상태를 초기화합니다 — **게임 상태 관리**가 완성도를 만듭니다
