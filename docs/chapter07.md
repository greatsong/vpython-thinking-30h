# Chapter 7: if문 — 조건에 따라 달라지는 세상

**Part 3: 조건과 선택의 힘**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **if, elif, else 문**으로 조건에 따른 분기를 구현할 수 있다
- **비교 연산자**(==, !=, <, >, <=, >=)를 활용할 수 있다
- 물체의 상태에 따라 **색상이나 방향을 바꾸는** 프로그램을 만들 수 있다

> 🖥️ **이번 시간에 만들 것**: 벽에 부딪히면 튕기는 공, 위치에 따라 색이 변하는 구, 그리고 온도에 따라 색이 변하는 3D 온도계 시뮬레이션을 만듭니다. 코드가 "판단"하는 순간을 눈으로 확인하게 됩니다!

---

## 💡 왜 이걸 배우나요?

### 프로그램이 "생각"하기 시작하는 순간

지금까지 우리가 만든 프로그램은 **무조건 같은 일만** 했습니다. 공은 한 방향으로만 움직이고, 색은 절대 변하지 않았죠. 마치 "앞으로만 가!" 라는 명령만 받은 로봇처럼요.

하지만 현실 세계는 그렇지 않습니다.

> "비가 오면 우산을 쓴다. 안 오면 그냥 나간다."
> "신호가 빨간불이면 멈춘다. 초록불이면 건넌다."
> "시험 점수가 90점 이상이면 A, 80점 이상이면 B, 나머지는 C."

우리는 매 순간 **조건을 판단하고 다른 행동을 선택**합니다. 프로그램도 이렇게 할 수 있다면 어떨까요?

**`if`문은 프로그램에게 "판단력"을 주는 마법의 도구입니다.** `if`를 배우는 순간, 여러분의 프로그램은 단순한 반복 기계에서 "상황에 맞게 반응하는 지능적인 시스템"으로 변신합니다.

### 🧠 이번 장의 사고 훈련

- 🔍 **코드 → 결과 예측**: 조건문이 있는 코드를 읽고, 어떤 분기가 실행될지 머릿속으로 따라가기
- 🔄 **결과 → 코드 역추적**: 공이 튕기는 장면을 보고, 어떤 조건문이 필요한지 역추적하기
- 💡 **상상 → 코드 창작**: 나만의 조건 로직을 설계하고 3D로 구현하기

---

## 📚 핵심 개념

### 개념 1: if문 — "만약 ~이면 ~해라"

**🎭 비유로 시작하기**

여러분이 아침에 일어났을 때를 생각해 보세요.

> "만약 비가 오면 → 우산을 챙긴다"

이것이 바로 `if`문의 핵심입니다. **조건을 확인하고, 참(True)이면 실행**합니다.

**📖 정확한 정의**

`if`문은 주어진 조건이 **참(True)**일 때만 특정 코드 블록을 실행하는 제어 구조입니다. 조건이 **거짓(False)**이면 해당 블록을 건너뜁니다.

**💻 예시로 확인하기**

```python
from vpython import *

ball = sphere(pos=vector(0, 0, 0), radius=0.5, color=color.white)

# 공의 x좌표가 양수인지 확인
if ball.pos.x >= 0:
    ball.color = color.green   # 오른쪽에 있으면 초록색

print("프로그램 끝!")
```

이 코드에서 공의 x좌표는 0이므로 `ball.pos.x >= 0`은 **참(True)**입니다. 따라서 공이 초록색으로 바뀝니다.

> 📌 **핵심 포인트**: `if` 다음에 오는 조건이 참이면 들여쓴 코드가 실행되고, 거짓이면 건너뜁니다.

---

> 📖 **파이썬 문법: if / elif / else**
>
> **기본 if문**
>
> ```python
> if 조건:
>     실행할_코드   # 반드시 들여쓰기(4칸 스페이스)!
> ```
>
> **if-else문** — "~이면 A, 아니면 B"
>
> ```python
> if 조건:
>     조건이_참일_때_실행
> else:
>     조건이_거짓일_때_실행
> ```
>
> **if-elif-else문** — "~이면 A, ~이면 B, 아니면 C"
>
> ```python
> if 조건1:
>     조건1이_참일_때_실행
> elif 조건2:
>     조건1은_거짓이고_조건2가_참일_때_실행
> elif 조건3:
>     조건1,2_모두_거짓이고_조건3이_참일_때_실행
> else:
>     모든_조건이_거짓일_때_실행
> ```
>
> **규칙 정리**
>
> - `if`는 반드시 **하나** 있어야 합니다
> - `elif`는 **0개 이상** 여러 개 쓸 수 있습니다
> - `else`는 **0개 또는 1개**만 쓸 수 있습니다
> - 조건 뒤에 반드시 **콜론(`:`)** 을 붙여야 합니다
> - 실행할 코드는 반드시 **들여쓰기** 해야 합니다 (보통 스페이스 4칸)
> - 위에서 아래로 조건을 검사하다가 **처음으로 참인 조건 하나만** 실행합니다

