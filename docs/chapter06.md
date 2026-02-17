# Chapter 6: 움직여라! — 애니메이션의 원리

**Part 2: 변수와 움직임의 세계**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **rate() 함수와 while True 루프로 애니메이션을 만들** 수 있다
- **위치를 조금씩 변경하여 부드러운 움직임을 구현**할 수 있다
- **속도(velocity) 개념을 코드로 표현**할 수 있다

> 🖥️ **이번 시간에 만들 것**: 빨간 공이 오른쪽으로 부드럽게 날아가고, 파란 공은 좌우로 끝없이 왕복하는 애니메이션을 코드로 만듭니다. 화면 속 물체가 살아 움직이는 순간, 여러분의 코드는 단순한 그림이 아니라 **시뮬레이션**이 됩니다!

---

## 💡 왜 이걸 배우나요?

### 멈춰 있는 세상 vs. 움직이는 세상

지금까지 우리가 만든 VPython 장면을 떠올려 보세요. 빨간 공, 파란 상자, 초록 기둥... 모두 멋졌지만, 한 가지 아쉬운 점이 있었습니다. **아무것도 움직이지 않았다**는 겁니다!

현실 세계를 생각해 보세요. 공은 날아가고, 자동차는 달리고, 행성은 돌고, 새는 날아갑니다. 움직임이 있어야 세상이 살아 있죠.

이번 장에서 배우는 **애니메이션**은 코드에 생명을 불어넣는 기술입니다. 한 줄의 코드를 더하는 것만으로 정지화면이 동영상이 되고, 3D 모형이 시뮬레이션이 됩니다.

### 애니메이션의 비밀: 그림을 빠르게 바꾸기

영화나 애니메이션의 원리를 아시나요? 플립북(넘겨 보는 수첩)을 떠올려 보세요.

한 페이지에 공이 왼쪽에 있고, 다음 페이지에 공이 조금 오른쪽에 있고, 그 다음 페이지에 더 오른쪽에 있습니다. 이 페이지들을 빠르게 넘기면? **공이 움직이는 것처럼 보입니다!**

컴퓨터 애니메이션도 똑같습니다.

- **1단계**: 공을 그린다
- **2단계**: 공의 위치를 아주 조금 옮긴다
- **3단계**: 다시 그린다
- **이것을 1초에 60번 반복한다**

우리 눈은 1초에 약 24번 이상 바뀌는 그림을 "연속된 움직임"으로 인식합니다. VPython에서는 이걸 **단 4줄의 코드**로 구현할 수 있습니다!

---

## 📚 핵심 개념

### 개념 1: while True — "영원히 반복해!"

**🎭 비유로 시작하기**

시계를 떠올려 보세요. 시계의 초침은 멈추지 않습니다. "1초 기다려 → 한 칸 움직여 → 1초 기다려 → 한 칸 움직여..." 이것을 **영원히** 반복합니다.

애니메이션도 같습니다. "위치를 조금 바꿔 → 화면을 다시 그려 → 위치를 조금 바꿔 → 화면을 다시 그려..." 이것을 **계속** 반복해야 합니다.

> 📖 **파이썬 문법: while True**
>
> `while`은 "~하는 동안 반복해"라는 뜻입니다. `True`는 "항상 참"이라는 뜻이죠. 합치면?
>
> **"항상 참인 동안 반복해"** = **"영원히 반복해"**
>
> ```python
> while True:
>     # 이 안의 코드가 끝없이 반복됩니다
>     # 들여쓰기(스페이스 4칸)가 중요합니다!
> ```
>
> **주의**: `while True:` 뒤에 콜론(`:`)을 반드시 붙여야 합니다. 그리고 반복할 코드는 **스페이스 4칸** 들여쓰기를 해야 합니다. 들여쓰기가 파이썬에서 "이 코드는 while에 속합니다"라고 알려주는 방법입니다.

**💻 가장 간단한 예시**

```python
from vpython import *

ball = sphere(color=color.red)

while True:
    rate(60)
    ball.pos.x = ball.pos.x + 0.02
```

이 코드를 실행하면 빨간 공이 오른쪽으로 쭉 날아갑니다! 아직 세부 내용을 모르셔도 됩니다. 하나씩 뜯어봅시다.

---

### 개념 2: rate() — "너무 빨리 하지 마, 천천히!"

**🎭 비유로 시작하기**

여러분이 플립북을 넘긴다고 상상해 보세요. 1초에 1000페이지를 넘기면? 너무 빨라서 그냥 순식간에 지나가 버립니다. 반대로 1초에 1페이지만 넘기면? 뚝뚝 끊겨서 움직임처럼 안 보입니다.

