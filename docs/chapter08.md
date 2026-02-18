# Ch.8 — 키보드로 조종하기

**Part 3: 게임을 향해** | 핵심: `keysdown()`, `in`, 입력→동작

---

## 🎬 오늘의 장면

지금까지 우리가 만든 공은 혼자 움직였습니다. 속도를 정해주면 알아서 날아가고, 벽에 부딪히면 튕기고. 우리는 그걸 **구경만** 했죠.

오늘은 다릅니다. **키보드를 누르면 공이 움직입니다.** 여러분이 직접 조종하는 겁니다.

게임을 해본 적 있나요? 화살표 키를 누르면 캐릭터가 움직이잖아요. 오늘 그걸 만듭니다.

아래 코드를 실행하고, **키보드 오른쪽 화살표(→)를 눌러보세요.**

<div class="glowscript-demo" markdown>
<div class="demo-label">화살표 키로 공을 움직여보세요!</div>
<iframe src="../demos/ch08_scene.html"></iframe>
</div>

```python
GlowScript 3.2 VPython

ball = sphere(color=color.yellow, radius=0.5)
speed = 0.05

while True:
    rate(60)
    keys = keysdown()
    if 'right' in keys:
        ball.pos.x += speed
```

공이 오른쪽으로 움직이나요? 키에서 손을 떼면 멈추나요?

??? question "키를 안 누르면 어떻게 되나요?"
    아무 일도 일어나지 않습니다. `keysdown()`이 빈 목록을 돌려주기 때문에, `'right' in keys`가 거짓이 되어 `if` 안의 코드가 실행되지 않습니다.

---

## 🔍 코드 읽기 챌린지

이 코드를 한 줄씩 읽어봅시다.

```python
GlowScript 3.2 VPython

ball = sphere(color=color.cyan, radius=0.5)
speed = 0.03

while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        ball.pos.x -= speed
    if 'right' in keys:
        ball.pos.x += speed
```

<div class="code-result" markdown>
**실행 결과**: 시안색 공이 왼쪽/오른쪽 화살표 키에 따라 좌우로 움직입니다. 두 키를 동시에 확인하므로 대각선 이동도 가능합니다.
</div>

**줄별 해석:**

- `keys = keysdown()` — 지금 이 순간 눌려 있는 키들을 모아서 `keys`에 저장합니다
- `if 'left' in keys` — `keys` 안에 `'left'`(왼쪽 화살표)가 있는지 확인합니다
- `ball.pos.x -= speed` — 있으면 공을 왼쪽으로 이동합니다
- `if 'right' in keys` — `keys` 안에 `'right'`(오른쪽 화살표)가 있는지 확인합니다
- `ball.pos.x += speed` — 있으면 공을 오른쪽으로 이동합니다

!!! tip "`in`이 뭔가요?"
    `in`은 "~안에 있는가?"를 묻는 연산자입니다. `'left' in keys`는 "keys 안에 'left'가 있나요?"라는 질문입니다. 답은 `True` 아니면 `False`입니다.

??? question "왜 `elif`가 아니라 `if`를 두 번 쓰나요?"
    `elif`를 쓰면 왼쪽 키가 눌렸을 때 오른쪽 키는 확인하지 않습니다. `if`를 두 번 쓰면 **두 키를 동시에 확인**할 수 있습니다. 나중에 대각선 이동에서 이게 중요해집니다.

---

## 🛠️ 직접 만들어보기

### 단계 1: 4방향 이동

왼쪽/오른쪽만 되던 코드에 **위/아래**를 추가해봅시다.

```python
GlowScript 3.2 VPython

ball = sphere(color=color.green, radius=0.5)
speed = 0.05

while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        ball.pos.x -= speed
    if 'right' in keys:
        ball.pos.x += speed
    if 'up' in keys:
        ball.pos.y += speed
    if 'down' in keys:
        ball.pos.y -= speed
```

실행하고 화살표 키 네 개를 모두 눌러보세요. 상하좌우 모두 되나요?

??? question "대각선으로도 움직일 수 있나요?"
    네! 오른쪽 화살표와 위쪽 화살표를 **동시에** 누르면 공이 대각선으로 움직입니다. `if`를 따로따로 썼기 때문에 두 조건이 동시에 참이 될 수 있습니다.

### 단계 2: 바닥 위에서 움직이기

이번에는 바닥판을 깔고, 그 위에서 공을 움직여봅시다.