---

### 개념 2: 비교 연산자 — "두 값을 비교하라"

**🎭 비유로 시작하기**

"키가 120cm 이상이면 놀이기구를 탈 수 있습니다." 놀이공원에서 본 적 있죠? 이때 "이상"이라는 말이 바로 **비교**입니다. 파이썬에서도 두 값을 비교하는 기호가 있습니다.

**📖 정확한 정의**

비교 연산자는 두 값의 관계를 판단하여 **True(참)** 또는 **False(거짓)**을 돌려주는 연산자입니다.

> 📖 **파이썬 문법: 비교 연산자**
>
> - `==` : 같다 ("5 == 5 → True, 5 == 3 → False")
> - `!=` : 같지 않다 ("5 != 3 → True, 5 != 5 → False")
> - `<` : 작다 ("3 < 5 → True")
> - `>` : 크다 ("5 > 3 → True")
> - `<=` : 작거나 같다 ("3 <= 3 → True, 3 <= 5 → True")
> - `>=` : 크거나 같다 ("5 >= 5 → True, 5 >= 3 → True")
>
> 비교 결과는 항상 **True** 또는 **False** 입니다. 이 두 값을 **불리언(boolean)** 타입이라고 부릅니다.

**💻 예시로 확인하기**

```python
from vpython import *

score = 85

if score >= 90:
    print("A 등급입니다!")
elif score >= 80:
    print("B 등급입니다!")
elif score >= 70:
    print("C 등급입니다!")
else:
    print("더 노력하세요!")

# 결과: "B 등급입니다!" (85는 90보다 작지만 80 이상이므로)
```

> ⚡ **중요**: `score >= 90`이 거짓이므로 넘어가고, `score >= 80`이 참이므로 "B 등급입니다!"가 출력됩니다. **한 번 참인 조건을 만나면 나머지는 검사하지 않습니다.**

---

### 개념 3: 불리언과 논리 연산자 — "여러 조건을 조합하라"

**🎭 비유로 시작하기**

"비가 오고 **그리고** 우산이 없으면 → 편의점에서 우산을 산다." 여기서 "그리고"는 두 조건이 **모두 참**이어야 합니다. "주말이**거나** 공휴일이면 → 학교에 안 간다." 여기서 "거나"는 **하나만 참**이어도 됩니다.

**📖 정확한 정의**

논리 연산자는 여러 조건을 하나로 결합하는 연산자입니다.

> 📖 **파이썬 문법: 불리언과 논리 연산자 (and / or / not)**
>
> **불리언(boolean) 타입**
>
> - `True` — 참 (조건이 맞을 때)
> - `False` — 거짓 (조건이 틀릴 때)
> - 비교 연산자의 결과는 항상 불리언입니다
>
> **논리 연산자**
>
> - `and` : 두 조건이 **모두 참**이면 True
>   - `True and True → True`
>   - `True and False → False`
>   - `False and True → False`
>   - `False and False → False`
>
> - `or` : 두 조건 중 **하나라도 참**이면 True
>   - `True or False → True`
>   - `False or True → True`
>   - `True or True → True`
>   - `False or False → False`
>
> - `not` : 조건을 **뒤집는다** (참→거짓, 거짓→참)
>   - `not True → False`
>   - `not False → True`
>
> **사용 예시**
>
> ```python
> x = 5
> if x > 0 and x < 10:
>     print("x는 0과 10 사이")     # 두 조건 모두 참 → 실행!
>
> if x < 0 or x > 3:
>     print("x는 0 미만이거나 3 초과")  # 두 번째 조건이 참 → 실행!
>
> if not x == 0:
>     print("x는 0이 아님")        # x == 0이 거짓이므로 not으로 뒤집으면 참 → 실행!
> ```

**💻 VPython에서 확인하기**

```python
from vpython import *

ball = sphere(pos=vector(3, 2, 0), radius=0.5, color=color.white)

# 공이 x > 0 이고 동시에 y > 0 인 영역에 있는지 확인
if ball.pos.x > 0 and ball.pos.y > 0:
    ball.color = color.yellow
    print("공은 1사분면에 있습니다!")  # 이것이 실행됩니다
```

---

## 🔨 따라하기

자, 이제 직접 만들어 봅시다! 점점 풍성해지는 3D 세상을 경험하세요.

### Step 1: 영역에 따라 색이 바뀌는 공

먼저 가장 단순한 형태부터 시작합니다. 공의 **x 좌표에 따라 색이 달라지는** 프로그램을 만들어 봅시다.