**적당한 속도로 넘겨야 부드러운 애니메이션이 됩니다.** 이 "적당한 속도"를 정해주는 것이 `rate()` 함수입니다.

> 📖 **파이썬 문법: rate()**
>
> `rate(60)`은 **"이 반복을 1초에 최대 60번만 실행해"** 라는 뜻입니다.
>
> ```python
> rate(60)    # 1초에 60번 반복 → 부드러운 애니메이션
> rate(30)    # 1초에 30번 반복 → 조금 덜 부드러움
> rate(10)    # 1초에 10번 반복 → 뚝뚝 끊기는 느낌
> rate(120)   # 1초에 120번 반복 → 매우 부드러움
> ```
>
> **왜 rate()가 필요한가요?** `rate()`가 없으면 컴퓨터는 가능한 한 빠르게 반복합니다. 너무 빨라서 눈으로 볼 수 없고, 컴퓨터에도 부담이 됩니다. `rate(60)`이 가장 널리 쓰이는 값입니다 — 대부분의 게임과 애니메이션이 1초에 60프레임(FPS)을 사용하거든요!

**💻 rate 비교 실험**

직접 느껴보세요! 아래 코드에서 `rate(60)`의 숫자를 바꿔가며 실행해 보세요.

```python
from vpython import *

ball = sphere(color=color.yellow, radius=0.5)

while True:
    rate(10)  # 이 숫자를 10, 30, 60, 120으로 바꿔보세요!
    ball.pos.x = ball.pos.x + 0.05
```

- `rate(10)`: 공이 뚝뚝 끊기면서 이동
- `rate(60)`: 공이 부드럽게 이동
- `rate(120)`: 공이 매우 부드럽게 이동 (60과 차이가 크지 않을 수 있음)

---

### 개념 3: 위치 업데이트 — 매 프레임 조금씩!

**🎭 비유로 시작하기**

개미가 걷는 모습을 상상해 보세요. 개미는 한 번에 100미터를 뛰어가지 않습니다. **한 걸음에 아주 조금씩**, 그것을 수없이 반복해서 멀리 갑니다.

애니메이션의 원리도 같습니다. 공의 x좌표를 매번 0.02씩 더하면, 1초에 60번 반복하니까 1초 동안 `0.02 × 60 = 1.2`만큼 이동합니다. 작은 변화가 쌓여서 큰 움직임이 되는 겁니다!

> 📖 **파이썬 문법: 복합 대입 연산자 `+=`**
>
> "현재 값에 더하기"를 할 때 더 짧게 쓸 수 있습니다.
>
> ```python
> # 이 두 줄은 완전히 같은 뜻입니다!
> ball.pos.x = ball.pos.x + 0.02
> ball.pos.x += 0.02              # 더 짧고 편리!
> ```
>
> `+=`는 **"왼쪽 값에 오른쪽 값을 더해서 다시 왼쪽에 저장해"** 라는 뜻입니다.
>
> 비슷하게 `-=`, `*=`, `/=`도 있습니다.
>
> ```python
> x += 5     # x = x + 5 와 같음
> x -= 3     # x = x - 3 와 같음
> x *= 2     # x = x * 2 와 같음
> x /= 4     # x = x / 4 와 같음
> ```

**💻 벡터로 위치 업데이트하기**

VPython에서 위치(`pos`)는 벡터입니다. 벡터끼리 더할 수 있으므로 이렇게 쓸 수도 있습니다.

```python
from vpython import *

ball = sphere(pos=vector(-5, 0, 0), color=color.green, radius=0.5)
step = vector(0.02, 0, 0)  # 매 프레임 이동할 양

while True:
    rate(60)
    ball.pos = ball.pos + step   # 벡터 덧셈으로 위치 업데이트
```

`step`이 `vector(0.02, 0, 0)`이니까 x방향으로만 조금씩 이동합니다. 만약 `vector(0.02, 0.01, 0)`로 바꾸면? x방향 + y방향으로 동시에 이동하니까 **대각선으로 올라가면서** 이동합니다!

---

### 개념 4: velocity — "속도를 코드로!"

**🎭 비유로 시작하기**

"속도"란 무엇일까요? 물리 시간에 배운 걸 떠올려 보세요. **속도 = 한 번에 얼마나 이동하는가** 입니다. 시속 60km는 1시간에 60km를 간다는 뜻이고, 초속 5m는 1초에 5m를 간다는 뜻이죠.

VPython 애니메이션에서의 속도도 같습니다. **"매 프레임마다 얼마나 이동할 것인가"** — 이것이 바로 속도(velocity)입니다!

