# Ch.10 — 미니 프로젝트: 나만의 게임 만들기

**Part 3: 게임을 향해** · 핵심: 설계 → 분해 → 구현

---

## 🎬 오늘의 미션

오늘은 특별한 날입니다.

지금까지 여러분은 도구를 하나씩 배웠습니다.
변수, 랜덤, 애니메이션, if 조건, 키보드 입력, 충돌 감지.
각각은 작은 조각이었지만, 이제 이 조각들을 모으면 **진짜 게임**이 됩니다.

오늘의 미션: **나만의 게임을 직접 설계하고 만들기.**

여러분이 게임 디자이너이자 프로그래머입니다.

<div class="scene-preview">
  <div class="obj" style="left: 20%; top: 40%; width: 30px; height: 30px; background: radial-gradient(circle at 35% 35%, #74b9ff, #0984e3);"></div>
  <div class="obj" style="left: 55%; top: 50%; width: 20px; height: 20px; background: radial-gradient(circle at 35% 35%, #ffeaa7, #fdcb6e);"></div>
  <div class="obj" style="left: 75%; top: 35%; width: 20px; height: 20px; background: radial-gradient(circle at 35% 35%, #ffeaa7, #fdcb6e);"></div>
  <div class="obj" style="left: 40%; top: 60%; width: 25px; height: 25px; background: radial-gradient(circle at 35% 35%, #ff7675, #d63031);"></div>
  <div style="position: absolute; top: 8px; right: 10px; color: #fff; font-size: 13px; font-family: monospace;">점수: 3</div>
</div>

??? question "지금까지 배운 도구 상자 정리"

    여러분의 도구 상자에 들어 있는 것들입니다.

    **물체 만들기 (Ch.1-3)**
    sphere, box, cylinder, cone — color, pos, size, radius, axis

    **변수와 연산 (Ch.4)**
    이름 = 값, 속성 읽기/바꾸기, 산술 연산

    **랜덤 (Ch.5)**
    random() — 0~1 사이 무작위 수, 범위 조절

    **애니메이션 (Ch.6)**
    while True + rate() — 매 프레임 위치 업데이트

    **조건 분기 (Ch.7)**
    if, elif, else — 비교연산자 — v = -v 벽 튕기기

    **키보드 입력 (Ch.8)**
    keysdown() — 사용자가 직접 조종

    **충돌 감지 (Ch.9)**
    mag() — 두 물체 사이 거리 계산

---

## 🎯 게임 아이디어 3가지

어떤 게임을 만들지 골라 보세요. 아래 세 가지 중 하나를 선택해도 좋고, 완전히 새로운 아이디어도 환영합니다!

### 아이디어 A: 아이템 수집 게임

플레이어 공을 키보드로 움직여서, 화면에 놓인 아이템(보석)을 모읍니다.
아이템에 닿으면 점수가 올라가고, 아이템이 새 위치에 다시 나타납니다.

사용하는 개념: 키보드 입력, 충돌 감지, 랜덤, 변수(점수), 조건문

### 아이디어 B: 피하기 게임

하늘에서 장애물이 떨어집니다. 플레이어는 키보드로 좌우로 피합니다.
장애물에 부딪히면 게임 오버! 오래 살아남을수록 높은 점수.

사용하는 개념: 애니메이션, 키보드 입력, 충돌 감지, 조건문, 변수(점수)

### 아이디어 C: 탁구 게임

공이 자동으로 튕기고, 플레이어는 키보드로 패들을 움직입니다.
공을 놓치면 점수가 깎이고, 패들로 받아치면 점수가 올라갑니다.

사용하는 개념: 벽 튕기기, 키보드 입력, 충돌 감지, 변수(점수/속도)

!!! tip "자유 주제도 OK!"

    위 세 가지는 예시일 뿐입니다. "우주선 슈팅", "미로 탈출", "공 피구" 등 어떤 아이디어든 괜찮습니다. 핵심은 **배운 개념을 조합하는 것**입니다.

---

## 📋 설계하기

코드를 바로 쓰고 싶겠지만, 잠깐! 프로 개발자도 먼저 **설계**부터 합니다.

### 게임 규칙 정하기

게임을 만들기 전에 세 가지 질문에 답해 보세요.

**질문 1: 플레이어가 뭘 하나요?**
예: 키보드로 공을 움직인다, 패들을 조종한다

**질문 2: 뭘 하면 좋은 일이 생기나요?**
예: 아이템에 닿으면 점수가 오른다, 공을 받아치면 점수가 오른다

**질문 3: 뭘 하면 나쁜 일이 생기나요?**
예: 장애물에 부딪히면 게임 오버, 공을 놓치면 점수가 깎인다