```python
from vpython import *

# === WHAT: x 좌표에 따라 공의 색이 바뀌는 프로그램 ===
# --- WHY: if-elif-else의 기본 동작을 눈으로 확인하기 ---

# 장면 설정: 영역 경계를 보여주는 반투명 벽
box(pos=vector(-3, 0, 0), size=vector(0.05, 4, 4), color=color.red, opacity=0.3)
box(pos=vector(3, 0, 0), size=vector(0.05, 4, 4), color=color.blue, opacity=0.3)

# 영역 라벨
label(pos=vector(-4.5, 2.5, 0), text="왼쪽 (빨강)", color=color.red)
label(pos=vector(0, 2.5, 0), text="가운데 (초록)", color=color.green)
label(pos=vector(4.5, 2.5, 0), text="오른쪽 (파랑)", color=color.blue)

# 공 생성
ball = sphere(pos=vector(-5, 0, 0), radius=0.4, color=color.white,
              make_trail=True, trail_color=color.white, trail_radius=0.05)
velocity = vector(2, 0, 0)  # 오른쪽으로 이동
dt = 0.02

while True:
    rate(50)
    ball.pos = ball.pos + velocity * dt

    # 🌟 핵심: 위치에 따라 색상 변경!
    if ball.pos.x < -3:
        ball.color = color.red       # 왼쪽 영역 → 빨강
    elif ball.pos.x > 3:
        ball.color = color.blue      # 오른쪽 영역 → 파랑
    else:
        ball.color = color.green     # 가운데 영역 → 초록

    # 화면 밖으로 나가면 되돌리기
    if ball.pos.x > 7:
        ball.pos.x = -7
        ball.clear_trail()
```

**실행 결과**: 공이 왼쪽에서 오른쪽으로 이동하면서 빨강 → 초록 → 파랑으로 색이 부드럽게 바뀝니다. 공이 경계선(반투명 벽)을 지날 때마다 색이 딱 바뀌는 것을 확인하세요!

코드를 하나씩 살펴봅시다.

- `if ball.pos.x < -3:` — "공의 x좌표가 -3보다 작으면" (왼쪽 영역)
- `elif ball.pos.x > 3:` — "아니고, x좌표가 3보다 크면" (오른쪽 영역)
- `else:` — "둘 다 아니면" (가운데 영역, 즉 -3 이상 3 이하)

> 💡 `elif`는 "else if"의 줄임말입니다. "앞의 조건이 거짓이고, 이 조건이 참이면"이라는 뜻이죠. 조건을 여러 개 연결할 때 사용합니다.

---

### Step 2: 벽에 부딪히면 튕기는 공 🏓

이번에는 프로그래밍의 고전! **벽에 닿으면 방향이 반대로 바뀌는 공**을 만듭니다. 이것은 if문의 가장 대표적인 활용 사례입니다.

```python
from vpython import *

# === WHAT: 벽에 부딪히면 튕기는 공 ===
# --- WHY: if문으로 물체의 행동을 제어하는 패턴 배우기 ---

# 양쪽 벽 만들기
wall_right = box(pos=vector(6, 0, 0), size=vector(0.2, 6, 4), color=color.white, opacity=0.4)
wall_left = box(pos=vector(-6, 0, 0), size=vector(0.2, 6, 4), color=color.white, opacity=0.4)
wall_top = box(pos=vector(0, 3, 0), size=vector(12, 0.2, 4), color=color.white, opacity=0.4)
wall_bottom = box(pos=vector(0, -3, 0), size=vector(12, 0.2, 4), color=color.white, opacity=0.4)

# 바닥
box(pos=vector(0, 0, -2), size=vector(12, 6, 0.1), color=color.white, opacity=0.1)

# 공 생성
ball = sphere(pos=vector(0, 0, 0), radius=0.4, color=color.cyan,
              make_trail=True, trail_color=color.cyan, trail_radius=0.03)

# 속도: 오른쪽 위 방향으로 출발
ball_velocity = vector(4, 3, 0)
dt = 0.02

while True:
    rate(100)

    # 공 이동
    ball.pos = ball.pos + ball_velocity * dt

    # 🌟 핵심: 벽 충돌 감지 + 방향 반전!

    # 오른쪽 벽에 닿으면 x 방향 반전
    if ball.pos.x > 6 - ball.radius:
        ball_velocity.x = -ball_velocity.x
        ball.color = color.red      # 충돌 시 빨강!

    # 왼쪽 벽에 닿으면 x 방향 반전
    if ball.pos.x < -6 + ball.radius:
        ball_velocity.x = -ball_velocity.x
        ball.color = color.yellow   # 충돌 시 노랑!

    # 위쪽 벽에 닿으면 y 방향 반전
    if ball.pos.y > 3 - ball.radius:
        ball_velocity.y = -ball_velocity.y
        ball.color = color.green    # 충돌 시 초록!

    # 아래쪽 벽에 닿으면 y 방향 반전
    if ball.pos.y < -3 + ball.radius:
        ball_velocity.y = -ball_velocity.y
        ball.color = color.magenta  # 충돌 시 자홍!
```