> 📖 **파이썬 문법: 커스텀 속성 (Custom Attributes)**
>
> VPython 물체에는 `pos`, `color`, `radius` 같은 기본 속성 외에, **여러분이 직접 만든 속성**도 붙일 수 있습니다!
>
> ```python
> ball = sphere(pos=vector(0,0,0), color=color.red, radius=0.5)
>
> # 내가 만든 속성!
> ball.velocity = vector(0.1, 0, 0)   # 속도
> ball.mass = 1.0                      # 질량
> ball.name = "내 공"                   # 이름
> ```
>
> 파이썬에서는 객체에 `.`(점)을 찍고 아무 이름이나 써서 새로운 속성을 추가할 수 있습니다. VPython이 자동으로 인식하는 속성(`pos`, `color` 등)과 달리, `velocity`나 `mass`는 **우리가 직접 의미를 부여하는 속성**입니다.

**💻 속도를 사용한 애니메이션 패턴**

이것이 VPython 애니메이션의 **가장 기본적이고 중요한 패턴**입니다.

```python
from vpython import *

ball = sphere(pos=vector(-5, 0, 0), color=color.red, radius=0.5)
ball.velocity = vector(0.1, 0, 0)  # 오른쪽으로 프레임당 0.1씩

while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity
```

이 패턴을 글로 풀어쓰면 이렇습니다.

- **1번째 프레임**: 공 위치 (-5, 0, 0) + 속도 (0.1, 0, 0) = 새 위치 (-4.9, 0, 0)
- **2번째 프레임**: 공 위치 (-4.9, 0, 0) + 속도 (0.1, 0, 0) = 새 위치 (-4.8, 0, 0)
- **3번째 프레임**: 공 위치 (-4.8, 0, 0) + 속도 (0.1, 0, 0) = 새 위치 (-4.7, 0, 0)
- ...50번째 프레임이면? 공은 (0, 0, 0) 위치에 도달!

**위치 = 위치 + 속도** — 이 한 줄이 모든 애니메이션의 핵심입니다. 기억하세요!

---

## 🔨 따라하기

이제 직접 손으로 만들어 봅시다. 세 단계를 거쳐 점점 더 멋진 애니메이션을 만들겠습니다!

### Step 1: 첫 애니메이션 — 공을 날려보자

가장 기본적인 애니메이션부터 시작합니다. 빨간 공이 왼쪽에서 오른쪽으로 날아갑니다.

```python
from vpython import *

# 장면 설정
scene.background = color.white

# 바닥 만들기 (움직이지 않는 배경)
box(pos=vector(0, -1, 0), size=vector(20, 0.1, 4), color=color.gray(0.8))

# 움직일 공 만들기
ball = sphere(pos=vector(-8, 0, 0), color=color.red, radius=0.5)
ball.velocity = vector(0.1, 0, 0)  # 오른쪽으로!

# 애니메이션 루프
while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity
```

**코드를 입력하고 실행해 보세요!** 빨간 공이 회색 바닥 위를 오른쪽으로 미끄러져 가는 모습이 보일 겁니다.

한 줄씩 살펴봅시다.

- `scene.background = color.white` — 배경색을 흰색으로 설정합니다
- `box(...)` — 바닥 역할을 하는 넓고 얇은 상자입니다 (변수에 저장하지 않아도 됩니다 — 움직일 필요가 없으니까요!)
- `ball = sphere(...)` — 공을 만들어 `ball` 변수에 저장합니다. 나중에 위치를 바꿔야 하니까 변수에 담아두는 겁니다!
- `ball.velocity = vector(0.1, 0, 0)` — 공에 "속도" 속성을 붙입니다. x방향으로 프레임마다 0.1씩
- `while True:` — 무한 반복 시작!
- `rate(60)` — 1초에 60번만 반복
- `ball.pos = ball.pos + ball.velocity` — 매 프레임 위치 업데이트!

> 💡 **실험해 보세요**: `ball.velocity`를 `vector(0.05, 0, 0)`으로 바꾸면 더 느리게, `vector(0.2, 0, 0)`으로 바꾸면 더 빠르게 이동합니다. `vector(0.1, 0.05, 0)`으로 바꾸면 대각선 위로 날아갑니다!

---

### Step 2: 궤적 남기기 — 공이 지나간 길

공이 어디를 지나갔는지 보이면 더 재미있겠죠? VPython의 `make_trail` 속성을 사용합니다.

```python
from vpython import *

scene.background = color.white
box(pos=vector(0, -1.5, 0), size=vector(20, 0.1, 4), color=color.gray(0.8))

# make_trail=True로 궤적을 남김!
ball = sphere(pos=vector(-8, 0, 0), color=color.red, radius=0.3,
              make_trail=True, trail_color=color.orange)

# 포물선 움직임: 오른쪽 + 위쪽으로 동시에!
ball.velocity = vector(0.1, 0.08, 0)

while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity
    # 중력 효과: 매 프레임 y속도를 조금씩 줄인다
    ball.velocity.y = ball.velocity.y - 0.002
```