### 필요한 물체 목록

종이에 써 보세요. 예를 들어 아이디어 A(아이템 수집)라면:

- 플레이어 공 (sphere) — 키보드로 움직임
- 아이템 (sphere 또는 box) — 먹으면 새 위치로 이동
- 바닥 (box) — 배경
- 점수 표시 (label)

### 어떤 개념을 쓸지 체크

내 게임에 필요한 것들을 확인하세요.

- 변수: 점수, 속도 등
- 랜덤: 아이템 위치, 장애물 생성 위치
- while True + rate(): 매 프레임 업데이트
- if/elif/else: 벽 제한, 충돌 판정, 게임 오버
- keysdown(): 플레이어 조종
- mag(): 충돌 감지

??? hint "설계 예시: 아이템 수집 게임"

    **플레이어가 뭘 하나요?** 방향키로 공을 상하좌우 움직인다

    **좋은 일:** 보석(노란 공)에 닿으면 점수 +1, 보석이 랜덤 위치에 다시 나타남

    **나쁜 일:** (이 게임에는 게임 오버 없음 — 원하면 추가 가능)

    **물체:** 파란 공(플레이어), 노란 공(보석), 회색 바닥, 점수 label

    **개념:** 변수(점수, 속도), 랜덤(보석 위치), 애니메이션, if(벽 제한), keysdown, mag(충돌)

---

## 🛠️ 단계별 구현 가이드

아이디어 A(아이템 수집 게임)를 기준으로 단계별로 만들어 봅시다.
다른 아이디어를 골랐다면, 이 흐름을 참고해서 자기 게임에 적용하세요.

### Step 1: 배경 + 플레이어 만들기

가장 먼저, 무대와 주인공을 만듭니다.

```python
GlowScript 3.2 VPython

scene.background = color.black

ground = box(pos=vector(0,-0.5,0),
    size=vector(10,0.1,10),
    color=color.white)

player = sphere(pos=vector(0,0,0),
    radius=0.3,
    color=color.cyan)
```

실행하면 검은 배경에 흰 바닥, 그 위에 하늘색 공이 보입니다. 이것이 플레이어입니다.

### Step 2: 키보드 조종 추가

플레이어를 방향키로 움직이게 합니다.

```python
GlowScript 3.2 VPython

scene.background = color.black
ground = box(pos=vector(0,-0.5,0),
    size=vector(10,0.1,10),
    color=color.white)
player = sphere(pos=vector(0,0,0),
    radius=0.3, color=color.cyan)
speed = 0.05
```

while 루프를 추가하고 그 안에서 키보드 입력을 처리합니다.

```python
while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        player.pos.x = player.pos.x - speed
    if 'right' in keys:
        player.pos.x = player.pos.x + speed
```

!!! tip "상하 이동도 추가하려면"

    `'up'`과 `'down'` 키도 같은 방식으로 추가하세요. `player.pos.z`를 바꾸면 앞뒤로 움직입니다.

### Step 3: 벽 제한 추가

바닥 밖으로 나가지 못하게 경계를 만듭니다. 바닥의 가로 크기가 10이니까, 플레이어의 x 좌표를 -5에서 5 사이로 제한합니다.

```python
GlowScript 3.2 VPython

scene.background = color.black
ground = box(pos=vector(0,-0.5,0),
    size=vector(10,0.1,10),
    color=color.white)
player = sphere(pos=vector(0,0,0),
    radius=0.3, color=color.cyan)
speed = 0.05
```

이동 코드까지 포함한 while 루프입니다.

```python
while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        player.pos.x = player.pos.x - speed
    if 'right' in keys:
        player.pos.x = player.pos.x + speed
```

여기에 경계 체크를 추가합니다.

```python
    if player.pos.x > 4.7:
        player.pos.x = 4.7
    if player.pos.x < -4.7:
        player.pos.x = -4.7
```

4.7인 이유는 플레이어 반지름(0.3)을 고려해서 5 - 0.3 = 4.7로 맞춘 것입니다.

### Step 4: 목표 아이템 추가

이제 수집할 아이템을 추가합니다. 랜덤 위치에 놓겠습니다.

```python
gem = sphere(
    pos=vector(
        random() * 8 - 4,
        0,
        random() * 8 - 4),
    radius=0.2,
    color=color.yellow)
```

`random() * 8 - 4`는 -4에서 4 사이의 랜덤 값을 만듭니다. 이 코드는 while 루프 **위에** 넣으세요.

### Step 5: 충돌 감지 + 반응

플레이어가 아이템에 닿았는지 확인합니다. while 루프 안에 다음을 추가하세요.