**실행 결과**: 공이 사각형 공간 안에서 계속 튕깁니다! 벽에 부딪힐 때마다 색이 바뀌면서 어디에 충돌했는지 시각적으로 보여줍니다.

핵심 패턴을 분석해 봅시다.

- `if ball.pos.x > 6 - ball.radius:` — "공의 오른쪽 끝이 벽에 닿으면"
- `ball_velocity.x = -ball_velocity.x` — "x 방향 속도를 반대로!" (양수→음수, 음수→양수)

> 🧩 **왜 `6 - ball.radius`인가요?** 공의 중심(pos)이 벽 위치(6)에 닿을 때는 이미 공의 절반이 벽을 뚫은 상태입니다. 공의 반지름만큼 미리 감지해야 자연스럽게 튕깁니다.

> 💡 **주목!** 여기서 네 개의 `if`문을 별도로 사용했습니다. `if-elif-else`가 아닌 **독립적인 `if`문 네 개**입니다. 왜일까요? 만약 공이 모서리(코너)에 부딪히면 x와 y 방향 **모두** 반전해야 하기 때문입니다. `elif`를 쓰면 하나만 실행되고 나머지는 건너뛰게 되죠!

---

### Step 3: 온도에 따라 색이 변하는 3D 온도계 🌡️

이제 if-elif-else를 총동원하는 프로젝트입니다! **온도가 올라갔다 내려갔다 하면서** 온도계의 색과 높이가 변하는 시뮬레이션을 만듭니다.

```python
from vpython import *

# === WHAT: 온도에 따라 색이 변하는 3D 온도계 ===
# --- WHY: 여러 조건 분기를 하나의 시뮬레이션에서 종합 연습 ---

# 온도계 외관: 유리관 (반투명 원기둥)
glass_tube = cylinder(pos=vector(0, -3, 0), axis=vector(0, 8, 0),
                      radius=0.5, color=color.white, opacity=0.2)

# 온도계 구부 (아래쪽 동그란 부분)
bulb = sphere(pos=vector(0, -3, 0), radius=0.8, color=color.red)

# 수은주 (온도에 따라 높이가 변하는 원기둥)
mercury = cylinder(pos=vector(0, -3, 0), axis=vector(0, 1, 0),
                   radius=0.4, color=color.red)

# 눈금 표시
for i in range(0, 6):
    y_pos = -3 + i * 1.5
    box(pos=vector(0.8, y_pos, 0), size=vector(0.5, 0.05, 0.1), color=color.white)
    temp_value = i * 20
    label(pos=vector(1.8, y_pos, 0), text=str(temp_value) + "°C",
          height=12, color=color.white, box=False)

# 상태 표시 라벨
status_label = label(pos=vector(0, 6, 0), text="온도: 0°C",
                     height=16, color=color.white, box=False)
condition_label = label(pos=vector(0, 5.2, 0), text="",
                        height=14, color=color.white, box=False)

# 온도 변수
temperature = 0       # 현재 온도 (0~100)
temp_change = 0.5     # 온도 변화량 (양수면 상승, 음수면 하강)
dt = 0.02

while True:
    rate(50)

    # 온도 변화 (올라갔다 내려갔다)
    temperature = temperature + temp_change

    # 온도 범위 제한: 벽에서 튕기듯!
    if temperature >= 100:
        temp_change = -temp_change   # 100도 도달 → 하강으로 전환
    if temperature <= 0:
        temp_change = -temp_change   # 0도 도달 → 상승으로 전환

    # 🌟 핵심: 온도에 따라 색상과 상태 메시지 변경!
    if temperature < 20:
        # 🥶 추움 (0~19도)
        mercury.color = color.blue
        bulb.color = color.blue
        condition_label.text = "🥶 추움"
        condition_label.color = color.cyan
    elif temperature < 40:
        # 😊 선선함 (20~39도)
        mercury.color = color.cyan
        bulb.color = color.cyan
        condition_label.text = "😊 선선함"
        condition_label.color = color.cyan
    elif temperature < 60:
        # 😄 따뜻함 (40~59도)
        mercury.color = color.yellow
        bulb.color = color.yellow
        condition_label.text = "😄 따뜻함"
        condition_label.color = color.yellow
    elif temperature < 80:
        # 🔥 더움 (60~79도)
        mercury.color = color.orange
        bulb.color = color.orange
        condition_label.text = "🔥 더움"
        condition_label.color = color.orange
    else:
        # 🌋 매우 더움 (80~100도)
        mercury.color = color.red
        bulb.color = color.red
        condition_label.text = "🌋 매우 더움!"
        condition_label.color = color.red

    # 수은주 높이 업데이트 (온도에 비례)
    mercury_height = (temperature / 100) * 7.5
    mercury.axis = vector(0, max(mercury_height, 0.1), 0)

    # 상태 라벨 업데이트
    status_label.text = "온도: " + str(round(temperature, 1)) + "°C"
```