**실행하면** 공이 주황색 궤적을 남기며 포물선을 그리는 모습이 보입니다! 마치 공을 던진 것처럼요.

새로 등장한 것들을 정리합니다.

- `make_trail=True` — 물체가 지나간 경로를 선으로 표시합니다
- `trail_color=color.orange` — 궤적의 색상을 지정합니다
- `ball.velocity.y -= 0.002` — 매 프레임마다 y방향 속도를 0.002씩 줄입니다. 이것이 바로 **중력 효과**입니다! 위로 올라가는 속도가 점점 줄어들다가, 0이 되면 멈추고, 그 후에는 음수가 되어 아래로 떨어집니다

> 🧠 **생각해 보기**: 실제 물리에서 중력은 속도를 일정하게 줄입니다 (가속도 = 일정). 이 코드에서 `ball.velocity.y -= 0.002`가 바로 그 역할을 합니다. 속도가 아니라 **속도의 변화**(가속도)를 코드로 표현한 것이죠!

---

### Step 3: 좌우 왕복 운동 — 벽에 부딪히면 돌아와!

공이 화면 밖으로 사라지면 아쉽죠? 경계에 닿으면 방향을 바꿔서 왕복하도록 만들어 봅시다.

```python
from vpython import *

scene.background = color.white

# 왼쪽 벽과 오른쪽 벽
wall_left = box(pos=vector(-8, 0, 0), size=vector(0.2, 4, 4), color=color.blue)
wall_right = box(pos=vector(8, 0, 0), size=vector(0.2, 4, 4), color=color.blue)

# 바닥
box(pos=vector(0, -2, 0), size=vector(16, 0.1, 4), color=color.gray(0.8))

# 공
ball = sphere(pos=vector(0, 0, 0), color=color.red, radius=0.5,
              make_trail=True, retain=50)
ball.velocity = vector(0.15, 0, 0)

# 애니메이션 루프
while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity

    # 오른쪽 벽에 닿으면 방향 반전!
    if ball.pos.x >= 7.5:
        ball.velocity.x = -ball.velocity.x

    # 왼쪽 벽에 닿으면 방향 반전!
    if ball.pos.x <= -7.5:
        ball.velocity.x = -ball.velocity.x
```

**실행하면** 공이 좌우로 끝없이 왕복합니다! 벽에 닿을 때마다 방향이 바뀝니다.

핵심 로직을 살펴봅시다.

- `if ball.pos.x >= 7.5:` — 공이 오른쪽 벽 근처에 도달하면
- `ball.velocity.x = -ball.velocity.x` — x방향 속도의 부호를 바꿉니다! 양수(오른쪽)가 음수(왼쪽)로, 음수가 양수로 바뀝니다
- `retain=50` — 궤적을 최근 50개 점만 표시합니다 (너무 길어지지 않도록)

> 💡 **핵심 아이디어**: 속도에 `-1`을 곱하면 방향이 반대가 됩니다. `0.15`는 `-0.15`가 되고, `-0.15`는 다시 `0.15`가 됩니다. 이것이 "튕기기"의 수학적 원리입니다!

> ⚠️ **벽 근처 좌표를 7.5로 잡은 이유**: 벽의 위치는 x=8이고 공의 반지름이 0.5이므로, 공의 중심이 7.5에 도달하면 공의 표면이 벽에 닿는 셈입니다. `8 - 0.5 = 7.5`!

---

## 📝 전체 코드

이 장의 최종 작품: **포물선 공 던지기 + 좌우 왕복을 결합한 종합 애니메이션**입니다.

