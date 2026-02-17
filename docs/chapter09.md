# Chapter 9: 충돌 감지 — 부딪히면 어떻게 될까?

**Part 3: 조건과 선택의 힘**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **두 물체 사이의 거리를 계산**할 수 있다 — 벡터 뺄셈과 `mag()` 함수 활용
- **`mag()` 함수로 벡터의 크기를 구**할 수 있다 — 3D 공간에서의 거리 측정
- **충돌 조건을 설정하고 반응을 프로그래밍**할 수 있다 — 색 변환, 튕기기, 게임 로직까지

> 🎮 **이번 시간에 만들 것**: 공 두 개가 움직이다가 부딪히면 색이 바뀌는 시뮬레이션, 그리고 패들로 공을 튕겨 벽돌을 깨는 미니 '벽돌깨기' 게임을 만듭니다. 물리 시뮬레이션과 게임의 핵심인 **충돌 감지(Collision Detection)**를 직접 구현합니다!

---

## 💡 왜 이걸 배우나요?

### 부딪힘을 감지하는 것, 왜 중요할까?

여러분이 좋아하는 게임을 떠올려 보세요. 마리오가 적에게 닿으면 죽고, 총알이 벽에 맞으면 사라지고, 공이 라켓에 닿으면 튕겨 나갑니다. 이 모든 것의 기본은 **"두 물체가 부딪혔는가?"**를 판단하는 것입니다.

현실 세계에서는 부딪힘이 자연스럽게 일어납니다. 공을 벽에 던지면 알아서 튕겨 나오죠. 하지만 컴퓨터 세계에서는 다릅니다. **우리가 직접 "부딪혔다"는 조건을 정의하고, 부딪혔을 때 어떻게 할지 명령해야** 합니다.

이전 장에서 배운 `if` 문이 여기서 빛을 발합니다. "만약 두 물체의 거리가 충분히 가까우면 → 충돌!" 이 한 줄의 논리가 게임, 물리 시뮬레이션, 로봇 제어, 자율주행까지 모든 곳에서 사용됩니다.

### 🧠 이번 장의 컴퓨팅 사고력

이번 장에서 훈련하는 핵심 사고는 **추상화(Abstraction)**입니다. 현실의 복잡한 "충돌"을 **"두 점 사이의 거리가 특정 값보다 작은가?"**라는 단순한 수학 문제로 바꿉니다. 복잡한 현상을 핵심만 뽑아 단순화하는 것 — 이것이 추상화이고, 프로그래머의 가장 강력한 무기입니다.

---

## 📚 핵심 개념

### 개념 1: 두 점 사이의 거리

**🎭 비유로 시작하기**

놀이터에서 친구와 술래잡기를 한다고 상상해 보세요. "잡았다!"를 외치려면, 친구가 충분히 가까이 있어야 합니다. 여러분의 뇌는 순간적으로 **거리를 판단**하고 있는 겁니다.

1차원에서 거리는 간단합니다. 숫자 직선 위에서 3과 7 사이의 거리는 `7 - 3 = 4`입니다.

2차원에서는? 수학 시간에 배운 피타고라스 정리를 써야 합니다. 점 (1, 0)과 점 (4, 4) 사이의 거리는 `sqrt((4-1)² + (4-0)²) = sqrt(9 + 16) = sqrt(25) = 5`입니다.

3차원에서는? 축이 하나 더 늘어날 뿐입니다. `sqrt((x2-x1)² + (y2-y1)² + (z2-z1)²)`.

**📖 정확한 정의**

두 점 A(x1, y1, z1)과 B(x2, y2, z2) 사이의 **거리(distance)**는 두 점을 잇는 직선의 길이입니다. 3D 공간에서의 거리 공식은 피타고라스 정리를 3차원으로 확장한 것입니다.

**💻 예시로 확인하기**

```python
from vpython import *

# 파이썬으로 직접 거리를 계산해 보자
import math

# 1D: 두 점 사이의 거리
x1, x2 = 3, 7
distance_1d = abs(x2 - x1)
print("1D 거리:", distance_1d)  # 4

# 2D: 피타고라스 정리
point_a = (1, 0)
point_b = (4, 4)
distance_2d = math.sqrt((point_b[0]-point_a[0])**2 + (point_b[1]-point_a[1])**2)
print("2D 거리:", distance_2d)  # 5.0

# 3D: 축이 하나 더!
point_c = (0, 0, 0)
point_d = (1, 2, 2)
distance_3d = math.sqrt((1-0)**2 + (2-0)**2 + (2-0)**2)
print("3D 거리:", distance_3d)  # 3.0
```

하지만 이렇게 매번 공식을 직접 쓰는 것은 번거롭죠? VPython에는 이것을 한 방에 해결해 주는 함수가 있습니다!

---

### 개념 2: `mag()` 함수와 벡터 뺄셈

**🎭 비유로 시작하기**

내비게이션을 생각해 보세요. "현재 위치"에서 "목적지"까지의 거리를 알려면, 먼저 **방향과 거리를 합친 화살표**(벡터)를 구한 다음, 그 **화살표의 길이**(크기)를 재면 됩니다.

VPython에서는 이 과정이 딱 두 단계입니다.

- **벡터 뺄셈**: `ball2.pos - ball1.pos` → 두 물체 사이의 "화살표"를 구한다
- **`mag()` 함수**: `mag(화살표)` → 그 화살표의 "길이"를 구한다