```python
    dist = mag(player.pos - gem.pos)
    if dist < player.radius + gem.radius:
        gem.pos = vector(
            random() * 8 - 4,
            0,
            random() * 8 - 4)
```

두 물체 사이 거리가 반지름의 합보다 작으면 "닿았다"고 판단합니다. 닿으면 아이템이 새로운 랜덤 위치로 순간이동합니다.

### Step 6: 점수 표시

점수를 세고 화면에 보여 줍니다.

점수 변수와 label을 while 루프 **위에** 만듭니다.

```python
score = 0
scoreboard = label(
    pos=vector(0, 3, 0),
    text='점수: 0',
    height=20,
    color=color.white,
    box=False)
```

그리고 충돌 감지 부분에서 점수를 올립니다.

```python
    if dist < player.radius + gem.radius:
        score = score + 1
        scoreboard.text = '점수: ' + str(score)
        gem.pos = vector(
            random() * 8 - 4,
            0,
            random() * 8 - 4)
```

이제 아이템을 먹을 때마다 점수가 1씩 올라갑니다!

---

## 🐛 흔한 문제와 해결

게임을 만들다 보면 반드시 문제를 만납니다. 그게 정상입니다! 아래는 가장 자주 겪는 문제들입니다.

!!! bug "공이 벽을 뚫어요!"

    경계 체크 코드가 while 루프 안에 있는지 확인하세요. 그리고 **이동 코드 다음에** 경계 체크가 와야 합니다. 순서가 중요합니다!

    또한 경계값을 계산할 때 공의 반지름을 빼는 것을 잊지 마세요. 바닥이 -5~5이고 공의 반지름이 0.3이면, 경계는 -4.7~4.7입니다.

!!! bug "충돌이 안 감지돼요!"

    세 가지를 확인하세요.

    첫째, `mag(player.pos - gem.pos)` 에서 두 물체의 이름이 정확한지 확인하세요.

    둘째, 비교 기준이 맞는지 확인하세요. `dist < player.radius + gem.radius`처럼 **반지름의 합**과 비교해야 합니다.

    셋째, 이 코드가 while 루프 **안에** 있는지 확인하세요. 루프 밖에 있으면 딱 한 번만 체크합니다.

!!! bug "키 입력이 안 먹어요!"

    `keysdown()`의 스펠링을 확인하세요. `keydown`이 아니라 **keys**down**s**입니다. 복수형!

    그리고 `keys = keysdown()`과 `if 'left' in keys:` 코드가 모두 while 루프 **안에** 있어야 합니다.

!!! bug "점수가 한 번에 여러 개 올라가요!"

    공이 아이템과 겹쳐 있는 동안 매 프레임마다 점수가 오릅니다. 해결법: 충돌 시 아이템을 멀리 보내서 즉시 겹침을 해제하세요. 위 코드처럼 `gem.pos`를 랜덤 위치로 바꾸면 자연스럽게 해결됩니다.

---

## 📝 완성 예시: 아이템 수집 게임

지금까지 단계별로 만든 코드를 하나로 합친 완성본입니다. 이 게임에서 플레이어는 방향키로 하늘색 공을 움직여 노란 보석을 모읍니다.

먼저 무대와 물체를 만드는 부분입니다.

```python
GlowScript 3.2 VPython

# WHAT: 게임 무대 설정
scene.background = color.black

# WHAT: 바닥 — 플레이어가 움직이는 영역
ground = box(pos=vector(0,-0.5,0),
    size=vector(10,0.1,10),
    color=color.white)

# WHAT: 플레이어 공
player = sphere(pos=vector(0,0,0),
    radius=0.3, color=color.cyan)
```

보석을 랜덤 위치에 생성합니다.

```python
# WHAT: 수집할 보석 — 랜덤 위치에 생성
# WHY: random()*8-4는 -4~4 범위를 만든다
gem = sphere(
    pos=vector(random()*8-4, 0, random()*8-4),
    radius=0.2, color=color.yellow)
```

다음은 점수와 게임 설정입니다.

```python
# WHAT: 이동 속도
speed = 0.05

# WHAT: 점수 변수와 화면 표시
score = 0
scoreboard = label(
    pos=vector(0, 3, 0),
    text='점수: 0',
    height=20,
    color=color.white,
    box=False)
```

마지막으로 게임 루프입니다. 모든 동작이 여기서 일어납니다.

```python
# WHAT: 게임 루프 — 매 프레임 실행
while True:
    rate(60)

    # WHAT: 키보드 입력 읽기
    keys = keysdown()
    if 'left' in keys:
        player.pos.x = player.pos.x - speed
    if 'right' in keys:
        player.pos.x = player.pos.x + speed
    if 'up' in keys:
        player.pos.z = player.pos.z - speed
    if 'down' in keys:
        player.pos.z = player.pos.z + speed
```