```python
from vpython import *

# === WHAT: 두 개의 공이 서로 다른 방식으로 움직이는 애니메이션 ===
# --- WHY: 속도(velocity)와 가속도를 코드로 체험하기 위해 ---

scene.background = color.white
scene.caption = "🔴 빨간 공: 포물선 운동  |  🔵 파란 공: 좌우 왕복 운동"

# 바닥
box(pos=vector(0, -3, 0), size=vector(20, 0.1, 6), color=color.gray(0.8))

# 왼쪽 벽과 오른쪽 벽
box(pos=vector(-9, 0, 0), size=vector(0.2, 8, 6), color=color.cyan, opacity=0.3)
box(pos=vector(9, 0, 0), size=vector(0.2, 8, 6), color=color.cyan, opacity=0.3)

# --- 빨간 공: 포물선 운동 ---
red_ball = sphere(pos=vector(-7, -2.5, 0), color=color.red, radius=0.4,
                  make_trail=True, trail_color=color.orange, retain=200)
red_ball.velocity = vector(0.12, 0.18, 0)  # 오른쪽 위로 발사!
gravity = vector(0, -0.003, 0)              # 중력 가속도

# --- 파란 공: 좌우 왕복 운동 ---
blue_ball = sphere(pos=vector(0, -2.5, 1), color=color.blue, radius=0.4,
                   make_trail=True, trail_color=color.white, retain=50)
blue_ball.velocity = vector(0.1, 0, 0)

# 애니메이션 루프
while True:
    rate(60)

    # 빨간 공: 위치 업데이트 + 중력 적용
    red_ball.pos = red_ball.pos + red_ball.velocity
    red_ball.velocity = red_ball.velocity + gravity

    # 빨간 공: 바닥에 닿으면 튕기기
    if red_ball.pos.y <= -2.5:
        red_ball.velocity.y = -red_ball.velocity.y * 0.9  # 튕길 때마다 에너지 손실

    # 빨간 공: 좌우 벽에 닿으면 튕기기
    if red_ball.pos.x >= 8.5 or red_ball.pos.x <= -8.5:
        red_ball.velocity.x = -red_ball.velocity.x

    # 파란 공: 위치 업데이트
    blue_ball.pos = blue_ball.pos + blue_ball.velocity

    # 파란 공: 좌우 벽에 닿으면 방향 반전
    if blue_ball.pos.x >= 8.5:
        blue_ball.velocity.x = -blue_ball.velocity.x
    if blue_ball.pos.x <= -8.5:
        blue_ball.velocity.x = -blue_ball.velocity.x
```

**실행하면 이런 장면이 펼쳐집니다**: 빨간 공은 포물선을 그리며 날아가다 바닥에서 튕기고(점점 낮아짐), 파란 공은 꾸준히 좌우로 왕복합니다. 두 공의 움직임이 완전히 다른 것은 **속도를 다르게 설정하고, 빨간 공에만 중력을 적용했기 때문**입니다.

`0.9`를 곱하는 부분(`* 0.9`)은 "튕길 때마다 에너지를 10% 잃는다"는 뜻입니다. 실제로 공을 바닥에 튕기면 점점 낮아지죠? 그 현상을 코드 한 줄로 표현한 것입니다!

---

## 🧠 사고력 챌린지

지금부터가 진짜입니다. 머리를 움직여 봅시다!

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 **실행하지 말고** 머릿속으로 결과를 그려 보세요.

```python
from vpython import *

ball = sphere(pos=vector(0, 0, 0), color=color.green, radius=0.5,
              make_trail=True)
ball.velocity = vector(0, 0.1, 0)

while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity
    ball.velocity.x += 0.002
```

**생각해 볼 것**:

- 처음 속도는 어느 방향인가요? (x? y? z?)
- `ball.velocity.x += 0.002`는 매 프레임 무엇을 바꾸나요?
- 처음에는 y방향으로만 가지만, 시간이 지나면 x방향 속도가 점점 커집니다. 궤적은 어떤 모양일까요?
- 직선? 곡선? 어떤 방향으로 휘나요?

<details>
<summary>🔑 정답 확인하기</summary>

공은 **처음에 위쪽으로 직진**하다가 **점점 오른쪽으로 휘어집니다**.

처음 속도는 `vector(0, 0.1, 0)` — y방향(위쪽)으로만 이동합니다.

하지만 매 프레임 `ball.velocity.x += 0.002`가 실행되어 x방향 속도가 0에서 시작해 점점 커집니다.

- 0프레임: velocity = (0, 0.1, 0) → 위로만
- 50프레임: velocity = (0.1, 0.1, 0) → 위 + 오른쪽
- 100프레임: velocity = (0.2, 0.1, 0) → 오른쪽이 더 빨라짐!

궤적은 **포물선 모양**으로, 위로 가다가 오른쪽으로 점점 휘어집니다. 마치 바람에 밀리는 것처럼요!

핵심 포인트: **속도가 일정하면 직선**, **속도가 변하면 곡선** 궤적이 됩니다. 이것이 가속도의 효과입니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 다음과 같은 애니메이션을 만드는 코드를 작성해 보세요.

**장면 설명**:

- 노란색 공이 화면 **왼쪽**(x=-6)에서 시작합니다
- 공은 **오른쪽으로** 이동합니다
- 동시에 **위아래로 출렁이며** 이동합니다 (사인파처럼 물결 운동)
- 궤적을 남기면 **파도 모양**이 됩니다

**힌트**:

- x 위치는 매 프레임 일정하게 증가합니다
- y 위치를 직접 계산합니다: `sin()` 함수를 사용하면 -1에서 1 사이를 왔다 갔다 합니다
- `t`라는 변수를 만들어 매 프레임 조금씩 증가시키고, `sin(t)`를 y위치에 넣으면 됩니다
- VPython에서 `sin()`은 바로 사용할 수 있습니다 (`from vpython import *`에 포함)

<details>
<summary>💡 힌트 더 보기</summary>

기본 구조를 참고하세요.

```python
from vpython import *

ball = sphere(pos=vector(-6, 0, 0), ...)
t = 0

while True:
    rate(60)
    t += 0.1           # 시간 증가
    ball.pos.x += 0.05  # 오른쪽으로 이동
    ball.pos.y = sin(t)  # y좌표를 sin(t)로!
```

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

scene.background = color.white

ball = sphere(pos=vector(-6, 0, 0), color=color.yellow, radius=0.3,
              make_trail=True, trail_color=color.orange)

t = 0  # 시간을 나타내는 변수

while True:
    rate(60)
    t += 0.1                # 매 프레임 시간 증가
    ball.pos.x += 0.05      # 오른쪽으로 꾸준히 이동
    ball.pos.y = sin(t) * 2  # sin 함수로 위아래 출렁임 (* 2는 진폭)
```

핵심 포인트: **x는 일정하게 증가, y는 sin 함수로 진동** — 이 조합이 파도 모양 궤적을 만듭니다. `sin(t) * 2`에서 `2`를 키우면 진폭(출렁임의 높이)이 커지고, `t += 0.1`에서 `0.1`을 키우면 진동이 빨라집니다.

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: 아래 조건을 만족하는 **나만의 애니메이션**을 만들어 보세요!

**조건**:

- 물체가 **2개 이상** 동시에 움직여야 합니다
- 각 물체의 **속도가 서로 달라야** 합니다
- **벽이나 바닥에서 튕기는 기능**이 하나 이상 있어야 합니다
- `while True`, `rate()`, `velocity`를 모두 사용해야 합니다

**아이디어가 안 떠오른다면**:

- 🏓 **탁구 공 두 개**: 서로 다른 방향과 속도로 벽에서 튕기는 공 두 개
- 🌍 **행성과 위성**: 큰 공(행성) 주위를 작은 공(위성)이 도는 애니메이션
- 🎾 **경주**: 여러 공이 왼쪽에서 출발해 오른쪽 벽까지 달려가는 경주 (속도가 다르면 결과가 달라짐!)
- 🌊 **파도**: 여러 공이 나란히 있으면서 시간차를 두고 위아래로 출렁이는 애니메이션

<details>
<summary>🔑 예시 답안: 속도가 다른 세 공의 경주</summary>

```python
from vpython import *

scene.background = color.white
scene.caption = "🏁 공 경주! 누가 먼저 벽에 닿을까?"

# 바닥과 결승선
box(pos=vector(0, -2, 0), size=vector(18, 0.1, 4), color=color.gray(0.8))
box(pos=vector(8, 0, 0), size=vector(0.1, 4, 4), color=color.red, opacity=0.5)

# 세 개의 공 — 속도가 모두 다릅니다!
ball_r = sphere(pos=vector(-7, 1, 0), color=color.red, radius=0.4,
                make_trail=True, retain=100)
ball_r.velocity = vector(0.08, 0, 0)

ball_g = sphere(pos=vector(-7, 0, 0), color=color.green, radius=0.4,
                make_trail=True, retain=100)
ball_g.velocity = vector(0.12, 0, 0)

ball_b = sphere(pos=vector(-7, -1, 0), color=color.blue, radius=0.4,
                make_trail=True, retain=100)
ball_b.velocity = vector(0.05, 0, 0)

while True:
    rate(60)

    # 각 공 위치 업데이트
    ball_r.pos = ball_r.pos + ball_r.velocity
    ball_g.pos = ball_g.pos + ball_g.velocity
    ball_b.pos = ball_b.pos + ball_b.velocity

    # 결승선(벽)에 닿으면 튕기기
    if ball_r.pos.x >= 7.5:
        ball_r.velocity.x = -ball_r.velocity.x
    if ball_r.pos.x <= -7.5:
        ball_r.velocity.x = -ball_r.velocity.x

    if ball_g.pos.x >= 7.5:
        ball_g.velocity.x = -ball_g.velocity.x
    if ball_g.pos.x <= -7.5:
        ball_g.velocity.x = -ball_g.velocity.x

    if ball_b.pos.x >= 7.5:
        ball_b.velocity.x = -ball_b.velocity.x
    if ball_b.pos.x <= -7.5:
        ball_b.velocity.x = -ball_b.velocity.x