```python
GlowScript 3.2 VPython

ground = box(pos=vector(0,-0.5,0),
    size=vector(10,0.1,10),
    color=color.white)
ball = sphere(pos=vector(0,0.5,0),
    color=color.red, radius=0.5)
speed = 0.05

while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        ball.pos.x -= speed
    if 'right' in keys:
        ball.pos.x += speed
    if 'up' in keys:
        ball.pos.z -= speed
    if 'down' in keys:
        ball.pos.z += speed
```

!!! tip "y 대신 z?"
    3D 바닥 위를 걷는 느낌을 내려면 y(높이)가 아니라 **z(앞뒤)**를 바꿔야 합니다. 위쪽 화살표를 누르면 `z`가 줄어들고(멀어지고), 아래쪽 화살표를 누르면 `z`가 늘어납니다(가까워집니다).

---

## 🔄 역추적 챌린지

아래 결과를 보고, 빈칸을 채워보세요.

**결과:** 공이 화면에서 위쪽 화살표를 누르면 오른쪽으로, 왼쪽 화살표를 누르면 위로 갑니다.

<div class="scene-preview">
  <div class="obj" style="left: 45%; top: 42%; width: 40px; height: 40px; background: radial-gradient(circle at 35% 35%, #ffa502, #e67e22);"></div>
  <div style="position: absolute; left: 60%; top: 35%; color: #aaa; font-size: 12px;">→ ↑ 화살표 키</div>
</div>

```python
GlowScript 3.2 VPython

ball = sphere(color=color.orange, radius=0.5)
speed = 0.04

while True:
    rate(60)
    keys = keysdown()
    if 'up' in keys:
        ball.pos.x += speed
    if 'left' in keys:
        ball.pos.y += speed
```

??? success "정답 확인"
    - `'up'` → `ball.pos.x += speed` : 위쪽 화살표를 누르면 **오른쪽**으로 이동
    - `'left'` → `ball.pos.y += speed` : 왼쪽 화살표를 누르면 **위쪽**으로 이동

    키와 방향의 연결은 우리가 **자유롭게** 정할 수 있습니다. "위 키 = 위쪽 이동"일 필요가 없어요!

**도전:** 아래 코드에서 `???`를 채워서, 스페이스바를 누르면 공이 위로 **점프**하게 만들어보세요.

```python
GlowScript 3.2 VPython

ball = sphere(color=color.yellow, radius=0.5)

while True:
    rate(60)
    keys = keysdown()
    if ??? in keys:
        ball.pos.y += 0.1
```

??? success "정답"
    `' '`입니다. 스페이스바는 작은따옴표 사이에 **공백 한 칸**을 넣어서 표현합니다: `' '`

---

## 📖 알고 넘어가기

### keysdown() 함수

`keysdown()`은 **지금 이 순간** 눌려 있는 키보드 키들의 목록을 돌려줍니다.

- 아무 키도 안 눌렸으면 빈 목록을 돌려줍니다
- 키 하나를 누르면 그 키 이름이 들어 있는 목록을 돌려줍니다
- 키 두 개를 동시에 누르면 두 키 이름이 모두 들어 있습니다

### in 연산자

`in`은 "포함되어 있는가?"를 묻는 연산자입니다.

- `'left' in keys` → keys 안에 'left'가 있으면 `True`, 없으면 `False`
- Ch.7에서 배운 비교연산자(`>`, `<`, `==`)처럼 결과가 `True` 또는 `False`입니다

### 자주 쓰는 키 이름

- 화살표: `'left'`, `'right'`, `'up'`, `'down'`
- 알파벳: `'a'`, `'b'`, `'c'` ... `'z'` (소문자)
- 스페이스바: `' '` (공백 한 칸)
- 숫자: `'1'`, `'2'`, `'3'` ... `'0'`

### 입력→동작 매핑

"이 키를 누르면 이렇게 하라"는 연결을 **입력→동작 매핑**이라고 합니다.

```
키 입력          →  동작
'left'  눌림    →  ball.pos.x -= speed
'right' 눌림    →  ball.pos.x += speed
'up'    눌림    →  ball.pos.y += speed
'down'  눌림    →  ball.pos.y -= speed
```

이 매핑은 여러분이 **자유롭게 설계**할 수 있습니다. WASD로 이동하게 할 수도 있고, 키 하나로 색을 바꾸게 할 수도 있습니다.

---