> 📖 **파이썬 문법: `mag()` 함수**
>
> **`mag()`**은 magnitude(크기)의 줄임말로, 벡터의 길이(크기)를 반환합니다.
>
> - **사용법**: `mag(벡터)` → 숫자 하나를 반환
> - **예시**: `mag(vector(3, 4, 0))` → `5.0` (3-4-5 삼각형!)
> - **원리**: 내부적으로 `sqrt(x² + y² + z²)`을 계산
> - **핵심 패턴**: `mag(물체A.pos - 물체B.pos)` → 두 물체 사이의 거리

**💻 예시로 확인하기**

```python
from vpython import *

# mag() 함수로 벡터의 크기 구하기
v1 = vector(3, 4, 0)
print("v1의 크기:", mag(v1))  # 5.0 (3-4-5 삼각형)

v2 = vector(1, 2, 2)
print("v2의 크기:", mag(v2))  # 3.0

# 두 위치 사이의 거리 = 벡터 뺄셈 후 mag()
pos_a = vector(1, 0, 0)
pos_b = vector(4, 4, 0)
diff = pos_b - pos_a           # vector(3, 4, 0)
distance = mag(diff)           # 5.0
print("두 점 사이의 거리:", distance)

# 한 줄로 쓸 수도 있다!
distance = mag(pos_b - pos_a)  # 5.0
print("한 줄로:", distance)
```

> 📖 **파이썬 문법: 벡터 뺄셈**
>
> VPython의 `vector`끼리는 뺄셈이 가능합니다.
>
> - `vector(4, 4, 0) - vector(1, 0, 0)` → `vector(3, 4, 0)`
> - 각 성분(x, y, z)끼리 따로 빼는 것입니다
> - 결과는 **A에서 B로 향하는 방향과 거리**를 담은 벡터입니다
> - `물체B.pos - 물체A.pos`는 "A에서 B까지의 화살표"라고 생각하면 됩니다

---

### 개념 3: 충돌 판정 — "충분히 가까우면 부딪힌 것이다"

**🎭 비유로 시작하기**

축구에서 골키퍼가 공을 잡으려면, 골키퍼의 손과 공의 거리가 거의 0이 되어야 합니다. 정확히 0은 아니지만, **충분히 가까우면** "잡았다"고 판정합니다.

컴퓨터에서도 마찬가지입니다. 두 공이 "닿았다"를 어떻게 판단할까요?

**두 공의 중심 사이 거리 < 두 공의 반지름의 합**

이 조건이 참이면, 두 공의 표면이 겹치고 있다는 뜻입니다. 즉, **충돌**입니다!

**📖 정확한 정의**

**충돌 감지(Collision Detection)**란 두 물체가 접촉하거나 겹치는 순간을 프로그래밍적으로 판별하는 것입니다. 가장 기본적인 방법은 **원(구) 충돌 감지**로, 두 원(구)의 중심 사이 거리가 두 반지름의 합보다 작으면 충돌로 판정합니다.

**💻 핵심 패턴**

```python
from vpython import *

# 충돌 감지의 핵심 패턴
ball1 = sphere(pos=vector(-3, 0, 0), radius=0.5, color=color.red)
ball2 = sphere(pos=vector(3, 0, 0), radius=0.7, color=color.blue)

# 거리 계산
distance = mag(ball1.pos - ball2.pos)

# 충돌 판정
if distance < ball1.radius + ball2.radius:
    print("충돌!")  # 두 공의 표면이 겹쳤다
else:
    print("아직 안 부딪혔다")  # 거리: 6, 반지름 합: 1.2 → 충돌 아님
```

> 📖 **파이썬 문법: `abs()` 함수**
>
> `abs()`는 절댓값을 반환하는 파이썬 내장 함수입니다.
>
> - `abs(-5)` → `5`
> - `abs(3)` → `3`
> - 1D 거리 계산에 유용: `abs(ball1.pos.x - ball2.pos.x)`
> - `mag()`는 3D 전체 거리, `abs()`는 한 축 방향 거리에 사용
> - 벽과의 충돌처럼 특정 축만 비교할 때 `abs()`가 편리합니다

---

## 🔨 따라하기

자, 이제 직접 충돌을 감지하는 프로그램을 만들어 봅시다!

### Step 1: 두 공의 거리 측정하기

먼저 두 공을 놓고, 실시간으로 거리를 측정하는 프로그램을 만들어 봅시다.

```python
from vpython import *

# === WHAT: 두 공 사이의 거리를 실시간으로 표시하기 ===

# 장면 설정
scene.background = color.white
scene.caption = "두 공 사이의 거리를 관찰하세요!"

# 두 공 생성
ball1 = sphere(pos=vector(-3, 0, 0), radius=0.5, color=color.red)
ball2 = sphere(pos=vector(3, 0, 0), radius=0.5, color=color.blue)

# 두 공을 잇는 선 (거리 시각화)
connection = cylinder(pos=ball1.pos, axis=ball2.pos - ball1.pos,
                      radius=0.02, color=color.gray(0.5))

# 거리 텍스트 표시
dist_label = label(pos=vector(0, 1, 0), text="")

# ball1을 오른쪽으로 이동시키며 거리 변화 관찰
ball1.velocity = vector(0.5, 0, 0)

while True:
    rate(60)

    # ball1 이동
    ball1.pos = ball1.pos + ball1.velocity * (1/60)

    # 거리 계산
    distance = mag(ball1.pos - ball2.pos)

    # 연결선 업데이트
    connection.pos = ball1.pos
    connection.axis = ball2.pos - ball1.pos

    # 거리 텍스트 업데이트
    dist_label.text = "거리: " + str(round(distance, 2))

    # 충돌 판정!
    if distance < ball1.radius + ball2.radius:
        dist_label.text = "충돌! 거리: " + str(round(distance, 2))
        dist_label.color = color.red
        ball1.velocity = vector(0, 0, 0)  # 멈춤
```