```

초록 공이 가장 빠르고(0.12), 파란 공이 가장 느립니다(0.05). 하지만 오래 보면 모두 좌우로 왕복합니다. 속도를 바꾸거나 공을 더 추가해서 여러분만의 경주를 만들어 보세요!

</details>

---

## ⚠️ 자주 하는 실수

애니메이션 코드를 처음 짤 때 누구나 겪는 실수들입니다. 미리 알아두면 시간을 절약할 수 있어요!

**실수 1: rate()를 빠뜨림**

```python
# ❌ rate() 없이 while True를 돌리면?
while True:
    ball.pos.x += 0.01
# 컴퓨터가 미친 듯이 빠르게 돌아서 화면이 멈추거나, 공이 순식간에 사라집니다!
```

```python
# ✅ 반드시 rate()를 넣으세요!
while True:
    rate(60)
    ball.pos.x += 0.01
```

> `rate()`는 프레임 속도 조절뿐만 아니라, 화면을 다시 그리는 타이밍도 잡아줍니다. **while True 안에는 반드시 rate()가 있어야 합니다!**

**실수 2: while True 안의 코드를 들여쓰기하지 않음**

```python
# ❌ 들여쓰기가 없으면 오류!
while True:
rate(60)
ball.pos.x += 0.01
# IndentationError: expected an indented block
```

```python
# ✅ 스페이스 4칸 들여쓰기!
while True:
    rate(60)
    ball.pos.x += 0.01
```

> 파이썬에서 들여쓰기는 단순한 스타일이 아니라 **문법의 일부**입니다. `while True:` 뒤의 코드는 반드시 들여쓰기해야 합니다.

**실수 3: 물체를 변수에 저장하지 않음**

```python
# ❌ 변수에 저장하지 않으면 나중에 움직일 수 없다!
sphere(pos=vector(0,0,0), color=color.red)

while True:
    rate(60)
    # 이 공의 pos를 어떻게 바꾸지...? 이름이 없는데!
```

```python
# ✅ 움직일 물체는 반드시 변수에 저장!
ball = sphere(pos=vector(0,0,0), color=color.red)

while True:
    rate(60)
    ball.pos.x += 0.01  # ball이라는 이름으로 접근 가능!
```

> **움직일 물체는 반드시 변수에 저장**하세요! 배경이나 바닥처럼 가만히 있는 물체는 변수에 저장하지 않아도 됩니다.

**실수 4: velocity를 while 안에서 매번 새로 만듦**

```python
# ❌ 매 프레임 velocity를 리셋하면 가속도가 무시됩니다!
while True:
    rate(60)
    ball.velocity = vector(0.1, 0.1, 0)  # 매번 새로 만듦
    ball.pos = ball.pos + ball.velocity
```

```python
# ✅ velocity는 while 전에 한 번만 설정! 필요하면 안에서 수정
ball.velocity = vector(0.1, 0.1, 0)  # while 바깥에서!

while True:
    rate(60)
    ball.velocity.y -= 0.002  # 속도를 '수정'하는 것은 OK
    ball.pos = ball.pos + ball.velocity
```

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다!

- [ ] **`while True:`가 무엇을 하는지 설명할 수 있나요?** → 안에 있는 코드를 영원히 반복 실행합니다
- [ ] **`rate(60)`이 왜 필요한지 설명할 수 있나요?** → 1초에 60번만 반복하도록 속도를 제한하여 부드러운 애니메이션을 만듭니다
- [ ] **`ball.pos = ball.pos + ball.velocity`가 무슨 뜻인지 설명할 수 있나요?** → 매 프레임 현재 위치에 속도를 더해서 물체를 이동시킵니다
- [ ] **`+=`의 의미를 알고 있나요?** → `x += 5`는 `x = x + 5`와 같은 뜻입니다
- [ ] **벽에서 튕기는 원리를 설명할 수 있나요?** → 속도에 -1을 곱해서 방향을 반전시킵니다
- [ ] **velocity(속도)를 물체에 추가하는 방법을 알고 있나요?** → `ball.velocity = vector(...)` 로 커스텀 속성을 만듭니다

> 💪 체크가 5개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 2D 벽 튕기기 (x방향 + y방향 동시)

공이 x방향과 y방향 모두 튕기도록 만들어 보세요. 마치 DVD 화면보호기처럼요!

```python
from vpython import *

scene.background = color.black

ball = sphere(pos=vector(0, 0, 0), color=color.yellow, radius=0.3,
              make_trail=True, retain=200, trail_color=color.cyan)
ball.velocity = vector(0.12, 0.08, 0)

