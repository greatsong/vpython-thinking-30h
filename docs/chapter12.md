# Chapter 12: 리스트 — 물체를 모아서 관리하기

**Part 4: 반복과 패턴의 마법**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **리스트에 여러 물체를 저장하고 인덱스로 접근**할 수 있다 — 번호표로 물체를 찾는 것처럼
- **리스트와 for문을 결합하여 모든 물체에 동시에 작업**할 수 있다 — 수십, 수백 개를 한꺼번에!
- **append, pop, len 등 리스트 메서드를 활용**할 수 있다 — 물체를 추가하고, 제거하고, 세기

> 🖥️ **이번 시간에 만들 것**: 랜덤한 위치에 20개의 형형색색 공을 생성하고, 모든 공이 동시에 움직이면서 서로를 끌어당기는 'N-body 시뮬레이션'을 만듭니다. 우주의 중력을 코드 몇 줄로 재현하는 놀라운 경험을 하게 됩니다!

---

## 💡 왜 이걸 배우나요?

### 물체가 100개라면?

지금까지 우리는 물체를 하나하나 변수에 담았습니다.

```python
from vpython import *

ball1 = sphere(pos=vector(-2, 0, 0), radius=0.3, color=color.red)
ball2 = sphere(pos=vector(-1, 0, 0), radius=0.3, color=color.blue)
ball3 = sphere(pos=vector(0, 0, 0), radius=0.3, color=color.green)
```

3개까지는 괜찮습니다. 그런데 만약 **100개**의 공이 필요하다면? `ball1`부터 `ball100`까지 변수를 100개 만들어야 할까요? 그리고 그 100개를 전부 움직이려면 `ball1.pos += ...`부터 `ball100.pos += ...`까지 100줄을 써야 할까요?

**상상만 해도 끔찍하죠.**

여기서 등장하는 것이 바로 **리스트(list)**입니다. 리스트를 쓰면 100개의 물체를 **하나의 변수**에 담고, for문 **단 두 줄**로 전부 움직일 수 있습니다. 프로그래밍에서 리스트는 "대량 생산"과 "일괄 관리"의 핵심 도구입니다. 이 개념을 익히면 여러분의 시뮬레이션은 완전히 다른 차원으로 올라섭니다.

---

## 📚 핵심 개념

### 개념 1: 리스트란? — 번호표가 붙은 서랍장

**비유로 시작하기**

학교 사물함을 떠올려 보세요. 사물함에는 번호가 붙어 있습니다. 0번, 1번, 2번... 각 칸에 물건을 하나씩 넣을 수 있고, 번호를 말하면 어떤 칸인지 바로 찾을 수 있죠.

파이썬의 **리스트**가 바로 이런 번호표 붙은 서랍장입니다. 여러 개의 값(숫자, 문자열, 심지어 VPython 물체!)을 순서대로 담아두고, 번호(인덱스)로 꺼낼 수 있습니다.

**정확한 정의**

리스트(list)는 **여러 값을 순서대로 담는 파이썬의 자료구조**입니다. 대괄호 `[]`로 만들고, 각 값은 쉼표로 구분합니다. 담긴 값에는 **0번부터 시작하는 번호(인덱스)**가 자동으로 붙습니다.

**예시로 확인하기**

```python
from vpython import *

# 숫자 리스트 만들기
scores = [90, 85, 100, 72, 95]

# 인덱스로 접근하기 (0번부터 시작!)
print(scores[0])    # 90 (첫 번째)
print(scores[2])    # 100 (세 번째)
print(scores[-1])   # 95 (마지막)
```

> 📖 **파이썬 문법: 리스트(list)**
>
> **만들기**: `my_list = [값1, 값2, 값3]`
>
> **인덱스 접근**: `my_list[0]`은 첫 번째 값, `my_list[1]`은 두 번째 값
>
> **중요**: 인덱스는 1이 아니라 **0부터 시작**합니다!
>
> **음수 인덱스**: `my_list[-1]`은 마지막 값, `my_list[-2]`는 끝에서 두 번째
>
> **빈 리스트**: `empty = []`으로 빈 서랍장을 먼저 만들 수도 있습니다

---

### 개념 2: 리스트에 물체 담기 — VPython의 진짜 힘

**비유로 시작하기**

장난감 가게에서 피규어를 사면 진열장에 올려놓죠? 피규어가 하나일 때는 책상 위에 놓으면 되지만, 20개가 넘으면 전용 진열장이 필요합니다. 리스트가 바로 그 진열장입니다. 물체를 넣으면 번호가 붙고, 나중에 번호로 찾을 수 있습니다.

**정확한 정의**

VPython에서 `sphere()`, `box()` 등으로 만든 물체도 변수에 담을 수 있는 "값"입니다. 따라서 **리스트에 물체를 담을 수 있습니다**. 리스트에 담긴 물체는 인덱스로 접근하여 속성(위치, 색상 등)을 변경할 수 있습니다.