**실행 결과**: 온도계의 수은주가 올라갔다 내려갔다 하면서 파란색(추움) → 하늘색(선선함) → 노란색(따뜻함) → 주황색(더움) → 빨간색(매우 더움)으로 색이 변합니다. 화면 위쪽에 현재 온도와 상태 이모지가 표시됩니다.

코드의 핵심 구조를 분석합시다.

- **온도 변화 로직**: `temperature = temperature + temp_change`로 온도가 매 프레임 변합니다
- **범위 제한**: 0도와 100도에서 `temp_change`의 부호를 뒤집어 왕복 운동을 만듭니다 (Step 2의 벽 튕기기와 같은 패턴!)
- **5단계 분기**: `if → elif → elif → elif → else`로 온도 구간을 5개로 나누어 각각 다른 색과 메시지를 보여줍니다

> 🧩 **패턴 발견!** Step 2의 "벽 튕기기"와 Step 3의 "온도 왕복"은 본질적으로 **같은 패턴**입니다. "경계에 닿으면 방향을 반전한다." 이처럼 하나의 패턴을 다양한 상황에 적용하는 것이 **추상화(Abstraction)** — 컴퓨팅 사고력의 핵심 요소입니다!

---

## 📝 전체 코드

이 장의 최종 프로젝트 — **온도계 시뮬레이션**의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 온도에 따라 색이 변하는 3D 온도계 시뮬레이션 ===
# --- WHY: if-elif-else로 다단계 조건 분기를 3D로 체험하기 ---

# 온도계 외관
glass_tube = cylinder(pos=vector(0, -3, 0), axis=vector(0, 8, 0),
                      radius=0.5, color=color.white, opacity=0.2)
bulb = sphere(pos=vector(0, -3, 0), radius=0.8, color=color.red)
mercury = cylinder(pos=vector(0, -3, 0), axis=vector(0, 1, 0),
                   radius=0.4, color=color.red)

# 눈금 표시
for i in range(0, 6):
    y_pos = -3 + i * 1.5
    box(pos=vector(0.8, y_pos, 0), size=vector(0.5, 0.05, 0.1), color=color.white)
    temp_value = i * 20
    label(pos=vector(1.8, y_pos, 0), text=str(temp_value) + "°C",
          height=12, color=color.white, box=False)

# 상태 라벨
status_label = label(pos=vector(0, 6, 0), text="온도: 0°C",
                     height=16, color=color.white, box=False)
condition_label = label(pos=vector(0, 5.2, 0), text="",
                        height=14, color=color.white, box=False)

# 온도 변수
temperature = 0
temp_change = 0.5
dt = 0.02

while True:
    rate(50)

    # 온도 변화
    temperature = temperature + temp_change

    # 범위 제한 (0~100도 왕복)
    if temperature >= 100:
        temp_change = -temp_change
    if temperature <= 0:
        temp_change = -temp_change

    # 온도에 따라 색상과 메시지 변경
    if temperature < 20:
        mercury.color = color.blue
        bulb.color = color.blue
        condition_label.text = "🥶 추움"
        condition_label.color = color.cyan
    elif temperature < 40:
        mercury.color = color.cyan
        bulb.color = color.cyan
        condition_label.text = "😊 선선함"
        condition_label.color = color.cyan
    elif temperature < 60:
        mercury.color = color.yellow
        bulb.color = color.yellow
        condition_label.text = "😄 따뜻함"
        condition_label.color = color.yellow
    elif temperature < 80:
        mercury.color = color.orange
        bulb.color = color.orange
        condition_label.text = "🔥 더움"
        condition_label.color = color.orange
    else:
        mercury.color = color.red
        bulb.color = color.red
        condition_label.text = "🌋 매우 더움!"
        condition_label.color = color.red

    # 수은주 높이 업데이트
    mercury_height = (temperature / 100) * 7.5
    mercury.axis = vector(0, max(mercury_height, 0.1), 0)

    # 라벨 업데이트
    status_label.text = "온도: " + str(round(temperature, 1)) + "°C"
```

---

## 🧠 사고력 챌린지

여기서부터 진짜 실력이 자랍니다! 천천히, 연필과 종이를 꺼내서 풀어보세요.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 **실행하지 말고** 머릿속으로 따라가 보세요. 공은 최종적으로 어디에 있고, 무슨 색일까요?

```python
from vpython import *

ball = sphere(pos=vector(0, 0, 0), radius=0.5, color=color.white)
speed = 2
dt = 0.01

# 100번 반복
count = 0
while count < 100:
    rate(200)
    ball.pos.x = ball.pos.x + speed * dt
    count = count + 1