## 🐛 버그 사냥

### 버그 1: 키를 눌러도 안 움직여요

```python
GlowScript 3.2 VPython

ball = sphere(color=color.magenta, radius=0.5)
speed = 0.05

while True:
    rate(60)
    if 'right' in keys:
        ball.pos.x += speed
```

??? bug "버그 찾기"
    `keys = keysdown()`이 빠졌습니다! `keysdown()`을 호출해서 `keys`에 저장해야 하는데, 그 줄이 없으니 `keys`가 무엇인지 컴퓨터가 모릅니다.

    **수정:** `rate(60)` 다음 줄에 `keys = keysdown()`을 추가합니다.

### 버그 2: 왼쪽 키를 눌렀는데 오른쪽으로 가요

```python
GlowScript 3.2 VPython

ball = sphere(color=color.cyan, radius=0.5)
speed = 0.05

while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        ball.pos.x += speed
```

??? bug "버그 찾기"
    `+=`가 아니라 `-=`여야 합니다. 왼쪽으로 가려면 x가 **줄어들어야** 하니까요.

    **수정:** `ball.pos.x += speed` → `ball.pos.x -= speed`

### 버그 3: 대각선이 안 돼요

```python
GlowScript 3.2 VPython

ball = sphere(color=color.white, radius=0.5)
speed = 0.05

while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        ball.pos.x -= speed
    elif 'up' in keys:
        ball.pos.y += speed
```

??? bug "버그 찾기"
    `elif`를 썼기 때문입니다! `elif`는 위의 `if`가 참이면 아래를 **건너뜁니다**. 왼쪽 키가 눌린 순간 위쪽 키는 확인하지 않아요.

    **수정:** `elif`를 `if`로 바꾸면 두 키를 동시에 확인하므로 대각선이 됩니다.

---

## 💡 상상 챌린지

### 도전 1: 벽 안에서만 움직이기

Ch.7에서 배운 `if` 조건을 활용해서, 공이 벽 밖으로 못 나가게 만들어보세요.

```python
GlowScript 3.2 VPython

wall_right = box(pos=vector(5,0,0),
    size=vector(0.2,2,0.2),
    color=color.white)
wall_left = box(pos=vector(-5,0,0),
    size=vector(0.2,2,0.2),
    color=color.white)
ball = sphere(color=color.yellow, radius=0.5)
speed = 0.05

while True:
    rate(60)
    keys = keysdown()
    if 'right' in keys:
        ball.pos.x += speed
    if 'left' in keys:
        ball.pos.x -= speed
    if ball.pos.x > 4.5:
        ball.pos.x = 4.5
    if ball.pos.x < -4.5:
        ball.pos.x = -4.5
```

!!! tip "벽 제한의 원리"
    이동한 **다음에** 위치를 확인합니다. 만약 벽을 넘었으면 벽 위치로 되돌려놓습니다. 간단하지만 효과적입니다!

### 도전 2: 아이템 먹기

고정된 공(아이템)이 있고, 내 공이 그 위치에 도달하면 아이템이 사라지게 만들어보세요.

```python
GlowScript 3.2 VPython

item = sphere(pos=vector(3,0,0),
    color=color.red, radius=0.3)
ball = sphere(color=color.yellow, radius=0.5)
speed = 0.05

while True:
    rate(60)
    keys = keysdown()
    if 'left' in keys:
        ball.pos.x -= speed
    if 'right' in keys:
        ball.pos.x += speed
    if 'up' in keys:
        ball.pos.y += speed
    if 'down' in keys:
        ball.pos.y -= speed
    if ball.pos.x > 2.5 and ball.pos.x < 3.5:
        if ball.pos.y > -0.5 and ball.pos.y < 0.5:
            item.visible = False
```

??? question "왜 정확히 같은 위치가 아니라 범위로 확인하나요?"
    공이 한 번에 `speed`(0.05)만큼 이동하기 때문에, 정확히 (3,0,0)을 지나가지 않을 수 있습니다. 그래서 **범위**로 확인하는 게 안전합니다. 다음 시간에 배울 `mag()` 함수를 쓰면 거리 계산이 훨씬 깔끔해집니다!

---

## 📝 오늘의 완성 코드

4방향으로 움직이고, 벽에 갇히고, 아이템을 먹는 미니 게임입니다.