**예시로 확인하기**

```python
from vpython import *

# 물체 3개를 리스트에 담기
balls = [
    sphere(pos=vector(-2, 0, 0), radius=0.3, color=color.red),
    sphere(pos=vector(0, 0, 0), radius=0.3, color=color.green),
    sphere(pos=vector(2, 0, 0), radius=0.3, color=color.blue)
]

# 인덱스로 특정 물체에 접근
balls[0].color = color.yellow     # 첫 번째 공을 노란색으로 변경
balls[2].pos = vector(2, 1, 0)    # 세 번째 공을 위로 이동
```

실행하면 빨간 공, 초록 공, 파란 공이 나란히 나타난 뒤, 첫 번째 공이 노란색으로 바뀌고 세 번째 공이 위로 올라갑니다.

---

### 개념 3: append — 서랍에 물건 추가하기

**비유로 시작하기**

빈 서랍장을 먼저 사 놓고, 물건을 하나씩 넣어가는 것을 상상해 보세요. "이 서랍장에 공을 추가해!" — 이것이 바로 `append()`입니다.

**정확한 정의**

`append()`는 리스트의 **맨 뒤에 새로운 값을 추가**하는 메서드입니다. `my_list.append(값)`을 호출하면 리스트의 길이가 1 늘어납니다. for문과 함께 쓰면 반복하면서 물체를 하나씩 생성하여 리스트에 담을 수 있습니다.

**예시로 확인하기**

```python
from vpython import *

# 빈 리스트로 시작
balls = []

# for문으로 5개의 공을 생성하며 리스트에 추가
for i in range(5):
    b = sphere(pos=vector(i * 2 - 4, 0, 0), radius=0.4, color=color.cyan)
    balls.append(b)

# 리스트에 5개가 들어있는지 확인
print(len(balls))   # 5
print(balls[0].pos)  # <-4, 0, 0>
print(balls[4].pos)  # <4, 0, 0>
```

실행하면 하늘색 공 5개가 일렬로 나타납니다. `balls` 리스트에 5개의 물체가 순서대로 담깁니다.

> 📖 **파이썬 문법: append(), pop(), len()**
>
> **append(값)**: 리스트 맨 뒤에 값을 추가합니다
> - `fruits = ["사과"]` 후 `fruits.append("바나나")` 하면 `["사과", "바나나"]`
>
> **pop()**: 리스트 맨 뒤의 값을 꺼내고 제거합니다
> - `fruits.pop()` 하면 `"바나나"`를 반환하고 리스트는 `["사과"]`로 돌아감
> - `pop(인덱스)`: 특정 위치의 값을 꺼냄. `fruits.pop(0)`은 첫 번째 값을 꺼냄
>
> **len(리스트)**: 리스트에 담긴 값의 개수를 반환합니다
> - `len(["a", "b", "c"])`는 `3`

---

### 개념 4: 리스트 + for문 = 일괄 처리의 마법

**비유로 시작하기**

반 학생 30명에게 유인물을 나눠준다고 생각해 보세요. 한 명 한 명 이름을 불러서 주는 것이 아니라, "자, 한 줄씩 돌려서 가져가세요!" 하면 됩니다. for문으로 리스트를 순회하는 것이 바로 이것입니다.

**정확한 정의**

`for 변수 in 리스트:` 구문은 리스트의 값을 **처음부터 끝까지 하나씩 꺼내서** 변수에 담고, 블록 안의 코드를 실행합니다. 물체 리스트에 적용하면 모든 물체에 같은 작업을 한꺼번에 적용할 수 있습니다.

**예시로 확인하기**

```python
from vpython import *

# 공 5개 생성
balls = []
for i in range(5):
    b = sphere(pos=vector(i * 2 - 4, 0, 0), radius=0.4, color=color.white)
    balls.append(b)

# 모든 공의 색상을 한꺼번에 빨간색으로!
for ball in balls:
    ball.color = color.red
```

`for ball in balls:`는 "balls 리스트에서 공을 하나씩 꺼내서 ball이라는 이름을 붙여라"라는 뜻입니다. 블록 안에서 `ball.color = color.red`를 하면 5개의 공이 모두 빨간색으로 변합니다.

> 📖 **파이썬 문법: for ... in 리스트**
>
> **기본 형태**:
> ```python
> for item in my_list:
>     # item으로 작업하기
> ```
>
> **작동 원리**: 리스트의 첫 번째 값부터 마지막 값까지, 하나씩 꺼내서 `item` 변수에 넣고 블록을 실행합니다
>
> **range()와의 차이**:
> - `for i in range(5):` — i에 0, 1, 2, 3, 4가 차례로 들어감
> - `for ball in balls:` — ball에 리스트 속 물체가 차례로 들어감
>
> **핵심**: for문 안에서 물체의 속성(pos, color, velocity 등)을 변경하면 모든 물체에 적용됩니다

---

## 🔨 따라하기

자, 이제 직접 해 봅시다! 아래 단계를 하나씩 따라 하세요.