**실행 결과**: 빨간 공이 오른쪽으로 천천히 이동하면서, 화면 위에 두 공 사이의 거리가 실시간으로 표시됩니다. 거리가 줄어들다가 반지름의 합(1.0) 이하가 되면 "충돌!"이 표시되고 빨간 공이 멈춥니다.

**핵심 코드 분석**

- `mag(ball1.pos - ball2.pos)` — 두 공 중심 사이의 3D 거리
- `distance < ball1.radius + ball2.radius` — 충돌 조건: 거리가 반지름의 합보다 작으면 표면이 겹침
- `round(distance, 2)` — 소수점 둘째 자리까지 반올림 (보기 편하게)

---

### Step 2: 충돌하면 튕기기!

이번에는 두 공이 서로를 향해 움직이다가 부딪히면 **튕겨 나가는** 시뮬레이션을 만들어 봅시다.

```python
from vpython import *

# === WHAT: 두 공이 부딪히면 색이 바뀌고 튕겨 나가기 ===

scene.background = color.white
scene.width = 800
scene.height = 400

# 두 공 생성 — 서로를 향해 움직인다
ball1 = sphere(pos=vector(-4, 0, 0), radius=0.5,
               color=color.red, make_trail=True)
ball1.velocity = vector(2, 0, 0)   # 오른쪽으로

ball2 = sphere(pos=vector(4, 0, 0), radius=0.5,
               color=color.blue, make_trail=True)
ball2.velocity = vector(-2, 0, 0)  # 왼쪽으로

# 충돌 횟수 추적
collision_count = 0
info = label(pos=vector(0, 2, 0), text="충돌 횟수: 0", color=color.black)

dt = 1/60  # 시간 간격

while True:
    rate(60)

    # 공 이동
    ball1.pos = ball1.pos + ball1.velocity * dt
    ball2.pos = ball2.pos + ball2.velocity * dt

    # 거리 계산
    distance = mag(ball1.pos - ball2.pos)

    # 충돌 판정
    if distance < ball1.radius + ball2.radius:
        # 충돌! 속도를 반대로 (튕기기)
        ball1.velocity = -ball1.velocity
        ball2.velocity = -ball2.velocity

        # 색상 변경으로 충돌 시각 효과
        ball1.color = color.yellow
        ball2.color = color.yellow

        collision_count = collision_count + 1
        info.text = "충돌 횟수: " + str(collision_count)
    else:
        # 충돌이 아닐 때 원래 색상으로 복귀
        ball1.color = color.red
        ball2.color = color.blue

    # 화면 밖으로 나가면 방향 전환 (벽 반사)
    if abs(ball1.pos.x) > 6:
        ball1.velocity.x = -ball1.velocity.x
    if abs(ball2.pos.x) > 6:
        ball2.velocity.x = -ball2.velocity.x
```

**실행 결과**: 빨간 공과 파란 공이 서로를 향해 달려가다가, 부딪히는 순간 둘 다 노란색으로 변하면서 튕겨 나갑니다. 벽에 반사되어 다시 돌아와 또 부딪히고... 충돌 횟수가 계속 올라갑니다!

**핵심 포인트**

- **`-ball1.velocity`** — 속도 벡터에 마이너스를 붙이면 방향이 반대로 바뀝니다. 이것이 "튕기기"의 핵심!
- **`abs(ball1.pos.x) > 6`** — 특정 축의 좌표만 비교할 때는 `abs()`를 사용합니다. 여기서는 x좌표가 -6보다 작거나 6보다 큰지(벽에 닿았는지)를 확인합니다.
- 충돌 순간에만 색이 바뀌고, 떨어지면 원래 색으로 돌아옵니다.

---

### Step 3: 벽돌깨기 게임 만들기! 🧱

자, 지금까지 배운 것을 총동원해서 간단한 벽돌깨기 게임을 만들어 봅시다. 키보드로 패들을 조작하고, 공이 벽돌에 닿으면 벽돌이 사라집니다!