# 반복이 끝난 뒤 조건 검사
if ball.pos.x > 3:
    ball.color = color.red
elif ball.pos.x > 1:
    ball.color = color.yellow
else:
    ball.color = color.green
```

**생각해 볼 것**:
- `speed * dt`는 한 번에 얼마만큼 이동하나요?
- 100번 반복하면 총 이동 거리는?
- 최종 x좌표가 어떤 조건에 해당하나요?
- 공의 최종 색상은?

<details>
<summary>🔑 정답 확인하기</summary>

하나씩 계산해 봅시다.

- 한 번 이동 거리: `speed * dt = 2 * 0.01 = 0.02`
- 100번 반복 후 총 이동 거리: `0.02 * 100 = 2.0`
- 최종 x좌표: `0 + 2.0 = 2.0`

조건 검사:
- `ball.pos.x > 3` → `2.0 > 3` → **거짓** (넘어감)
- `ball.pos.x > 1` → `2.0 > 1` → **참!**
- 따라서 공의 색은 **노란색(color.yellow)**

공은 **x = 2.0 위치에 노란색**으로 멈춰 있습니다.

핵심 포인트: while 반복의 총 이동 거리를 계산하고, 그 결과로 조건문이 어떻게 분기되는지 따라가는 것이 이 문제의 핵심입니다. 수학적 사고와 논리적 사고가 결합되는 순간입니다!

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래 시뮬레이션의 동작을 읽고, `# 여기에 코드 작성` 부분을 완성하세요.

**동작 설명**:
- 공이 x축 방향으로 왕복 운동을 합니다
- x > 0 (오른쪽)에 있으면 공이 **커집니다** (radius가 증가)
- x < 0 (왼쪽)에 있으면 공이 **작아집니다** (radius가 감소)
- 공의 반지름은 최소 0.2, 최대 1.5를 넘지 않아야 합니다

```python
from vpython import *

ball = sphere(pos=vector(0, 0, 0), radius=0.5, color=color.cyan,
              make_trail=True, trail_radius=0.02)
ball_velocity = vector(3, 0, 0)
dt = 0.01

while True:
    rate(100)
    ball.pos = ball.pos + ball_velocity * dt

    # 벽 튕기기 (x = -5, 5)
    if ball.pos.x > 5:
        ball_velocity.x = -ball_velocity.x
    if ball.pos.x < -5:
        ball_velocity.x = -ball_velocity.x

    # 여기에 코드 작성:
    # 1) x > 0이면 radius를 0.01 증가, 아니면 0.01 감소
    # 2) radius가 0.2보다 작아지지 않도록, 1.5보다 커지지 않도록 제한
```

<details>
<summary>💡 힌트</summary>

- `ball.radius`로 현재 반지름에 접근할 수 있습니다
- 반지름 증가: `ball.radius = ball.radius + 0.01`
- 범위 제한도 if문으로!

</details>

<details>
<summary>🔑 정답 확인하기</summary>

```python
    # 1) x > 0이면 radius를 0.01 증가, 아니면 0.01 감소
    if ball.pos.x > 0:
        ball.radius = ball.radius + 0.01
    else:
        ball.radius = ball.radius - 0.01

    # 2) radius 범위 제한
    if ball.radius < 0.2:
        ball.radius = 0.2
    if ball.radius > 1.5:
        ball.radius = 1.5
```

핵심 포인트: "오른쪽이면 커지고, 왼쪽이면 작아진다"는 동작 설명을 if-else로 변환했습니다. 범위 제한은 별도의 if문 두 개로 처리합니다. 이것은 결과에서 코드로 **역방향 사고**하는 연습입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: "신호등 시뮬레이션"을 만들어 보세요!

**요구사항**:
- 세로로 서 있는 검은 상자(신호등 몸체) 안에 구 3개(빨강, 노랑, 초록)가 세로로 배치되어 있습니다
- 시간이 흐르면서 순환합니다: 초록(3초) → 노랑(1초) → 빨강(3초) → 다시 초록...
- **현재 켜진 신호만** 밝은 색, 나머지는 어두운 색(`vector(0.2, 0, 0)` 같은)으로 표시합니다
- 시간 추적에는 변수를 사용하세요 (힌트: `timer`라는 변수를 매 프레임 증가)

**힌트**:
- 전체 주기는 7초 (초록 3 + 노랑 1 + 빨강 3)
- `timer`가 0~3이면 초록, 3~4이면 노랑, 4~7이면 빨강
- 7초가 지나면 timer를 0으로 초기화

<details>
<summary>🔑 예시 답안</summary>