### Step 1: 리스트 기본 — 숫자로 연습하기

VPython 물체를 다루기 전에, 숫자 리스트로 기본 동작을 확인해 봅시다.

```python
from vpython import *

# 리스트 만들기
numbers = [10, 20, 30, 40, 50]

# 인덱스로 접근
print("첫 번째:", numbers[0])     # 10
print("세 번째:", numbers[2])     # 30
print("마지막:", numbers[-1])     # 50

# append로 추가
numbers.append(60)
print("추가 후:", numbers)        # [10, 20, 30, 40, 50, 60]
print("길이:", len(numbers))      # 6

# pop으로 제거
removed = numbers.pop()
print("꺼낸 값:", removed)        # 60
print("제거 후:", numbers)        # [10, 20, 30, 40, 50]

# for문으로 전체 순회
for n in numbers:
    print(n, "의 두 배는", n * 2)
```

**실행 결과**: 각 print 문이 콘솔에 출력됩니다. 리스트에 값을 넣고(`append`), 빼고(`pop`), 세고(`len`), 순회하는(`for`) 네 가지 기본 동작을 확인하세요!

---

### Step 2: 물체 리스트 만들기 — for문 + append 패턴

이제 본격적으로 VPython 물체를 리스트에 담아 봅시다. 이것은 앞으로 가장 많이 사용할 핵심 패턴입니다.

```python
from vpython import *

# === WHAT: 10개의 공을 일렬로 생성하여 리스트에 저장 ===
# --- WHY: 빈 리스트 + for + append 패턴을 익히기 위해 ---

balls = []  # 빈 서랍장 준비

for i in range(10):
    x_pos = i * 1.5 - 6.75  # -6.75부터 6.75까지 균등 배치
    b = sphere(
        pos=vector(x_pos, 0, 0),
        radius=0.5,
        color=vector(i/10, 0.5, 1 - i/10)  # 색상이 점점 변함
    )
    balls.append(b)  # 리스트에 추가!

print("공의 개수:", len(balls))
print("3번째 공의 위치:", balls[2].pos)
print("마지막 공의 색상:", balls[-1].color)
```

**실행 결과**: 10개의 공이 일렬로 나타납니다. 왼쪽은 파란 계열, 오른쪽은 빨간 계열로 색상이 그라데이션됩니다. 이 패턴을 기억하세요. **빈 리스트 → for문 → 물체 생성 → append**. 이것이 VPython에서 여러 물체를 다루는 기본 공식입니다.

---

### Step 3: 리스트 + while문 = 동시에 움직이기

Chapter 11에서 배운 while 반복문과 리스트를 결합하면, 모든 물체를 **동시에** 움직일 수 있습니다!

```python
from vpython import *

# === WHAT: 10개의 공이 각각 다른 속도로 오른쪽으로 이동 ===
# --- WHY: 리스트 + while + for 결합 패턴을 익히기 위해 ---

balls = []
dt = 0.02

for i in range(10):
    b = sphere(
        pos=vector(-8, i * 1.2 - 5.4, 0),
        radius=0.4,
        color=vector(i/10, 1 - i/10, 0.5),
        make_trail=True
    )
    # 각 공에 속도 속성 추가! (VPython 물체에 자유롭게 속성을 붙일 수 있음)
    b.velocity = vector(0.5 + i * 0.3, 0, 0)  # 아래쪽 공일수록 빠르게
    balls.append(b)

# 애니메이션 루프
while True:
    rate(60)
    for ball in balls:    # 리스트의 모든 공에 대해
        ball.pos += ball.velocity * dt   # 각자의 속도로 이동!
```

**실행 결과**: 10개의 공이 왼쪽에서 오른쪽으로 이동합니다. 위에 있는 공은 느리게, 아래에 있는 공은 빠르게 움직입니다. 각 공의 궤적이 선으로 표시됩니다. `for ball in balls:` 단 한 줄로 10개의 공 모두에게 "너의 속도대로 움직여!"라고 명령한 것입니다.

---

### Step 4: 랜덤 위치에 별 만들기

이제 `random` 모듈의 `uniform()` 함수를 사용하여 **랜덤한 위치에 물체를 생성**해 봅시다.

```python
from vpython import *
from random import uniform

# === WHAT: 밤하늘에 50개의 별이 반짝이는 장면 ===
# --- WHY: random + 리스트 + while문의 결합을 연습하기 위해 ---

scene.background = color.black  # 밤하늘 배경

stars = []

for i in range(50):
    s = sphere(
        pos=vector(uniform(-10, 10), uniform(-6, 6), uniform(-5, 0)),
        radius=uniform(0.05, 0.2),
        color=color.white,
        emissive=True  # 스스로 빛나는 효과
    )
    s.original_radius = s.radius  # 원래 크기를 기억해둠
    s.twinkle_speed = uniform(1, 5)  # 반짝이는 속도 (별마다 다름)
    stars.append(s)

# 별이 반짝이는 애니메이션
t = 0
dt = 0.02

while True:
    rate(60)
    t += dt
    for star in stars:
        # sin 함수로 크기를 부드럽게 변화시켜 반짝이는 효과
        factor = 0.5 + 0.5 * sin(star.twinkle_speed * t * 2 * pi)
        star.radius = star.original_radius * (0.5 + factor * 0.5)
```