```python
from vpython import *

# === WHAT: 벽돌깨기 미니 게임 ===

scene.background = color.black
scene.width = 600
scene.height = 600
scene.caption = "← → 화살표 키로 패들을 움직이세요!"

# --- 게임 영역 경계 ---
wall_left = box(pos=vector(-6, 0, 0), size=vector(0.2, 12, 0.5),
                color=color.gray(0.3))
wall_right = box(pos=vector(6, 0, 0), size=vector(0.2, 12, 0.5),
                 color=color.gray(0.3))
wall_top = box(pos=vector(0, 6, 0), size=vector(12, 0.2, 0.5),
               color=color.gray(0.3))

# --- 패들 (아래쪽) ---
paddle = box(pos=vector(0, -5, 0), size=vector(2.5, 0.3, 0.5),
             color=color.white)
paddle_speed = 0.3

# --- 공 ---
ball = sphere(pos=vector(0, -4, 0), radius=0.25,
              color=color.white, make_trail=True, trail_type="curve",
              retain=30)
ball.velocity = vector(3, 4, 0)

# --- 벽돌 만들기 ---
bricks = []
brick_colors = [color.red, color.orange, color.yellow,
                color.green, color.cyan]

for row in range(5):
    for col in range(8):
        x = -4.5 + col * 1.3
        y = 4 - row * 0.6
        brick = box(pos=vector(x, y, 0), size=vector(1.1, 0.4, 0.5),
                    color=brick_colors[row])
        bricks.append(brick)

# --- 점수 표시 ---
score = 0
score_label = label(pos=vector(0, -6.5, 0),
                    text="점수: 0 / " + str(len(bricks)),
                    color=color.white, height=16, box=False)

# --- 키보드 입력 처리 ---
keys_pressed = {"left": False, "right": False}

def keydown(evt):
    if evt.key == "left":
        keys_pressed["left"] = True
    elif evt.key == "right":
        keys_pressed["right"] = True

def keyup(evt):
    if evt.key == "left":
        keys_pressed["left"] = False
    elif evt.key == "right":
        keys_pressed["right"] = False

scene.bind("keydown", keydown)
scene.bind("keyup", keyup)

# --- 게임 루프 ---
dt = 1/60
game_over = False

while not game_over:
    rate(60)

    # 패들 이동 (키보드)
    if keys_pressed["left"] and paddle.pos.x > -4.5:
        paddle.pos.x = paddle.pos.x - paddle_speed
    if keys_pressed["right"] and paddle.pos.x < 4.5:
        paddle.pos.x = paddle.pos.x + paddle_speed

    # 공 이동
    ball.pos = ball.pos + ball.velocity * dt

    # 벽 충돌 (좌/우)
    if ball.pos.x - ball.radius < -5.9 or ball.pos.x + ball.radius > 5.9:
        ball.velocity.x = -ball.velocity.x

    # 벽 충돌 (위)
    if ball.pos.y + ball.radius > 5.9:
        ball.velocity.y = -ball.velocity.y

    # 패들 충돌
    if ball.velocity.y < 0:  # 공이 아래로 내려올 때만
        if abs(ball.pos.x - paddle.pos.x) < paddle.size.x/2 + ball.radius:
            if abs(ball.pos.y - paddle.pos.y) < paddle.size.y/2 + ball.radius:
                ball.velocity.y = abs(ball.velocity.y)  # 위로 튕기기
                ball.color = color.white

    # 벽돌 충돌 검사
    for brick in bricks:
        if brick.visible:  # 아직 안 깨진 벽돌만 검사
            # 벽돌과의 거리 (간단한 박스 충돌)
            dx = abs(ball.pos.x - brick.pos.x)
            dy = abs(ball.pos.y - brick.pos.y)

            if dx < brick.size.x/2 + ball.radius and dy < brick.size.y/2 + ball.radius:
                # 충돌! 벽돌 제거
                brick.visible = False
                score = score + 1
                score_label.text = "점수: " + str(score) + " / " + str(len(bricks))

                # 어느 방향에서 부딪혔는지에 따라 반사
                if dx > dy:
                    ball.velocity.x = -ball.velocity.x
                else:
                    ball.velocity.y = -ball.velocity.y

                ball.color = brick.color  # 깬 벽돌의 색을 공에 입히기
                break  # 한 프레임에 하나의 벽돌만 처리

    # 바닥에 떨어지면 게임 오버
    if ball.pos.y < -6:
        game_over = True
        score_label.text = "게임 오버! 최종 점수: " + str(score) + " / " + str(len(bricks))
        ball.velocity = vector(0, 0, 0)

    # 전부 깨면 승리
    if score == len(bricks):
        game_over = True
        score_label.text = "축하합니다! 모든 벽돌을 깼습니다!"
        score_label.color = color.yellow
```

**실행 결과**: 화면에 형형색색의 벽돌 40개가 줄지어 있고, 흰 공이 위아래로 튕기며 움직입니다. 화살표 키로 패들을 좌우로 움직여 공을 튕겨 올리면, 공이 벽돌에 닿을 때마다 벽돌이 사라지고 점수가 올라갑니다. 공을 놓치면 게임 오버!

**핵심 코드 분석**

- **벽돌 생성**: `for` 반복문 두 개를 중첩해서 5행 8열의 벽돌을 자동으로 배치합니다
- **패들 충돌**: `abs(ball.pos.x - paddle.pos.x) < paddle.size.x/2 + ball.radius` — 공의 x좌표가 패들 범위 안에 있는지 확인합니다
- **벽돌 충돌**: 각 벽돌과의 x/y 거리를 `abs()`로 계산하여 상자형 충돌(AABB)을 판정합니다
- **`brick.visible = False`** — 벽돌을 "보이지 않게" 만들어 제거 효과를 냅니다
- **`ball.color = brick.color`** — 깬 벽돌의 색이 공에 입혀지는 재미있는 시각 효과!

---

## 📝 전체 코드

이 장의 핵심 시뮬레이션 전체 코드입니다. 두 공이 충돌하면 색이 바뀌고 튕기는 프로그램입니다.