```python
GlowScript 3.2 VPython

# WHY: 바닥과 벽을 만들어 게임 공간을 설정
ground = box(pos=vector(0,-1,0),
    size=vector(12,0.1,0.2),
    color=color.white)
wall_L = box(pos=vector(-6,0.5,0),
    size=vector(0.2,3,0.2),
    color=color.white)
wall_R = box(pos=vector(6,0.5,0),
    size=vector(0.2,3,0.2),
    color=color.white)

# WHAT: 조종할 공과 먹을 아이템
ball = sphere(pos=vector(-4,0,0),
    color=color.yellow, radius=0.4)
item = sphere(pos=vector(4,0,0),
    color=color.red, radius=0.3)

# WHAT: 이동 속도
speed = 0.05
```

```python
# WHY: 매 프레임마다 키 입력을 확인하고 반응
while True:
    rate(60)

    # WHAT: 현재 눌린 키 목록 가져오기
    keys = keysdown()

    # WHY: 4방향 이동 (if 4번 = 대각선 가능)
    if 'left' in keys:
        ball.pos.x -= speed
    if 'right' in keys:
        ball.pos.x += speed
    if 'up' in keys:
        ball.pos.y += speed
    if 'down' in keys:
        ball.pos.y -= speed
```

```python
    # WHY: 벽 밖으로 못 나가게 제한
    if ball.pos.x > 5.5:
        ball.pos.x = 5.5
    if ball.pos.x < -5.5:
        ball.pos.x = -5.5
    if ball.pos.y > 2.5:
        ball.pos.y = 2.5
    if ball.pos.y < -0.8:
        ball.pos.y = -0.8

    # WHY: 아이템 근처에 가면 먹기(숨기기)
    if ball.pos.x > 3.5 and ball.pos.x < 4.5:
        if ball.pos.y > -0.5 and ball.pos.y < 0.5:
            item.visible = False
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 키보드 미니 게임</div>
<iframe src="../demos/ch08_final.html"></iframe>
</div>

---

## ✅ 3줄 정리

!!! tip "오늘 배운 것"
    1. `keysdown()`은 지금 눌려 있는 키 목록을 돌려준다
    2. `'left' in keys`처럼 `in`으로 특정 키가 눌렸는지 확인한다
    3. 어떤 키에 어떤 동작을 연결할지는 내가 자유롭게 설계한다

---

## 🚀 더 탐험하기

??? hint "WASD로 조종하기"
    화살표 대신 WASD 키를 써보세요. 게임에서 많이 쓰는 방식입니다!

    ```python
    GlowScript 3.2 VPython

    ball = sphere(color=color.green, radius=0.5)
    speed = 0.05

    while True:
        rate(60)
        keys = keysdown()
        if 'a' in keys:
            ball.pos.x -= speed
        if 'd' in keys:
            ball.pos.x += speed
        if 'w' in keys:
            ball.pos.y += speed
        if 's' in keys:
            ball.pos.y -= speed
    ```

??? hint "스페이스바로 색 바꾸기"
    이동 말고 다른 동작도 연결할 수 있습니다. 스페이스바를 누르면 색이 바뀌게 해보세요.

    ```python
    GlowScript 3.2 VPython

    ball = sphere(color=color.yellow, radius=0.5)
    speed = 0.05

    while True:
        rate(60)
        keys = keysdown()
        if 'left' in keys:
            ball.pos.x -= speed
        if 'right' in keys:
            ball.pos.x += speed
        if ' ' in keys:
            ball.color = color.red
    ```

??? hint "두 플레이어 게임"
    한 명은 화살표, 한 명은 WASD! 같은 키보드로 둘이서 플레이할 수 있습니다.

    ```python
    GlowScript 3.2 VPython

    p1 = sphere(pos=vector(-3,0,0),
        color=color.red, radius=0.4)
    p2 = sphere(pos=vector(3,0,0),
        color=color.blue, radius=0.4)
    speed = 0.05

    while True:
        rate(60)
        keys = keysdown()
        if 'left' in keys:
            p1.pos.x -= speed
        if 'right' in keys:
            p1.pos.x += speed
        if 'a' in keys:
            p2.pos.x -= speed
        if 'd' in keys:
            p2.pos.x += speed
    ```

> **다음 시간**: Ch.9에서는 **충돌 감지**를 배웁니다. 두 물체가 부딪혔는지 어떻게 알 수 있을까? `mag()` 함수로 거리를 재면 "만났다!"를 코드로 표현할 수 있습니다.