**실행 결과**: 검은 배경에 50개의 하얀 별이 랜덤한 위치에 나타납니다. 별마다 다른 속도로 반짝이며 크기가 변합니다. 진짜 밤하늘 같은 느낌이 납니다! `uniform(-10, 10)`은 -10에서 10 사이의 랜덤한 소수를 생성합니다.

> 📖 **파이썬 문법: from random import uniform**
>
> **uniform(a, b)**: a 이상 b 이하의 **랜덤한 소수(실수)**를 반환합니다
> - `uniform(-5, 5)` 하면 -5.0 ~ 5.0 사이의 아무 숫자 (예: 2.374, -0.918 등)
>
> **사용하려면**: 파일 맨 위에 `from random import uniform`을 추가해야 합니다
>
> **왜 쓰나요?**: 랜덤한 위치, 랜덤한 크기, 랜덤한 속도를 만들어 자연스러운 시뮬레이션을 구현합니다

---

### Step 5: 벽에 튕기는 20개의 공

이제 앞에서 배운 모든 것을 결합합니다. 리스트 + for문 + while문 + if문(벽 충돌) + 랜덤!

```python
from vpython import *
from random import uniform

# === WHAT: 20개의 공이 상자 안에서 자유롭게 움직이며 벽에 튕김 ===
# --- WHY: 리스트와 조건문을 결합한 다중 물체 시뮬레이션 ---

# 경계 상자 (투명하게)
boundary = 6
box(pos=vector(0, 0, 0), size=vector(boundary*2, boundary*2, 0.1),
    color=color.white, opacity=0.1)

balls = []
dt = 0.02

for i in range(20):
    b = sphere(
        pos=vector(uniform(-4, 4), uniform(-4, 4), 0),
        radius=0.3,
        color=vector(uniform(0, 1), uniform(0, 1), uniform(0, 1)),
        make_trail=True,
        trail_type="points",
        interval=5,
        retain=20
    )
    b.velocity = vector(uniform(-3, 3), uniform(-3, 3), 0)
    balls.append(b)

while True:
    rate(60)
    for ball in balls:
        ball.pos += ball.velocity * dt

        # 벽 충돌 검사 — x축
        if ball.pos.x > boundary - ball.radius:
            ball.pos.x = boundary - ball.radius
            ball.velocity.x *= -1

        if ball.pos.x < -boundary + ball.radius:
            ball.pos.x = -boundary + ball.radius
            ball.velocity.x *= -1

        # 벽 충돌 검사 — y축
        if ball.pos.y > boundary - ball.radius:
            ball.pos.y = boundary - ball.radius
            ball.velocity.y *= -1

        if ball.pos.y < -boundary + ball.radius:
            ball.pos.y = -boundary + ball.radius
            ball.velocity.y *= -1
```

**실행 결과**: 20개의 알록달록한 공이 보이지 않는 상자 안에서 자유롭게 날아다니며, 벽에 닿으면 튕겨 나옵니다. 각 공의 뒤에는 점 형태의 궤적이 짧게 남습니다. 이 코드에서 핵심은 `for ball in balls:` 안에 충돌 검사까지 포함했다는 것입니다. 리스트 덕분에 20개의 공 모두가 **같은 규칙**으로 움직입니다.

---

## 📝 전체 코드

이 장의 하이라이트 — **N-body 시뮬레이션**입니다. 서로 끌어당기는 입자들을 리스트로 관리합니다.