```python
from vpython import *

# === WHAT: 여러 공의 충돌 감지 + 튕기기 시뮬레이션 ===
# --- WHY: mag()와 충돌 판정의 원리를 종합적으로 체험하기 ---

scene.background = color.white
scene.width = 700
scene.height = 500

# 경계 벽 만들기
floor = box(pos=vector(0, -4, 0), size=vector(12, 0.2, 0.5),
            color=color.gray(0.7))
ceiling = box(pos=vector(0, 4, 0), size=vector(12, 0.2, 0.5),
              color=color.gray(0.7))
left_wall = box(pos=vector(-6, 0, 0), size=vector(0.2, 8, 0.5),
                color=color.gray(0.7))
right_wall = box(pos=vector(6, 0, 0), size=vector(0.2, 8, 0.5),
                 color=color.gray(0.7))

# 공 3개 생성
ball1 = sphere(pos=vector(-3, 0, 0), radius=0.6,
               color=color.red, make_trail=True, retain=50)
ball1.velocity = vector(3, 2, 0)
ball1.original_color = color.red

ball2 = sphere(pos=vector(3, 1, 0), radius=0.5,
               color=color.blue, make_trail=True, retain=50)
ball2.velocity = vector(-2, -3, 0)
ball2.original_color = color.blue

ball3 = sphere(pos=vector(0, -2, 0), radius=0.4,
               color=color.green, make_trail=True, retain=50)
ball3.velocity = vector(1, 4, 0)
ball3.original_color = color.green

balls = [ball1, ball2, ball3]

# 충돌 횟수 표시
collision_count = 0
info = label(pos=vector(0, 5, 0), text="충돌: 0회",
             color=color.black, height=16, box=False)

dt = 1/60  # 시간 간격
flash_timer = {}  # 충돌 시각 효과 타이머

while True:
    rate(60)

    for b in balls:
        # 공 이동
        b.pos = b.pos + b.velocity * dt

        # 벽 반사
        if b.pos.x + b.radius > 5.9 or b.pos.x - b.radius < -5.9:
            b.velocity.x = -b.velocity.x
        if b.pos.y + b.radius > 3.9 or b.pos.y - b.radius < -3.9:
            b.velocity.y = -b.velocity.y

    # 공끼리 충돌 검사 (모든 쌍을 비교)
    for i in range(len(balls)):
        for j in range(i + 1, len(balls)):
            distance = mag(balls[i].pos - balls[j].pos)
            min_dist = balls[i].radius + balls[j].radius

            if distance < min_dist:
                # 충돌! 속도 교환 (간단한 탄성 충돌)
                temp = balls[i].velocity
                balls[i].velocity = balls[j].velocity
                balls[j].velocity = temp

                # 노란색 플래시
                balls[i].color = color.yellow
                balls[j].color = color.yellow
                flash_timer[i] = 15  # 15프레임 동안 유지
                flash_timer[j] = 15

                collision_count = collision_count + 1
                info.text = "충돌: " + str(collision_count) + "회"

    # 플래시 타이머: 시간이 지나면 원래 색으로 복귀
    for idx in list(flash_timer.keys()):
        flash_timer[idx] = flash_timer[idx] - 1
        if flash_timer[idx] <= 0:
            balls[idx].color = balls[idx].original_color
            del flash_timer[idx]
```

**실행하면 이런 장면이 보입니다**: 빨강, 파랑, 초록 세 개의 공이 상자 안에서 여기저기 튕기며 돌아다닙니다. 두 공이 부딪힐 때마다 노란색으로 반짝이며, 충돌 횟수가 계속 올라갑니다. 각 공의 궤적(trail)이 그려져서 움직임의 패턴도 관찰할 수 있습니다.

---

## 🧠 사고력 챌린지

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하면 어떤 일이 일어날까요? **실행하지 말고** 머릿속으로 시뮬레이션해 보세요!

```python
from vpython import *

ball_a = sphere(pos=vector(-2, 0, 0), radius=1, color=color.red)
ball_b = sphere(pos=vector(2, 0, 0), radius=1, color=color.blue)

ball_a.velocity = vector(1, 0, 0)

while True:
    rate(60)
    ball_a.pos = ball_a.pos + ball_a.velocity * (1/60)

    distance = mag(ball_a.pos - ball_b.pos)
    if distance < ball_a.radius + ball_b.radius:
        ball_a.color = color.yellow
        ball_b.color = color.yellow
        ball_a.velocity = vector(0, 0, 0)
```

**생각해 볼 것**:

- ball_a는 어떤 방향으로 움직이나요?
- ball_b는 움직이나요?
- 두 공 사이의 초기 거리는 얼마인가요? (힌트: `mag(vector(4,0,0))` = 4)
- 반지름의 합은 얼마인가요?
- 충돌은 대략 언제 일어나나요?
- 충돌 후에는 어떤 상태인가요?

<details>
<summary>🔑 정답 확인하기</summary>

**초기 상태**: ball_a는 (-2, 0, 0), ball_b는 (2, 0, 0). 거리 = 4, 반지름 합 = 2.

**진행**: ball_a가 초당 1의 속도로 오른쪽으로 이동합니다. ball_b는 가만히 있습니다.

**충돌 시점**: 거리가 2(반지름 합) 이하가 되려면, ball_a가 2만큼 이동해야 합니다. 초속 1이므로 **약 2초 후** 충돌합니다. 이때 ball_a의 위치는 약 (0, 0, 0)입니다.

**충돌 후**: 두 공 모두 노란색으로 변하고, ball_a의 속도가 0이 되어 **그 자리에 멈춥니다**. 노란 공 두 개가 나란히 붙어 있는 장면이 됩니다.