while True:
    rate(60)
    ball.pos = ball.pos + ball.velocity

    # x방향 튕기기
    if ball.pos.x >= 6 or ball.pos.x <= -6:
        ball.velocity.x = -ball.velocity.x

    # y방향 튕기기
    if ball.pos.y >= 4 or ball.pos.y <= -4:
        ball.velocity.y = -ball.velocity.y
```

> 🔎 `trail_color`와 `retain` 값을 바꿔보면서 다양한 궤적 효과를 실험해 보세요!

### 도전 2: 중력을 적용한 통통 튀는 공

현실처럼 공이 바닥에서 통통 튀면서 점점 낮아지는 시뮬레이션을 만들어 보세요.

```python
from vpython import *

scene.background = color.white
box(pos=vector(0, -5, 0), size=vector(12, 0.2, 4), color=color.green)

ball = sphere(pos=vector(0, 4, 0), color=color.red, radius=0.4,
              make_trail=True, trail_color=color.orange, retain=500)
ball.velocity = vector(0.05, 0, 0)
gravity = vector(0, -0.005, 0)

while True:
    rate(60)
    ball.velocity = ball.velocity + gravity   # 중력으로 속도 변화
    ball.pos = ball.pos + ball.velocity       # 속도로 위치 변화

    # 바닥에 닿으면 튕기기 (에너지 손실 포함)
    if ball.pos.y <= -4.5:
        ball.velocity.y = -ball.velocity.y * 0.85
        ball.pos.y = -4.5  # 바닥 아래로 빠지지 않도록
```

> 🔎 `0.85`를 `1.0`으로 바꾸면 영원히 같은 높이로 튀고, `0.5`로 바꾸면 금방 멈춥니다. 이 숫자가 바로 **반발 계수**입니다!

### 도전 3: 여러 공이 동시에 움직이는 불꽃놀이

```python
from vpython import *

scene.background = color.black

# 여러 개의 공을 리스트로 만들기 (리스트는 12장에서 자세히 배웁니다!)
balls = []
colors_list = [color.red, color.orange, color.yellow, color.green, color.cyan]

for i in range(5):
    b = sphere(pos=vector(0, -3, 0), radius=0.2,
               color=colors_list[i], make_trail=True, retain=30)
    b.velocity = vector(0.05 * (i - 2), 0.15 + 0.02 * i, 0)
    balls.append(b)

gravity = vector(0, -0.003, 0)

while True:
    rate(60)
    for b in balls:
        b.velocity = b.velocity + gravity
        b.pos = b.pos + b.velocity
```

> 🔎 이 코드는 리스트(`[]`)와 for문을 사용합니다. 아직 배우지 않은 내용이지만, 실행해보고 "여러 물체를 한꺼번에 다루면 이런 것도 가능하구나!"를 느껴 보세요. 10장과 12장에서 자세히 배우게 됩니다!

---

## 🔗 다음 장으로

이번 장에서 우리는 VPython 세계에 **생명을 불어넣었습니다**!

**배운 것 정리**:

- `while True:` — 코드를 영원히 반복하는 무한 루프
- `rate(60)` — 1초에 60번만 실행하여 부드러운 애니메이션
- `ball.pos = ball.pos + ball.velocity` — 매 프레임 위치를 속도만큼 업데이트
- `ball.velocity = vector(...)` — 물체에 속도 속성을 직접 추가
- `+=` — 현재 값에 더하는 복합 대입 연산자
- 속도 반전 (`-velocity`) — 벽에서 튕기는 효과

하지만 아직 한 가지 아쉬운 점이 남았습니다. 공이 벽에 닿으면 튕기도록 했지만, 이것은 **"만약 ~라면"** 이라는 조건 판단이었습니다. 지금은 간단한 `if`만 사용했는데, 조건이 더 복잡해지면 어떻게 할까요? "벽에 닿으면 튕기고, 바닥에 닿으면 색이 바뀌고, 천장에 닿으면 사라진다"처럼 여러 조건을 다루려면?

**다음 장 "if문 — 조건에 따라 달라지는 세상"** 에서는 `if`, `elif`, `else`를 배워서 프로그램이 스스로 판단하고 다르게 행동하도록 만듭니다. 벽에 닿으면 색이 변하는 공, 영역에 따라 속도가 달라지는 시뮬레이션 등 훨씬 더 풍부한 세계를 만들 수 있게 됩니다! 🌈

> 🌟 **오늘의 한마디**: 여러분은 오늘 정지 화면을 동영상으로 바꾸는 마법을 배웠습니다. `while True` + `rate()` + `위치 업데이트` — 이 세 가지 조합이 모든 게임, 모든 시뮬레이션, 모든 애니메이션의 출발점입니다. 여러분은 이제 **움직이는 세상을 코드로 만드는 사람**입니다!