```python
from vpython import *
from random import uniform

# === WHAT: 서로 끌어당기는 입자들 — 간단한 N-body 시뮬레이션 ===
# --- WHY: 리스트의 이중 순회로 모든 물체 쌍에 대해 계산하는 패턴 ---

scene.background = vector(0.02, 0.02, 0.08)  # 어두운 우주 배경
scene.caption = "서로 끌어당기는 입자들 (N-body 시뮬레이션)"

N = 15  # 입자 수
G = 5   # 중력 상수 (실제보다 크게 설정하여 효과를 눈에 보이게)
dt = 0.01

# 입자 생성
particles = []

for i in range(N):
    p = sphere(
        pos=vector(uniform(-8, 8), uniform(-5, 5), 0),
        radius=0.25,
        color=vector(uniform(0.3, 1), uniform(0.3, 1), uniform(0.3, 1)),
        make_trail=True,
        trail_type="curve",
        retain=80
    )
    p.velocity = vector(uniform(-1, 1), uniform(-1, 1), 0)
    p.mass = uniform(0.5, 2.0)  # 질량도 랜덤
    p.radius = 0.15 + p.mass * 0.1  # 질량이 클수록 크게
    particles.append(p)

# 시뮬레이션 루프
while True:
    rate(100)

    # 모든 입자 쌍에 대해 중력 계산
    for i in range(len(particles)):
        force = vector(0, 0, 0)  # 이 입자에 작용하는 총 힘

        for j in range(len(particles)):
            if i == j:
                continue  # 자기 자신은 건너뛰기

            # 두 입자 사이의 거리 벡터
            r_vec = particles[j].pos - particles[i].pos
            r_mag = mag(r_vec)

            # 너무 가까우면 최소 거리 적용 (충돌 폭발 방지)
            if r_mag < 0.5:
                r_mag = 0.5

            # 중력 공식: F = G * m1 * m2 / r^2 * 방향
            force += G * particles[i].mass * particles[j].mass / r_mag**2 * norm(r_vec)

        # 가속도 = 힘 / 질량, 속도 업데이트
        particles[i].velocity += (force / particles[i].mass) * dt

    # 위치 업데이트 (속도 계산 후 별도로!)
    for p in particles:
        p.pos += p.velocity * dt
```

**실행 결과**: 15개의 알록달록한 입자가 우주 공간에 흩어져 있다가, 서로를 끌어당기면서 복잡한 궤도를 그립니다. 질량이 큰 입자(더 큰 공) 주위로 작은 입자들이 공전하기도 하고, 여러 입자가 뭉쳐서 덩어리를 이루기도 합니다. 꼬리(trail)가 아름다운 곡선을 남기며, 마치 은하가 형성되는 과정을 보는 것 같습니다.

**코드의 핵심 구조를 정리합니다.**

- **이중 for문**: `for i`와 `for j`를 겹쳐 사용하여 모든 입자 쌍(i, j)에 대해 중력을 계산합니다
- **`if i == j: continue`**: 자기 자신에게는 중력이 작용하지 않으므로 건너뜁니다
- **`norm(r_vec)`**: 벡터의 방향만 추출합니다 (크기를 1로 만든 단위 벡터)
- **`mag(r_vec)`**: 벡터의 크기(거리)를 계산합니다 (Chapter 9에서 배움)
- **위치 업데이트 분리**: 힘과 속도를 먼저 모두 계산한 뒤, 위치를 한꺼번에 업데이트합니다

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 이 문제들을 통해 **컴퓨팅 사고력의 근육**을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하면 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 먼저 그려 보세요!

```python
from vpython import *

colors = [color.red, color.orange, color.yellow, color.green, color.blue]

towers = []
for i in range(len(colors)):
    boxes_in_tower = []
    for j in range(i + 1):
        b = box(
            pos=vector(i * 2 - 4, j * 1.1, 0),
            size=vector(1, 1, 1),
            color=colors[i]
        )
        boxes_in_tower.append(b)
    towers.append(boxes_in_tower)
```

**생각해 볼 것**:

- `len(colors)`는 몇일까요? 외부 for문은 몇 번 반복하나요?
- `i`가 0일 때 내부 for문(`range(i + 1)`)은 몇 번 반복하나요?
- `i`가 1일 때는? `i`가 4일 때는?
- 각 탑의 x 위치(`i * 2 - 4`)는 어떻게 되나요?
- 결과적으로 어떤 계단 모양이 만들어질까요?

<details>
<summary>정답 확인하기</summary>

5개의 색이 다른 탑이 왼쪽에서 오른쪽으로 나란히 서 있습니다. 계단 모양입니다!

- **x = -4** (빨간색): 상자 1개 (높이 1단)
- **x = -2** (주황색): 상자 2개 (높이 2단)
- **x = 0** (노란색): 상자 3개 (높이 3단)
- **x = 2** (초록색): 상자 4개 (높이 4단)
- **x = 4** (파란색): 상자 5개 (높이 5단)

왼쪽에서 오른쪽으로 갈수록 높아지는 **무지개색 계단**입니다. `i + 1`이 각 탑의 높이를 결정하고, `j * 1.1`이 상자를 위로 쌓습니다.

핵심 포인트: **리스트 안의 리스트**(towers 안에 boxes_in_tower)도 가능합니다. 이것을 "2차원 리스트" 또는 "중첩 리스트"라고 합니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래와 같은 장면을 만드는 코드를 작성해 보세요.

**장면 설명**:

- **원형으로 배치된 12개의 공**이 있습니다 (시계의 숫자판처럼)
- 모든 공은 리스트에 담겨 있습니다
- while 반복문으로 **공들이 시계 방향으로 회전**합니다 (원의 중심은 원점)
- 각 공에는 궤적(make_trail)이 남습니다

**힌트**:

- 원형 배치는 Chapter 10에서 배운 sin, cos를 사용합니다
- `angle = i * 2 * pi / 12`로 각도를 계산합니다
- 회전은 각 공의 각도를 매 프레임 조금씩 증가시키면 됩니다
- 각 공에 `ball.angle` 속성을 붙여서 현재 각도를 기억시킵니다