**핵심 포인트**: `ball_a.velocity = vector(0, 0, 0)`이 실행되면 더 이상 `if` 안으로 들어갈 일이 없습니다. 공은 영원히 노란색 상태로 멈춰 있습니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐⭐)

> **문제**: 다음과 같이 동작하는 프로그램의 충돌 감지 부분 코드를 작성해 보세요.

**동작 설명**:

- 공(ball)이 화면 안에서 움직이고 있습니다
- 화면 중앙에 큰 장애물 구(obstacle)가 있습니다 (반지름 1.5)
- 공이 장애물에 부딪히면 **공의 색이 빨간색으로 변하고**, **공의 속도 방향이 반대로** 바뀝니다
- 부딪히지 않은 동안에는 공의 색이 흰색입니다

**이미 작성된 코드** (빈칸을 채우세요):

```python
from vpython import *

ball = sphere(pos=vector(-4, 1, 0), radius=0.3, color=color.white)
ball.velocity = vector(3, 0, 0)

obstacle = sphere(pos=vector(0, 0, 0), radius=1.5,
                  color=color.gray(0.5), opacity=0.5)

while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity * (1/60)

    # === 여기에 충돌 감지 코드를 작성하세요 ===
    # 힌트 1: 거리를 계산하세요
    # 힌트 2: 충돌 조건을 판정하세요
    # 힌트 3: 충돌이면 색 변경 + 방향 반전
    # 힌트 4: 충돌이 아니면 원래 색으로
```

<details>
<summary>💡 힌트 더 보기</summary>

- 거리: `mag(ball.pos - obstacle.pos)`
- 충돌 조건: `distance < ??? + ???`
- 방향 반전: `ball.velocity = ???`
- 조건에 따라 다른 동작: `if ... else ...`

</details>

<details>
<summary>🔑 정답 확인하기</summary>

```python
from vpython import *

ball = sphere(pos=vector(-4, 1, 0), radius=0.3, color=color.white)
ball.velocity = vector(3, 0, 0)

obstacle = sphere(pos=vector(0, 0, 0), radius=1.5,
                  color=color.gray(0.5), opacity=0.5)

while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity * (1/60)

    # 거리 계산
    distance = mag(ball.pos - obstacle.pos)

    # 충돌 판정
    if distance < ball.radius + obstacle.radius:
        ball.color = color.red
        ball.velocity = -ball.velocity
    else:
        ball.color = color.white
```

**핵심**: `mag()`로 거리를 구하고, `ball.radius + obstacle.radius`와 비교하는 패턴은 항상 동일합니다. 반지름이 다른 두 물체라도 이 패턴 그대로 적용하면 됩니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: 지금까지 배운 충돌 감지를 활용하여 **"먹이를 먹는 물고기"** 시뮬레이션을 만들어 보세요!

**요구사항**:

- 물고기(큰 구): 키보드 화살표로 상하좌우 이동
- 먹이(작은 구): 화면 안 랜덤한 위치에 3개 이상 배치
- 물고기가 먹이에 닿으면(충돌하면) 먹이가 사라짐 (`visible = False`)
- 모든 먹이를 먹으면 "완료!" 메시지 표시
- 자유롭게 색상, 크기, 개수를 정하세요

**힌트**:

- 먹이를 리스트에 담아서 `for food in foods:` 반복으로 충돌 검사
- `food.visible`이 `True`인 것만 검사
- 랜덤 위치는 `import random`으로 `random.uniform(-5, 5)` 사용

<details>
<summary>🔑 예시 답안</summary>

```python
from vpython import *
import random

scene.background = vector(0.1, 0.2, 0.4)  # 바다색
scene.caption = "← → ↑ ↓ 키로 물고기를 움직여 먹이를 모두 먹으세요!"

# 물고기 (플레이어)
fish = sphere(pos=vector(0, 0, 0), radius=0.5, color=color.orange)
fish_speed = 0.2

# 먹이 생성
foods = []
for i in range(8):
    x = random.uniform(-5, 5)
    y = random.uniform(-3, 3)
    food = sphere(pos=vector(x, y, 0), radius=0.15,
                  color=color.yellow, emissive=True)
    foods.append(food)

# 점수
eaten = 0
score_label = label(pos=vector(0, 4, 0),
                    text="남은 먹이: " + str(len(foods)),
                    color=color.white, height=16, box=False)

# 키보드 처리
keys = {"left": False, "right": False, "up": False, "down": False}

def kd(evt):
    if evt.key in keys:
        keys[evt.key] = True
def ku(evt):
    if evt.key in keys:
        keys[evt.key] = False

scene.bind("keydown", kd)
scene.bind("keyup", ku)

while True:
    rate(60)

    # 물고기 이동
    if keys["left"]:
        fish.pos.x = fish.pos.x - fish_speed
    if keys["right"]:
        fish.pos.x = fish.pos.x + fish_speed
    if keys["up"]:
        fish.pos.y = fish.pos.y + fish_speed
    if keys["down"]:
        fish.pos.y = fish.pos.y - fish_speed

    # 먹이 충돌 검사
    for food in foods:
        if food.visible:
            distance = mag(fish.pos - food.pos)
            if distance < fish.radius + food.radius:
                food.visible = False
                eaten = eaten + 1
                score_label.text = "남은 먹이: " + str(len(foods) - eaten)

    # 전부 먹으면 완료
    if eaten == len(foods):
        score_label.text = "완료! 모든 먹이를 먹었습니다!"
        score_label.color = color.yellow
```