```python
from vpython import *

# === WHAT: 3D 신호등 시뮬레이션 ===
# --- WHY: 시간 조건 + if-elif-else 종합 활용 ---

# 신호등 몸체
box(pos=vector(0, 0, 0), size=vector(2, 5, 1), color=vector(0.2, 0.2, 0.2))

# 신호등 기둥
cylinder(pos=vector(0, -5, 0), axis=vector(0, 2.5, 0),
         radius=0.3, color=vector(0.3, 0.3, 0.3))

# 불 3개 (위에서 아래로: 빨강, 노랑, 초록)
red_light = sphere(pos=vector(0, 1.5, 0.5), radius=0.6, color=vector(0.2, 0, 0))
yellow_light = sphere(pos=vector(0, 0, 0.5), radius=0.6, color=vector(0.2, 0.2, 0))
green_light = sphere(pos=vector(0, -1.5, 0.5), radius=0.6, color=color.green)

# 상태 라벨
status = label(pos=vector(0, 4, 0), text="🟢 건너세요!",
               height=16, color=color.green, box=False)

timer = 0
dt = 0.02

while True:
    rate(50)
    timer = timer + dt

    # 7초 주기로 초기화
    if timer > 7:
        timer = 0

    # 신호 상태 결정
    if timer < 3:
        # 초록불 (0~3초)
        red_light.color = vector(0.2, 0, 0)
        yellow_light.color = vector(0.2, 0.2, 0)
        green_light.color = color.green
        status.text = "🟢 건너세요!"
        status.color = color.green
    elif timer < 4:
        # 노란불 (3~4초)
        red_light.color = vector(0.2, 0, 0)
        yellow_light.color = color.yellow
        green_light.color = vector(0, 0.2, 0)
        status.text = "🟡 주의하세요!"
        status.color = color.yellow
    else:
        # 빨간불 (4~7초)
        red_light.color = color.red
        yellow_light.color = vector(0.2, 0.2, 0)
        green_light.color = vector(0, 0.2, 0)
        status.text = "🔴 멈추세요!"
        status.color = color.red
```

이것은 하나의 예시입니다. 자동차가 신호에 따라 움직이게 추가한다면 더욱 멋진 시뮬레이션이 될 것입니다!

</details>

---

## ⚠️ 자주 하는 실수

프로그래밍을 하다 보면 누구나 실수합니다. 아래는 if문에서 가장 흔한 실수들입니다.

**실수 1: `=`와 `==` 혼동 (가장 흔함!)**

```python
# ❌ = 는 "값을 넣어라" (대입)
if x = 5:      # SyntaxError!
    print("5입니다")
```

```python
# ✅ == 는 "같은가?" (비교)
if x == 5:
    print("5입니다")
```

> `=`는 **대입**(값을 변수에 저장), `==`는 **비교**(두 값이 같은지 확인)입니다. 프로그래밍에서 가장 자주 하는 실수 1위! 글자 하나 차이로 에러가 나니 항상 주의하세요.

**실수 2: 들여쓰기 오류 (IndentationError)**

```python
# ❌ if 다음 줄에 들여쓰기가 없으면 오류!
if x > 0:
print("양수입니다")    # IndentationError!
```

```python
# ✅ 반드시 4칸(또는 탭) 들여쓰기
if x > 0:
    print("양수입니다")    # 올바른 들여쓰기
```

> 파이썬에서 들여쓰기는 단순한 스타일이 아니라 **문법의 일부**입니다. `if`, `elif`, `else` 다음에 오는 코드는 반드시 들여써야 합니다.

**실수 3: 콜론(`:`) 빠뜨리기**

```python
# ❌ 콜론을 빼먹으면 오류!
if x > 0
    print("양수입니다")    # SyntaxError!
```

```python
# ✅ 조건 뒤에 콜론 필수!
if x > 0:
    print("양수입니다")
```

> `if`, `elif`, `else` 줄 끝에는 **반드시 콜론(:)**을 붙여야 합니다.

**실수 4: elif와 else의 위치**

```python
# ❌ else 뒤에 elif가 올 수 없습니다!
if x > 0:
    print("양수")
else:
    print("0 이하")
elif x == 0:           # SyntaxError! else 뒤에 elif 불가!
    print("영")
```

```python
# ✅ 순서: if → elif → else (else는 항상 마지막)
if x > 0:
    print("양수")
elif x == 0:
    print("영")
else:
    print("음수")
```

> 조건문의 순서는 반드시 `if` → `elif`(여러 개 가능) → `else` 입니다. `else`는 항상 맨 마지막에 와야 합니다.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 확인해 봅시다.