<details>
<summary>힌트 더 보기</summary>

구조는 이렇습니다:

1. 빈 리스트 `balls = []`
2. `for i in range(12):` 안에서 각도 계산, 공 생성, 공에 angle 속성 부여, append
3. `while True:` 안에서 `for ball in balls:` — 각 공의 angle을 조금 증가시키고, `cos(angle)`, `sin(angle)`으로 새 위치 계산

</details>

<details>
<summary>정답 예시</summary>

```python
from vpython import *

R = 4  # 원의 반지름
balls = []

for i in range(12):
    angle = i * 2 * pi / 12
    b = sphere(
        pos=vector(R * cos(angle), R * sin(angle), 0),
        radius=0.3,
        color=vector(i/12, 1 - i/12, 0.5),
        make_trail=True,
        retain=50
    )
    b.angle = angle  # 각 공의 현재 각도를 기억
    balls.append(b)

dt = 0.02
while True:
    rate(60)
    for ball in balls:
        ball.angle += 0.5 * dt  # 시계 방향으로 각도 증가
        ball.pos = vector(R * cos(ball.angle), R * sin(ball.angle), 0)
```

핵심 포인트: 각 물체에 **커스텀 속성**(여기서는 `ball.angle`)을 붙이면, 물체마다 고유한 상태를 기억시킬 수 있습니다. 리스트와 결합하면 수십 개의 물체가 각자의 상태를 유지하면서 움직입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐⭐)

> **문제**: **"불꽃놀이 시뮬레이션"**을 만들어 보세요!

**아이디어**:

- 하나의 "폭발점"에서 수십 개의 파편(공)이 사방으로 퍼져 나갑니다
- 파편들은 리스트에 담겨 있고, 각각 랜덤한 속도를 가집니다
- 중력이 작용하여 파편들이 아래로 떨어집니다
- 시간이 지나면 파편이 사라집니다 (pop 또는 opacity 활용)

**규칙**:

- `from vpython import *`와 `from random import uniform`으로 시작할 것
- 파편 물체를 담는 리스트를 사용할 것
- **append**로 파편을 추가하고, 일정 시간 후 **pop**이나 **opacity**로 사라지게 할 것
- while 반복문으로 애니메이션을 만들 것
- 정답은 없습니다! 자유롭게 만들어 보세요

<details>
<summary>예시 답안</summary>

```python
from vpython import *
from random import uniform

scene.background = color.black

gravity = vector(0, -5, 0)
dt = 0.02

# 폭발 파편 생성
sparks = []
explosion_pos = vector(0, 2, 0)

for i in range(40):
    s = sphere(
        pos=vector(explosion_pos.x, explosion_pos.y, explosion_pos.z),
        radius=0.1,
        color=vector(1, uniform(0.2, 1), uniform(0, 0.3)),
        emissive=True,
        make_trail=True,
        trail_type="curve",
        retain=15
    )
    s.velocity = vector(uniform(-6, 6), uniform(2, 10), uniform(-2, 2))
    s.life = 0  # 생존 시간 추적
    sparks.append(s)

while True:
    rate(60)
    for spark in sparks:
        spark.velocity += gravity * dt
        spark.pos += spark.velocity * dt
        spark.life += dt
        # 시간이 지날수록 점점 어두워지며 사라짐
        fade = max(0, 1 - spark.life / 3)
        spark.opacity = fade
        spark.radius = 0.1 * fade
```

이 코드는 하나의 폭발만 보여줍니다. 더 도전하고 싶다면 키보드 입력으로 새 폭발을 추가하거나, 일정 시간마다 자동으로 새 폭발이 일어나도록 만들어 보세요!

</details>

---

## ⚠️ 자주 하는 실수

프로그래밍을 처음 하면 누구나 실수합니다. 리스트에서 가장 흔한 실수와 해결법을 정리합니다.

**실수 1: 인덱스가 0부터 시작한다는 것을 잊음**

```python
# ❌ 3개짜리 리스트에서 3번 인덱스는 없습니다!
balls = [sphere(), sphere(), sphere()]
print(balls[3])   # IndexError: list index out of range
```

```python
# ✅ 3개짜리 리스트의 인덱스는 0, 1, 2입니다
balls = [sphere(), sphere(), sphere()]
print(balls[2])   # 마지막 물체 (세 번째)
print(balls[-1])  # 이것도 마지막 물체!
```

> 리스트의 인덱스는 항상 **0부터 len(리스트)-1**까지입니다. 길이가 3이면 유효한 인덱스는 0, 1, 2입니다.

**실수 2: append할 때 새 리스트를 만들어버림**

```python
# ❌ append()는 결과를 반환하지 않습니다!
balls = []
balls = balls.append(sphere())  # balls가 None이 되어버림!
print(balls)  # None
```