이 코드를 기반으로 자유롭게 확장해 보세요. 먹이가 움직이게 하거나, 먹을 때마다 물고기가 커지거나, 피해야 할 적을 추가하는 것도 재미있습니다!

</details>

---

## ⚠️ 자주 하는 실수

**실수 1: `mag()` 대신 벡터를 직접 비교**

```python
# ❌ 벡터는 < 연산자로 비교할 수 없습니다!
if ball1.pos - ball2.pos < 1.0:
    print("충돌")
# TypeError 발생!
```

```python
# ✅ mag()로 크기(숫자)를 구한 후 비교하세요
if mag(ball1.pos - ball2.pos) < 1.0:
    print("충돌")
```

> `ball1.pos - ball2.pos`는 벡터(방향+크기)이고, `mag()`를 씌워야 비로소 숫자(거리)가 됩니다. 숫자끼리만 크기 비교를 할 수 있습니다!

**실수 2: 충돌 조건에서 반지름을 빠뜨림**

```python
# ❌ 중심끼리 겹칠 때만 충돌? 너무 늦습니다!
if mag(ball1.pos - ball2.pos) < 0:
    print("충돌")
```

```python
# ✅ 반지름의 합을 기준으로 판정해야 표면에서 닿을 때 감지됩니다
if mag(ball1.pos - ball2.pos) < ball1.radius + ball2.radius:
    print("충돌")
```

> 두 공의 **표면**이 닿는 순간은, 중심 사이 거리가 **반지름의 합**과 같아지는 순간입니다. 반지름을 포함하지 않으면 충돌을 감지하지 못하거나 너무 늦게 감지합니다.

**실수 3: 충돌 후 공이 내부에 갇힘**

```python
# ❌ 충돌 시 속도만 반전하면 다음 프레임에도 여전히 충돌 중!
if distance < ball1.radius + ball2.radius:
    ball1.velocity = -ball1.velocity
    # → 다음 프레임: 아직도 거리 < 반지름 합 → 또 반전 → 또 반전...
    # → 공이 덜덜 떨면서 갇혀 버립니다!
```

```python
# ✅ 속도 교환이나 위치 보정으로 겹침을 해소하세요
if distance < ball1.radius + ball2.radius:
    # 방법 1: 속도 교환
    temp = ball1.velocity
    ball1.velocity = ball2.velocity
    ball2.velocity = temp

    # 방법 2: 겹침 해소 — 살짝 밀어내기
    overlap = (ball1.radius + ball2.radius) - distance
    direction = (ball1.pos - ball2.pos) / distance
    ball1.pos = ball1.pos + direction * (overlap / 2)
    ball2.pos = ball2.pos - direction * (overlap / 2)
```

> 이것은 충돌 감지에서 가장 흔한 버그입니다. 공이 겹친 상태에서 속도만 뒤집으면 다음 프레임에도 여전히 겹쳐 있어 무한 반전이 일어납니다. 속도 교환이나 위치 보정으로 해결하세요!

**실수 4: `abs()`와 `mag()`를 혼동**

```python
# ❌ abs()는 숫자 하나의 절댓값 — 벡터에는 쓸 수 없습니다
distance = abs(ball1.pos - ball2.pos)  # 오류!
```

```python
# ✅ 벡터의 크기 → mag(), 숫자의 절댓값 → abs()
distance_3d = mag(ball1.pos - ball2.pos)     # 3D 거리 (벡터 → 숫자)
distance_x = abs(ball1.pos.x - ball2.pos.x)  # x축 거리만 (숫자 → 숫자)
```

> **`mag()`**는 벡터를 받아서 숫자(크기)를 반환합니다. **`abs()`**는 숫자를 받아서 절댓값을 반환합니다. 목적이 다르니 상황에 맞게 사용하세요!

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다.

- [ ] **`mag(vector(3, 4, 0))`의 결과를 바로 말할 수 있나요?** → 5.0 (3-4-5 삼각형)
- [ ] **두 물체 사이의 거리를 구하는 코드를 쓸 수 있나요?** → `mag(a.pos - b.pos)`
- [ ] **충돌 조건을 `if`문으로 작성할 수 있나요?** → `if distance < r1 + r2`
- [ ] **`mag()`와 `abs()`의 차이를 설명할 수 있나요?** → `mag()`는 벡터 크기, `abs()`는 숫자 절댓값
- [ ] **충돌 후 "튕기기"를 구현하는 방법을 알고 있나요?** → 속도 반전 또는 속도 교환
- [ ] **벽돌깨기 게임의 충돌 로직 흐름을 설명할 수 있나요?** → 공-벽, 공-패들, 공-벽돌 각각 검사

> 💪 체크가 4개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 공 10개 시뮬레이션

```python
from vpython import *
import random

scene.background = color.white

balls = []
for i in range(10):
    x = random.uniform(-4, 4)
    y = random.uniform(-3, 3)
    vx = random.uniform(-3, 3)
    vy = random.uniform(-3, 3)
    r = random.uniform(0.2, 0.5)
    c = vector(random.random(), random.random(), random.random())

    b = sphere(pos=vector(x, y, 0), radius=r, color=c, make_trail=True, retain=20)
    b.velocity = vector(vx, vy, 0)
    b.original_color = c
    balls.append(b)

while True:
    rate(60)
    for b in balls:
        b.pos = b.pos + b.velocity * (1/60)
        if abs(b.pos.x) > 5:
            b.velocity.x = -b.velocity.x
        if abs(b.pos.y) > 4:
            b.velocity.y = -b.velocity.y

    for i in range(len(balls)):
        for j in range(i+1, len(balls)):
            dist = mag(balls[i].pos - balls[j].pos)
            if dist < balls[i].radius + balls[j].radius:
                temp = balls[i].velocity
                balls[i].velocity = balls[j].velocity
                balls[j].velocity = temp
```