- [ ] **`if`문의 기본 구조를 설명할 수 있나요?** → `if 조건:` 다음에 들여쓴 코드가 조건이 참일 때 실행된다
- [ ] **`=`와 `==`의 차이를 명확히 알고 있나요?** → `=`는 대입, `==`는 비교
- [ ] **`elif`와 `else`의 역할을 설명할 수 있나요?** → `elif`는 추가 조건, `else`는 모든 조건이 거짓일 때
- [ ] **비교 연산자 6가지를 모두 알고 있나요?** → `==`, `!=`, `<`, `>`, `<=`, `>=`
- [ ] **벽 튕기기 패턴을 직접 작성할 수 있나요?** → `if pos > 벽: velocity = -velocity`
- [ ] **`and`, `or`, `not`의 의미를 설명할 수 있나요?** → and는 모두 참, or는 하나라도 참, not은 뒤집기
- [ ] **온도계 코드에서 if-elif-else의 역할을 이해했나요?** → 온도 구간별로 다른 색과 메시지를 적용

> 💪 체크가 5개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 다중 벽 튕기기 — 3D 버전

Step 2의 벽 튕기기를 **z축까지 확장**해 보세요. 앞뒤 벽(z 방향)도 추가하면 공이 3D 상자 안에서 튀어다닙니다!

```python
from vpython import *

# 6면 벽을 만들고 공이 x, y, z 모든 방향에서 튕기도록 구현해 보세요
ball = sphere(pos=vector(0, 0, 0), radius=0.3, color=color.cyan, make_trail=True)
ball_velocity = vector(3, 2, 1.5)  # x, y, z 모두 속도가 있음!
dt = 0.01

while True:
    rate(100)
    ball.pos = ball.pos + ball_velocity * dt

    # 힌트: x, y, z 각각에 대해 벽 충돌 검사 if문을 추가하세요!
    # if ball.pos.x > 5: ...
    # if ball.pos.x < -5: ...
    # if ball.pos.y > ... : ...
    # (총 6개의 if문이 필요합니다)
```

### 도전 2: 점수 표시 — 충돌 횟수 세기

벽 튕기기 프로그램에 **충돌 횟수를 세는 기능**을 추가해 보세요.

```python
from vpython import *

bounce_count = 0
score_label = label(pos=vector(0, 4, 0), text="충돌: 0회", height=16, box=False)

# ... 벽 튕기기 코드 ...
# 충돌이 발생할 때마다:
#   bounce_count = bounce_count + 1
#   score_label.text = "충돌: " + str(bounce_count) + "회"
```

### 도전 3: 중력이 있는 튕기는 공

공에 **중력**을 추가해 보세요. 바닥에 부딪히면 튕기지만, 매번 속도가 줄어들어 결국 멈추는 시뮬레이션입니다.

```python
from vpython import *

ball = sphere(pos=vector(0, 5, 0), radius=0.3, color=color.orange, make_trail=True)
ball_velocity = vector(2, 0, 0)
gravity = vector(0, -9.8, 0)    # 중력 가속도
dt = 0.01

while True:
    rate(100)
    ball_velocity = ball_velocity + gravity * dt   # 중력으로 속도 변화
    ball.pos = ball.pos + ball_velocity * dt

    # 바닥(y=0)에 부딪히면 튕기기 (에너지 손실!)
    if ball.pos.y < ball.radius:
        ball_velocity.y = -ball_velocity.y * 0.85   # 85%만 반사 → 점점 낮아짐!
        ball.pos.y = ball.radius
```

> 🎯 `0.85`를 `0.5`나 `0.95`로 바꿔보세요. 에너지 손실이 다르면 어떻게 달라지나요?

---

## 🔗 다음 장으로

이번 장에서 우리는 프로그램에 **판단력**을 부여했습니다.

**배운 것 정리**:
- `if`, `elif`, `else` — 조건에 따라 다른 코드를 실행
- 비교 연산자 — `==`, `!=`, `<`, `>`, `<=`, `>=`
- 논리 연산자 — `and`, `or`, `not`으로 조건을 조합
- 벽 튕기기 패턴 — `if pos > 벽: velocity = -velocity`
- 구간 분기 패턴 — `if-elif-elif-else`로 여러 범위를 나누기

이제 프로그램은 상황을 "판단"하고 다른 행동을 "선택"할 수 있게 되었습니다. 하지만 아직 우리 코드에는 아쉬운 점이 있습니다. 같은 물체를 여러 개 만들 때 같은 코드를 반복해서 써야 한다는 것이죠. 벽 4개를 만들려면 `box()`를 4번, 공 10개를 만들려면 `sphere()`를 10번...

**다음 장 "리스트와 for문 — 반복의 예술"** 에서는 `for`문과 리스트를 사용하여 반복되는 코드를 깔끔하게 줄이는 방법을 배웁니다. 공 100개가 동시에 튕기는 장면도 만들어 볼 거예요! 🎪

> 🌟 **오늘의 한마디**: 프로그래밍의 세 기둥은 **순차**(위에서 아래로), **반복**(while), **선택**(if)입니다. 여러분은 오늘 세 번째 기둥을 세웠습니다. 이제 이 세 가지를 조합하면 거의 모든 프로그램을 만들 수 있습니다. 정말 대단하지 않나요?