```python
# ✅ append()는 리스트 자체를 변경합니다 (반환값 없음)
balls = []
balls.append(sphere())  # 이렇게만 쓰면 됩니다
print(len(balls))  # 1
```

> `append()`는 리스트를 직접 변경합니다. 반환값은 `None`이므로 `=`으로 받으면 안 됩니다!

**실수 3: for문에서 리스트 변수명과 개별 변수명을 혼동**

```python
# ❌ balls(리스트 전체)와 ball(개별 물체)를 혼동
balls = [sphere(pos=vector(i, 0, 0)) for i in range(3)]
for ball in balls:
    balls.pos.x += 1  # AttributeError! balls는 리스트이지, 물체가 아닙니다
```

```python
# ✅ for문 안에서는 개별 변수(ball)를 사용
balls = [sphere(pos=vector(i, 0, 0)) for i in range(3)]
for ball in balls:
    ball.pos.x += 1  # ball은 개별 물체!
```

> `balls`는 리스트 전체, `ball`은 리스트에서 꺼낸 개별 물체입니다. for문 안에서는 **단수형** 변수명을 쓰세요!

**실수 4: while문 안에서 리스트에 계속 append하여 무한히 늘어남**

```python
# ❌ 매 프레임마다 공을 추가하면 컴퓨터가 멈춥니다!
balls = []
while True:
    rate(60)
    balls.append(sphere(radius=0.1))  # 1초에 60개씩 생성 → 금세 수천 개!
```

```python
# ✅ 물체 생성은 while문 바깥에서, 물체 이동은 while문 안에서
balls = []
for i in range(20):
    balls.append(sphere(pos=vector(i-10, 0, 0), radius=0.3))

while True:
    rate(60)
    for ball in balls:
        ball.pos.x += 0.01  # 이동만 반복!
```

> 물체 **생성**은 while문 **밖에서**, 물체 **업데이트**는 while문 **안에서**! 이 구분을 꼭 기억하세요.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **빈 리스트를 만드는 코드를 쓸 수 있나요?** → `my_list = []`
- [ ] **리스트의 세 번째 값에 접근하는 코드를 쓸 수 있나요?** → `my_list[2]` (0부터 세니까!)
- [ ] **리스트에 값을 추가하는 메서드는?** → `append()`
- [ ] **리스트에서 마지막 값을 꺼내는 메서드는?** → `pop()`
- [ ] **리스트의 길이를 알려주는 함수는?** → `len()`
- [ ] **리스트의 모든 물체를 순회하는 for문을 쓸 수 있나요?** → `for item in my_list:`
- [ ] **빈 리스트 → for + append → while + for 패턴을 설명할 수 있나요?** → 물체 생성을 리스트에 모으고, 애니메이션에서 일괄 처리
- [ ] **N-body 시뮬레이션의 이중 for문이 왜 필요한지 설명할 수 있나요?** → 모든 입자 쌍(i, j)에 대해 힘을 계산해야 하므로

> 체크가 6개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 입자 합체 — pop 활용

N-body 시뮬레이션에서 두 입자가 매우 가까워지면 **하나로 합쳐지는** 기능을 추가해 보세요. 합쳐진 입자는 질량과 크기가 커집니다. `pop()`으로 작은 입자를 리스트에서 제거하고, 큰 입자의 질량을 늘리면 됩니다.

```python
from vpython import *
from random import uniform

scene.background = vector(0.02, 0.02, 0.08)
N = 12
G = 5
dt = 0.01

particles = []
for i in range(N):
    p = sphere(
        pos=vector(uniform(-6, 6), uniform(-4, 4), 0),
        radius=0.2,
        color=vector(uniform(0.3, 1), uniform(0.3, 1), uniform(0.3, 1)),
        make_trail=True,
        retain=60
    )
    p.velocity = vector(uniform(-1, 1), uniform(-1, 1), 0)
    p.mass = 1.0
    particles.append(p)

while True:
    rate(100)

    # 중력 계산
    for i in range(len(particles)):
        force = vector(0, 0, 0)
        for j in range(len(particles)):
            if i == j:
                continue
            r_vec = particles[j].pos - particles[i].pos
            r_mag = mag(r_vec)
            if r_mag < 0.5:
                r_mag = 0.5
            force += G * particles[i].mass * particles[j].mass / r_mag**2 * norm(r_vec)
        particles[i].velocity += (force / particles[i].mass) * dt

    # 위치 업데이트
    for p in particles:
        p.pos += p.velocity * dt

    # 합체 검사 — 가까운 쌍 찾기
    i = 0
    while i < len(particles):
        j = i + 1
        merged = False
        while j < len(particles):
            dist = mag(particles[i].pos - particles[j].pos)
            if dist < particles[i].radius + particles[j].radius:
                # 합체! 큰 쪽에 질량 추가
                particles[i].mass += particles[j].mass
                particles[i].radius = 0.15 + particles[i].mass * 0.08
                particles[j].visible = False
                particles[j].clear_trail()
                particles.pop(j)
                merged = True
            else:
                j += 1
        if not merged:
            i += 1
```