> 🔎 공의 개수를 늘려 보세요. 20개, 50개... 컴퓨터가 매 프레임마다 몇 번의 거리 계산을 하는지 생각해 보세요. (힌트: 공 n개일 때 비교 횟수는 n(n-1)/2 입니다!)

### 도전 2: 벽돌깨기 업그레이드

Step 3의 벽돌깨기에 다음 기능을 추가해 보세요.

- **공 속도 점점 빨라지기**: 벽돌을 깰 때마다 `ball.velocity`의 크기를 5%씩 증가
- **목숨 3개**: 바닥에 떨어져도 바로 게임 오버 대신 목숨이 줄어들기
- **특수 벽돌**: 특정 색 벽돌을 깨면 패들이 길어지거나 공이 커지기

### 도전 3: 간단한 당구 시뮬레이션

```python
from vpython import *

scene.background = vector(0, 0.4, 0.1)  # 당구대 초록색

# 당구대 경계
box(pos=vector(0, -3, 0), size=vector(10, 0.3, 1), color=vector(0.4, 0.2, 0))
box(pos=vector(0, 3, 0), size=vector(10, 0.3, 1), color=vector(0.4, 0.2, 0))
box(pos=vector(-5, 0, 0), size=vector(0.3, 6, 1), color=vector(0.4, 0.2, 0))
box(pos=vector(5, 0, 0), size=vector(0.3, 6, 1), color=vector(0.4, 0.2, 0))

# 큐볼 (흰 공)
cue = sphere(pos=vector(-3, 0, 0), radius=0.3, color=color.white)
cue.velocity = vector(5, 1, 0)

# 타겟 공들
target1 = sphere(pos=vector(1, 0, 0), radius=0.3, color=color.red)
target1.velocity = vector(0, 0, 0)
target2 = sphere(pos=vector(2, 1, 0), radius=0.3, color=color.blue)
target2.velocity = vector(0, 0, 0)

all_balls = [cue, target1, target2]

while True:
    rate(60)
    for b in all_balls:
        b.pos = b.pos + b.velocity * (1/60)
        # 마찰 (서서히 느려짐)
        b.velocity = b.velocity * 0.998
        # 벽 반사
        if abs(b.pos.x) + b.radius > 4.8:
            b.velocity.x = -b.velocity.x
        if abs(b.pos.y) + b.radius > 2.8:
            b.velocity.y = -b.velocity.y

    # 충돌 검사
    for i in range(len(all_balls)):
        for j in range(i+1, len(all_balls)):
            dist = mag(all_balls[i].pos - all_balls[j].pos)
            if dist < all_balls[i].radius + all_balls[j].radius:
                temp = all_balls[i].velocity
                all_balls[i].velocity = all_balls[j].velocity
                all_balls[j].velocity = temp
```

> 🔎 당구에서는 마찰(`velocity * 0.998`)이 중요합니다. 이 값을 바꿔 보면서 공이 얼마나 빨리/느리게 멈추는지 관찰해 보세요!

---

## 🔗 다음 장으로

이번 장에서 우리는 프로그래밍에서 가장 흥미진진한 주제 중 하나인 **충돌 감지**를 정복했습니다.

**배운 것 정리**:

- `mag()` = 벡터의 크기(길이)를 구하는 함수
- `mag(A.pos - B.pos)` = 두 물체 사이의 거리
- `distance < r1 + r2` = 충돌 조건 (구-구)
- `abs()` = 한 축 방향의 거리 계산에 유용
- 충돌 후 반응: 색 변경, 속도 반전, 속도 교환, 물체 제거
- 벽돌깨기의 핵심: 공-벽, 공-패들, 공-벽돌 충돌을 각각 처리

**컴퓨팅 사고력 포인트**: 현실의 "부딪힘"을 **"두 점 사이 거리 < 기준값"**이라는 수학적 조건으로 **추상화**했습니다. 이 단순한 아이디어 하나가 모든 게임과 시뮬레이션의 기초입니다.

우리는 이제 물체를 움직이고, 조건을 판단하고, 충돌까지 처리할 수 있게 되었습니다. 하지만 아직 해결하지 못한 것이 있습니다 — 같은 종류의 물체를 수십, 수백 개 다룰 때 어떻게 효율적으로 관리할까요?

**다음 장 "리스트와 반복 — 수백 개의 별을 다루는 법"** 에서는 리스트(list)를 활용하여 대량의 물체를 우아하게 다루는 방법을 배웁니다. 별이 쏟아지는 밤하늘을 코드로 만들어 볼 거예요! 🌌

> 🌟 **오늘의 한마디**: 여러분은 오늘 게임의 핵심 원리를 직접 구현했습니다. 마리오가 적에게 닿으면 죽는 것도, 당구공이 서로 부딪혀 흩어지는 것도, 전부 오늘 배운 `mag()`와 `if`의 조합입니다. 이제 여러분도 게임을 "만드는 사람"의 시선으로 세상을 볼 수 있습니다!