```python
    # WHAT: 벽 경계 제한
    # WHY: 바닥 크기 10의 절반(5)에서 반지름(0.3)을 뺌
    if player.pos.x > 4.7:
        player.pos.x = 4.7
    if player.pos.x < -4.7:
        player.pos.x = -4.7
    if player.pos.z > 4.7:
        player.pos.z = 4.7
    if player.pos.z < -4.7:
        player.pos.z = -4.7
```

```python
    # WHAT: 충돌 감지 — 플레이어와 보석 사이 거리
    dist = mag(player.pos - gem.pos)

    # WHY: 거리가 반지름 합보다 작으면 닿은 것
    if dist < player.radius + gem.radius:
        score = score + 1
        scoreboard.text = '점수: ' + str(score)
        # WHAT: 보석을 새 랜덤 위치로 이동
        gem.pos = vector(
            random()*8-4, 0, random()*8-4)
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 방향키로 플레이어를 움직여 보석을 모으세요!</div>
<iframe src="../demos/ch10_final.html"></iframe>
</div>

??? success "실행 결과"

    검은 화면에 흰 바닥이 있고, 하늘색 공(플레이어)과 노란 공(보석)이 보입니다.

    방향키로 하늘색 공을 움직여 노란 공에 닿으면 점수가 올라가고, 노란 공이 새 위치로 이동합니다.

    공은 바닥 밖으로 나갈 수 없습니다.

---

## 💡 업그레이드 아이디어

기본 게임이 완성되었나요? 축하합니다! 이제 더 재미있게 만들어 봅시다. 아래 아이디어 중 마음에 드는 것을 골라 추가해 보세요.

### 점수 목표 추가

특정 점수에 도달하면 축하 메시지를 보여 주세요.

```python
    if score >= 10:
        scoreboard.text = '축하! 10점 달성!'
        player.color = color.green
```

### 시간 제한 추가

`clock()`을 사용하면 경과 시간을 알 수 있습니다. while 루프 위에서 시작 시간을 기록하고, 루프 안에서 체크하세요.

```python
start = clock()

while True:
    rate(60)
    elapsed = clock() - start
    if elapsed > 30:
        scoreboard.text = '시간 초과! 점수: ' + str(score)
```

### 아이템 여러 개 놓기

보석을 2-3개로 늘려 보세요. 각각 다른 변수로 만들면 됩니다.

```python
gem1 = sphere(
    pos=vector(random()*8-4, 0, random()*8-4),
    radius=0.2, color=color.yellow)
gem2 = sphere(
    pos=vector(random()*8-4, 0, random()*8-4),
    radius=0.2, color=color.orange)
gem3 = sphere(
    pos=vector(random()*8-4, 0, random()*8-4),
    radius=0.2, color=color.magenta)
```

각각에 대해 충돌 감지를 따로 해야 합니다. 비슷한 코드가 반복되죠? 조금 번거롭지만 지금은 이 방법밖에 없습니다.

### 장애물 추가

피해야 하는 빨간 물체를 추가하면 긴장감이 생깁니다.

```python
obstacle = box(
    pos=vector(random()*8-4, 0, random()*8-4),
    size=vector(0.5,0.5,0.5),
    color=color.red)
```

```python
    obs_dist = mag(player.pos - obstacle.pos)
    if obs_dist < player.radius + 0.25:
        score = score - 1
        scoreboard.text = '점수: ' + str(score)
        player.pos = vector(0, 0, 0)
```

??? hint "다음 챕터에서 가능해지는 것들"

    지금 아이템 3개를 만들려면 변수 3개, 충돌 감지 3번을 써야 합니다. 아이템 50개라면? 150줄을 써야 하죠.

    Ch.11에서 반복문을, Ch.12에서 리스트를 배우면, 아이템 50개를 만들고 충돌 감지까지 하는 코드가 **5줄이면 충분**합니다. 기대하세요!

---

## ✅ 3줄 정리

**설계 → 분해 → 구현**이 프로그래밍의 핵심입니다. 코드부터 쓰지 말고 먼저 계획합니다.

Ch.4-9에서 배운 **변수, 랜덤, 애니메이션, 조건, 입력, 충돌**이 하나로 합쳐져 게임이 되었습니다.

더 많은 도구를 배우면 더 멋진 게임을 만들 수 있습니다 — Part 4에서 새로운 무기를 장착합니다!

---

> **다음 시간**: Ch.11에서는 `for` 반복문을 배웁니다. 지금까지 공 10개를 만들려면 10줄을 써야 했죠? `for`를 배우면 3줄이면 충분합니다. 패턴의 힘!