> 시간이 지나면 입자들이 하나둘 합쳐져서 점점 큰 입자가 됩니다. 마치 원시 행성이 형성되는 과정 같습니다!

### 도전 2: 리스트 컴프리헨션 (고급)

파이썬에는 리스트를 한 줄로 만드는 **리스트 컴프리헨션**이라는 문법이 있습니다.

```python
from vpython import *

# 일반적인 방법
balls = []
for i in range(10):
    balls.append(sphere(pos=vector(i-5, 0, 0), radius=0.3, color=color.cyan))

# 리스트 컴프리헨션 — 같은 결과를 한 줄로!
balls = [sphere(pos=vector(i-5, 0, 0), radius=0.3, color=color.cyan) for i in range(10)]
```

두 코드는 완전히 같은 결과를 만듭니다. 리스트 컴프리헨션은 `[표현식 for 변수 in 범위]` 형태입니다. 코드가 짧아져서 숙련된 프로그래머들이 많이 사용하지만, 처음에는 일반 for문이 더 읽기 쉬우니 편한 방법을 선택하세요!

### 도전 3: 은하 시뮬레이션

N-body 코드를 확장하여 입자 수를 50~100개로 늘리고, 초기에 모든 입자에 회전 속도를 부여해 보세요. 원점을 중심으로 회전하도록 속도를 설정하면 나선 은하 모양이 만들어집니다!

```python
from vpython import *
from random import uniform

scene.background = color.black
N = 60
G = 3
dt = 0.005

particles = []
for i in range(N):
    angle = uniform(0, 2 * pi)
    r = uniform(1, 8)
    pos = vector(r * cos(angle), r * sin(angle), 0)

    # 회전 속도: 원점에서 바깥을 향하는 벡터에 수직인 방향
    speed = 2 / (r ** 0.5)  # 안쪽이 빠르게 (케플러 법칙과 비슷)
    vel = vector(-speed * sin(angle), speed * cos(angle), 0)

    p = sphere(
        pos=pos,
        radius=0.08 + uniform(0, 0.08),
        color=vector(0.8, 0.8, uniform(0.5, 1)),
        emissive=True,
        make_trail=True,
        retain=100
    )
    p.velocity = vel
    p.mass = uniform(0.3, 1.5)
    particles.append(p)

# 중심에 큰 별 (은하 핵)
core = sphere(pos=vector(0, 0, 0), radius=0.4, color=color.yellow, emissive=True)
core.mass = 30
core.velocity = vector(0, 0, 0)
particles.append(core)

while True:
    rate(200)
    for i in range(len(particles)):
        force = vector(0, 0, 0)
        for j in range(len(particles)):
            if i == j:
                continue
            r_vec = particles[j].pos - particles[i].pos
            r_mag = mag(r_vec)
            if r_mag < 0.3:
                r_mag = 0.3
            force += G * particles[i].mass * particles[j].mass / r_mag**2 * norm(r_vec)
        particles[i].velocity += (force / particles[i].mass) * dt

    for p in particles:
        p.pos += p.velocity * dt
```

> 중심의 큰 별 주위로 수십 개의 작은 별이 나선 궤도를 그리며 회전합니다. 우주의 장엄함을 코드로 느껴 보세요!

---

## 🔗 다음 장으로

이번 장에서 우리는 **리스트**라는 강력한 도구를 손에 넣었습니다.

**배운 것 정리**:

- **리스트** = 번호표가 붙은 서랍장, `[]`로 만들고 인덱스로 접근
- **append()** = 리스트 뒤에 추가, **pop()** = 마지막 값 꺼내기, **len()** = 길이
- **for ... in 리스트** = 모든 값에 대해 일괄 작업
- **핵심 패턴**: 빈 리스트 → for + append로 물체 생성 → while + for로 일괄 애니메이션
- **이중 for문**: 모든 물체 쌍에 대한 계산 (N-body 시뮬레이션)

리스트를 사용하면서 느꼈을 겁니다. "이 코드를 반복해서 쓰는데, 함수로 묶으면 편하겠다"라고요. 예를 들어 "랜덤 위치에 공을 N개 만드는" 코드를 매번 쓰는 대신, `create_balls(n)`처럼 이름을 붙여 한 번에 호출하면 어떨까요?

**다음 장 "함수 — 나만의 명령어 만들기"** 에서는 반복되는 코드를 **함수**로 묶어 재사용하는 방법을 배웁니다. 코드를 더 깔끔하고 강력하게 만드는 비밀을 알려드리겠습니다!

> 오늘의 한마디: 리스트 하나에 100개의 물체를 담고, for문 두 줄로 전부 움직였습니다. 이것이 프로그래밍의 힘입니다. 반복 작업을 컴퓨터에게 맡기고, 여러분은 "어떻게 움직일까?"라는 **생각**에 집중하세요. 생각을 코드로, 코드를 3차원으로!
