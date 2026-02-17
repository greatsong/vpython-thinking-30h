# Chapter 11: while 반복문 — 끝나지 않는 시뮬레이션

**Part 4: 반복과 패턴의 마법**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **while과 for의 차이를 설명**할 수 있다 — "횟수"가 정해진 반복 vs "조건"이 맞는 동안의 반복
- **종료 조건을 설계**할 수 있다 — 무한히 반복하는 듯 보이지만, 정확한 시점에 멈추는 코드
- **dt(시간 간격)를 활용한 물리 시뮬레이션**을 만들 수 있다 — 중력 아래 자유낙하하는 공

> 🖥️ **이번 시간에 만들 것**: 공중에서 공을 놓으면 중력에 의해 점점 빨라지면서 떨어지는 자유낙하 시뮬레이션을 만듭니다. 물리 교과서에서만 보던 공식이 코드 몇 줄로 눈앞에 펼쳐집니다!

---

## 💡 왜 이걸 배우나요?

### "끝날 때까지 계속" — while의 철학

지금까지 우리는 `for`문으로 반복을 다뤘습니다. `for i in range(10)`은 "10번 반복해"라는 명령이었죠. 횟수가 미리 정해져 있었습니다.

그런데 세상에는 **"몇 번인지 모르지만, 어떤 조건이 맞을 때까지 계속"** 해야 하는 일이 훨씬 많습니다.

- 주전자의 물이 **끓을 때까지** 기다린다
- 엘리베이터가 **목표 층에 도착할 때까지** 올라간다
- 게임 캐릭터가 **체력이 0이 될 때까지** 전투를 계속한다
- 공이 **바닥에 닿을 때까지** 떨어진다

이런 상황에서는 `for`로는 부족합니다. "몇 번 반복해야 하는지" 미리 알 수 없으니까요. 바로 이때 등장하는 것이 **while 반복문**입니다.

### 물리 시뮬레이션의 세계

while문을 배우면 진짜 물리 시뮬레이션을 만들 수 있게 됩니다. 공이 떨어지고, 행성이 궤도를 돌고, 로켓이 발사되는 것 — 이런 것들은 모두 "어떤 조건이 성립하는 동안 반복적으로 위치를 업데이트"하는 패턴입니다.

여러분이 앞 장에서 `for`문으로 만든 애니메이션은 "정해진 횟수만큼 움직이고 끝"이었습니다. 하지만 오늘 배울 while문을 쓰면 **"바닥에 닿을 때까지 떨어지는 공"** 같은 현실적인 물리 현상을 코드로 재현할 수 있습니다.

---

## 📚 핵심 개념

### 개념 1: while문의 기본 구조

**🎭 비유로 시작하기**

놀이공원에서 롤러코스터를 타려고 줄을 서 있다고 상상해 보세요. 여러분은 이렇게 생각합니다.

> "내 앞에 사람이 **있는 동안**, 계속 기다린다."

몇 분 기다릴지는 모릅니다. 5분일 수도, 30분일 수도 있죠. 중요한 것은 **조건**(앞에 사람이 있는가?)이지, 횟수가 아닙니다. 내 차례가 오면 — 즉 조건이 더 이상 참이 아니면 — 기다림을 멈추고 탑승합니다.

while문이 바로 이것입니다. **"조건이 참인 동안 반복하고, 거짓이 되면 멈춘다."**

> 📖 **파이썬 문법: while 기본 구조**
>
> **기본 형태**
>
> ```python
> while 조건:
>     반복할 코드
> ```
>
> **작동 원리**
> - 파이썬이 `while` 줄에 도착하면, 먼저 **조건**을 확인합니다
> - 조건이 **True(참)** 이면 들여쓰기된 코드를 실행합니다
> - 실행이 끝나면 다시 조건을 확인합니다
> - 조건이 **False(거짓)** 이 되면 반복을 멈추고 while문 아래의 코드로 넘어갑니다
>
> **핵심 규칙**
> - `while` 뒤에 콜론(`:`)을 반드시 붙여야 합니다
> - 반복할 코드는 반드시 **들여쓰기**(보통 스페이스 4칸)해야 합니다
> - 반복문 안에서 조건을 변화시키는 코드가 반드시 있어야 합니다 (없으면 무한 루프!)

**💻 예시로 확인하기**

```python
from vpython import *

count = 0
while count < 5:
    print(count, "번째 반복!")
    count = count + 1

print("반복이 끝났습니다!")
```

이 코드의 흐름을 따라가 봅시다.

- **1회차**: count=0, 0 < 5는 참 → "0 번째 반복!" 출력, count가 1로 증가
- **2회차**: count=1, 1 < 5는 참 → "1 번째 반복!" 출력, count가 2로 증가
- **3회차**: count=2, 2 < 5는 참 → 계속...
- **5회차**: count=4, 4 < 5는 참 → "4 번째 반복!" 출력, count가 5로 증가
- **6회차 확인**: count=5, 5 < 5는 **거짓** → 반복 종료!
- "반복이 끝났습니다!" 출력

---

### 개념 2: while vs for — 언제 무엇을 쓸까?

**🎭 비유로 시작하기**

두 가지 운동 방법을 비교해 봅시다.

- **for**: "팔굽혀펴기 **20회** 해!" — 횟수가 정해져 있음
- **while**: "팔이 **떨릴 때까지** 팔굽혀펴기 해!" — 조건이 정해져 있음

둘 다 반복이지만, 쓰임새가 다릅니다.

**📖 정확한 구분**

**for를 쓰는 경우**
- 반복 **횟수**를 미리 알 때
- 리스트의 모든 항목을 순회할 때
- 예: `for i in range(10)`, `for color in colors`

**while을 쓰는 경우**
- 반복 횟수를 미리 **모를 때**
- 특정 **조건**이 만족될 때까지 반복할 때
- 예: 공이 바닥에 닿을 때까지, 사용자가 "종료"를 입력할 때까지

**💻 같은 결과, 다른 방식**

```python
from vpython import *

# for문으로 공 5개 만들기 — 횟수가 명확할 때
for i in range(5):
    sphere(pos=vector(i * 2, 3, 0), radius=0.4, color=color.cyan)

# while문으로 공 만들기 — 조건이 중요할 때
x = 0
while x <= 8:
    sphere(pos=vector(x, 0, 0), radius=0.4, color=color.yellow)
    x = x + 2
```

위 코드에서 두 방식 모두 비슷한 결과를 냅니다. 하지만 for는 "5개 만들어"라는 의도이고, while은 "x가 8 이하인 동안 계속 만들어"라는 의도입니다. 의미가 다르죠!

---

### 개념 3: rate()와 dt — 시뮬레이션의 심장

**🎭 비유로 시작하기**

영화를 생각해 보세요. 영화는 사실 수많은 정지 사진(프레임)을 빠르게 넘기는 것입니다. 보통 1초에 24장(24fps)을 보여주면 우리 눈에는 부드러운 움직임으로 보입니다.

VPython 시뮬레이션도 같은 원리입니다. while문 안에서 물체의 위치를 **조금씩 바꾸면서** 화면을 반복적으로 그려주면, 물체가 움직이는 것처럼 보입니다. 이때 두 가지 핵심 요소가 필요합니다.

- **rate(n)**: 1초에 최대 n번 반복하도록 속도를 조절합니다
- **dt**: 한 프레임과 다음 프레임 사이의 "시간 간격"입니다

> 📖 **파이썬 문법: rate()와 dt 패턴**
>
> **rate(n)의 역할**
>
> ```python
> while True:
>     rate(100)  # 1초에 100번 반복 → 한 프레임 = 0.01초
>     # 물체 업데이트 코드
> ```
>
> - `rate(100)` — 1초에 최대 100회 반복합니다. 이것이 없으면 컴퓨터가 최대 속도로 돌려서 화면이 제대로 표시되지 않습니다.
> - `rate(30)` — 1초에 30회. 느린 애니메이션.
> - `rate(1000)` — 1초에 1000회. 매우 빠른 시뮬레이션.
>
> **dt(시간 간격)의 역할**
>
> ```python
> dt = 0.01  # 한 프레임당 시간 간격 (초)
> ```
>
> - dt는 "시뮬레이션 세계에서 한 프레임에 몇 초가 흐르는가"를 결정합니다
> - dt가 작을수록 시뮬레이션이 더 **정밀**합니다 (하지만 느려집니다)
> - dt가 클수록 시뮬레이션이 더 **빠르지만 부정확**해집니다
> - 보통 `rate(100)`과 `dt = 0.01`을 함께 써서 **실시간**에 가깝게 만듭니다
>   (100회 x 0.01초 = 1초 → 시뮬레이션 1초 = 현실 1초)

**💻 예시로 확인하기**

```python
from vpython import *

# 장면 설정
ball = sphere(pos=vector(-5, 0, 0), radius=0.5, color=color.red)
ball.velocity = vector(2, 0, 0)  # 오른쪽으로 초속 2

dt = 0.01

# 공이 오른쪽 끝에 도달할 때까지 움직이기
while ball.pos.x <= 5:
    rate(100)
    ball.pos = ball.pos + ball.velocity * dt
```

이 코드에서 일어나는 일을 한 프레임씩 살펴봅시다.

- `ball.velocity * dt` = `vector(2,0,0) * 0.01` = `vector(0.02, 0, 0)`
- 매 프레임마다 공의 x좌표가 0.02씩 증가합니다
- `ball.pos.x`가 5를 넘는 순간 while 조건이 거짓이 되어 멈춥니다
- `rate(100)` 덕분에 1초에 100프레임으로 부드럽게 움직입니다

---

### 개념 4: 중력과 자유낙하 — 물리가 코드가 되는 순간

**🎭 비유로 시작하기**

손에서 공을 놓으면 어떻게 될까요? 처음에는 느리게, 점점 빨라지면서 떨어집니다. 왜 그럴까요? **중력이 매 순간 속도를 증가시키기 때문**입니다.

물리 시간에 배운 두 가지 공식을 기억해 봅시다.

- **속도 변화**: 새 속도 = 이전 속도 + 가속도 x 시간
- **위치 변화**: 새 위치 = 이전 위치 + 속도 x 시간

이 두 줄이면 자유낙하를 시뮬레이션할 수 있습니다!

**📖 정확한 물리-코드 대응**

> 📖 **파이썬 문법: 물리 시뮬레이션 기본 패턴**
>
> **물리 공식과 코드의 대응**
>
> - 물리 공식: v = v₀ + a * t
> - 코드: `ball.velocity = ball.velocity + g * dt`
>
> - 물리 공식: x = x₀ + v * t
> - 코드: `ball.pos = ball.pos + ball.velocity * dt`
>
> **전체 패턴 (암기할 것!)**
>
> ```python
> dt = 0.01
> ball.velocity = vector(0, 0, 0)     # 초기 속도
> g = vector(0, -9.8, 0)              # 중력 가속도 (아래 방향)
>
> while 종료_조건:
>     rate(100)
>     ball.velocity = ball.velocity + g * dt    # 속도 업데이트
>     ball.pos = ball.pos + ball.velocity * dt  # 위치 업데이트
> ```
>
> **핵심 순서**: 반드시 **속도를 먼저 업데이트**하고, 그 다음에 **위치를 업데이트**합니다. 순서가 바뀌면 시뮬레이션이 부정확해집니다!
>
> **왜 -9.8인가?**: 지구의 중력 가속도는 약 9.8 m/s²이고, 아래 방향이므로 y값이 음수(-9.8)입니다. VPython에서 y축의 양의 방향은 위쪽이니까요.

---

## 🔨 따라하기

자, 이제 직접 만들어 봅시다! 중력에 의해 자유낙하하는 공 시뮬레이션을 단계별로 완성합니다.

### Step 1: 장면 설정하기

먼저 배경과 물체를 준비합니다.

```python
from vpython import *

# 장면 설정
scene.background = color.white
scene.caption = "자유낙하 시뮬레이션"

# 바닥
ground = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 6),
             color=color.green, opacity=0.5)

# 공 — 높은 곳에서 시작
ball = sphere(pos=vector(0, 10, 0), radius=0.5,
              color=color.red, make_trail=True)

# 공의 초기 속도 (정지 상태에서 떨어뜨림)
ball.velocity = vector(0, 0, 0)
```

여기서 `make_trail=True`는 공이 지나간 자리에 궤적을 남기는 설정입니다. 공이 떨어지는 경로를 눈으로 확인할 수 있죠.

실행하면 초록 바닥 위 높은 곳에 빨간 공이 하나 떠 있는 장면이 보입니다. 아직 움직이지는 않습니다.

---

### Step 2: 중력과 시간 간격 설정하기

물리 상수와 시뮬레이션 시간 간격을 설정합니다.

```python
from vpython import *

# 장면 설정
scene.background = color.white

# 바닥
ground = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 6),
             color=color.green, opacity=0.5)

# 공
ball = sphere(pos=vector(0, 10, 0), radius=0.5,
              color=color.red, make_trail=True)
ball.velocity = vector(0, 0, 0)

# 물리 설정
g = vector(0, -9.8, 0)   # 중력 가속도
dt = 0.01                  # 시간 간격 (초)
```

`g = vector(0, -9.8, 0)` — 이것이 중력입니다! y방향으로 -9.8, 즉 매 초마다 속도가 아래쪽으로 9.8 m/s씩 빨라진다는 뜻입니다.

---

### Step 3: while문으로 낙하 시뮬레이션 완성!

이제 핵심입니다. while문을 추가하여 공이 바닥에 닿을 때까지 떨어지게 만듭니다.

```python
from vpython import *

# 장면 설정
scene.background = color.white
scene.caption = "자유낙하 시뮬레이션 — 공이 바닥에 닿을 때까지"

# 바닥
ground = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 6),
             color=color.green, opacity=0.5)

# 공
ball = sphere(pos=vector(0, 10, 0), radius=0.5,
              color=color.red, make_trail=True)
ball.velocity = vector(0, 0, 0)

# 물리 설정
g = vector(0, -9.8, 0)
dt = 0.01

# 자유낙하 시뮬레이션
while ball.pos.y >= ball.radius:
    rate(100)
    ball.velocity = ball.velocity + g * dt     # 속도 업데이트
    ball.pos = ball.pos + ball.velocity * dt   # 위치 업데이트
```

**왜 `ball.pos.y >= ball.radius`인가?**

공의 pos는 공의 **중심** 위치입니다. 바닥(y=0)에 공의 **표면**이 닿는 순간은 공의 중심이 반지름(0.5) 높이에 있을 때입니다. 그래서 `ball.pos.y >= ball.radius`(= 0.5)를 종료 조건으로 사용합니다.

실행해 보세요! 공이 처음에는 천천히, 점점 빠르게 떨어지는 것이 보일 것입니다. 궤적(`make_trail`)을 보면 간격이 점점 넓어지는 것을 확인할 수 있는데, 이것이 바로 **가속 운동**의 증거입니다.

---

### Step 4: 시간과 속도 표시 추가하기

떨어지는 동안 경과 시간과 현재 속도를 화면에 표시해 봅시다.

```python
from vpython import *

# 장면 설정
scene.background = color.white

# 바닥
ground = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 6),
             color=color.green, opacity=0.5)

# 높이 눈금 표시
for h in range(0, 11, 2):
    label(pos=vector(-4, h, 0), text=str(h) + "m",
          height=12, box=False, color=color.black)

# 공
ball = sphere(pos=vector(0, 10, 0), radius=0.5,
              color=color.red, make_trail=True)
ball.velocity = vector(0, 0, 0)

# 물리 설정
g = vector(0, -9.8, 0)
dt = 0.01
t = 0  # 경과 시간

# 정보 표시
info = label(pos=vector(3, 8, 0), text="",
             height=14, box=False, color=color.blue)

# 자유낙하 시뮬레이션
while ball.pos.y >= ball.radius:
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
    t = t + dt

    # 정보 업데이트
    speed = abs(ball.velocity.y)
    info.text = "시간: {:.2f}초\n속도: {:.1f} m/s\n높이: {:.1f}m".format(
        t, speed, ball.pos.y)

# 최종 결과 출력
print("총 낙하 시간: {:.2f}초".format(t))
print("착지 속도: {:.1f} m/s".format(abs(ball.velocity.y)))
```

실행하면 공이 떨어지는 동안 시간, 속도, 높이가 실시간으로 업데이트됩니다. 10m 높이에서 떨어뜨리면 약 1.43초 후에 약 14.0 m/s의 속도로 바닥에 도달하는 것을 확인할 수 있습니다.

> 💡 **물리 검증**: 실제 공식으로 계산하면 t = sqrt(2h/g) = sqrt(20/9.8) ≈ 1.43초, v = g*t = 9.8 * 1.43 ≈ 14.0 m/s입니다. 시뮬레이션 결과와 거의 일치하죠! 이것이 dt를 작게 설정했을 때의 정밀도입니다.

---

## 📝 전체 코드

이 장에서 만든 최종 작품의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 중력에 의한 자유낙하 시뮬레이션 ===
# --- WHY: while문과 dt를 사용한 물리 시뮬레이션의 기본 패턴을 익히기 위해 ---

# 장면 설정
scene.background = color.white
scene.caption = "중력 자유낙하 시뮬레이션"

# 바닥
ground = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 6),
             color=color.green, opacity=0.5)

# 높이 눈금 표시
for h in range(0, 11, 2):
    label(pos=vector(-4, h, 0), text=str(h) + "m",
          height=12, box=False, color=color.black)

# 공 — 10m 높이에서 정지 상태로 시작
ball = sphere(pos=vector(0, 10, 0), radius=0.5,
              color=color.red, make_trail=True,
              trail_color=color.orange)
ball.velocity = vector(0, 0, 0)

# 물리 상수
g = vector(0, -9.8, 0)   # 중력 가속도 (m/s²)
dt = 0.01                  # 시간 간격 (초)
t = 0                      # 경과 시간

# 속도 화살표 (속도의 방향과 크기를 시각화)
vel_arrow = arrow(pos=ball.pos, axis=vector(0, 0, 0),
                  color=color.blue, shaftwidth=0.15)

# 정보 표시 라벨
info = label(pos=vector(3, 8, 0), text="시간: 0.00초\n속도: 0.0 m/s\n높이: 10.0m",
             height=14, box=False, color=color.blue)

# === 자유낙하 시뮬레이션 (while 반복문) ===
while ball.pos.y >= ball.radius:
    rate(100)

    # 1단계: 속도 업데이트 (v = v + a * dt)
    ball.velocity = ball.velocity + g * dt

    # 2단계: 위치 업데이트 (x = x + v * dt)
    ball.pos = ball.pos + ball.velocity * dt

    # 3단계: 시간 누적
    t = t + dt

    # 시각화 업데이트
    vel_arrow.pos = ball.pos
    vel_arrow.axis = ball.velocity * 0.2  # 화살표 크기 조절

    speed = abs(ball.velocity.y)
    info.text = "시간: {:.2f}초\n속도: {:.1f} m/s\n높이: {:.1f}m".format(
        t, speed, ball.pos.y)

# 최종 결과 출력
print("=== 시뮬레이션 완료 ===")
print("총 낙하 시간: {:.2f}초".format(t))
print("착지 속도: {:.1f} m/s".format(abs(ball.velocity.y)))
print("시작 높이: 10.0m")
```

**실행 결과**: 빨간 공이 10m 높이에서 정지 상태로 떨어지기 시작합니다. 파란 화살표가 속도의 크기와 방향을 보여주며 점점 길어집니다. 주황색 궤적의 간격이 점점 넓어지는 것을 통해 가속 운동임을 시각적으로 확인할 수 있습니다.

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 이 문제들을 통해 **컴퓨팅 사고력의 근육**을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하면 공이 어떻게 움직일까요? **실행하지 말고** 머릿속으로 먼저 시뮬레이션해 보세요!

```python
from vpython import *

scene.background = color.white

ground = box(pos=vector(0, -0.05, 0), size=vector(12, 0.1, 4),
             color=color.green, opacity=0.3)

ball = sphere(pos=vector(-5, 5, 0), radius=0.3,
              color=color.red, make_trail=True)
ball.velocity = vector(4, 0, 0)

g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
```

**생각해 볼 것**:
- 공의 초기 속도에서 x방향은 4, y방향은 0입니다. 이것은 어떤 의미일까요?
- 중력은 y방향(아래)으로만 작용합니다. x방향 속도는 변할까요?
- 궤적(trail)의 모양은 직선일까요, 곡선일까요?
- 이런 운동의 물리학적 이름은 무엇일까요?

<details>
<summary>🔑 정답 확인하기</summary>

이것은 **포물선 운동(projectile motion)** 입니다!

공은 왼쪽 위(x=-5, y=5)에서 시작하여 오른쪽으로 날아가면서 동시에 아래로 떨어집니다.

- **x방향**: 초속 4 m/s로 계속 오른쪽으로 이동 (중력은 x에 영향 없음)
- **y방향**: 처음 속도 0에서 중력에 의해 점점 빨라지며 아래로 떨어짐

궤적은 **포물선** 모양을 그립니다. 마치 야구공을 수평으로 던진 것과 같습니다.

핵심 포인트: 코드에서 `g = vector(0, -9.8, 0)`은 y방향에만 영향을 줍니다. x방향 속도(4 m/s)는 시뮬레이션 내내 변하지 않습니다. 이 "수평 방향과 수직 방향의 독립성"이 포물선 운동의 핵심 원리입니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래 시뮬레이션을 만드는 코드의 빈칸을 채워 보세요.

**장면 설명**:
- 빨간 공이 바닥(y=0)에서 위로 **발사**됩니다
- 공은 점점 느려지다가 최고점에서 멈추고, 다시 떨어져서 바닥으로 돌아옵니다
- 바닥에 다시 닿으면 시뮬레이션이 끝납니다

```python
from vpython import *

scene.background = color.white

ground = box(pos=vector(0, -0.05, 0), size=vector(8, 0.1, 4),
             color=color.green, opacity=0.5)

ball = sphere(pos=vector(0, 0.3, 0), radius=0.3,
              color=color.red, make_trail=True)

# 빈칸 1: 공의 초기 속도 — 위쪽으로 15 m/s
ball.velocity = ______

g = vector(0, -9.8, 0)
dt = 0.01
t = 0

# 빈칸 2: 종료 조건 — 공이 올라갔다가 다시 바닥에 닿을 때까지
# 힌트: t > 0.1을 추가해서 시작 직후 바로 멈추는 것을 방지
while ______ :
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
    t = t + dt
```

**힌트**:
- 빈칸 1: 위쪽 방향은 y축의 양의 방향입니다
- 빈칸 2: 공이 위로 올라갔다가 다시 내려와야 하므로, "t > 0.1"인 조건을 함께 넣어야 시작 직후에 바로 종료되지 않습니다

<details>
<summary>🔑 정답 확인하기</summary>

```python
from vpython import *

scene.background = color.white

ground = box(pos=vector(0, -0.05, 0), size=vector(8, 0.1, 4),
             color=color.green, opacity=0.5)

ball = sphere(pos=vector(0, 0.3, 0), radius=0.3,
              color=color.red, make_trail=True)

# 빈칸 1: 위쪽으로 15 m/s
ball.velocity = vector(0, 15, 0)

g = vector(0, -9.8, 0)
dt = 0.01
t = 0

# 빈칸 2: 올라갔다가 내려올 시간을 확보(t > 0.1)하고,
# 공이 바닥 근처에 도달하면 멈춤
while ball.pos.y >= ball.radius or t < 0.1:
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
    t = t + dt
```

핵심 포인트:

- **빈칸 1**: `vector(0, 15, 0)` — y축 양의 방향이 "위"이므로, 위로 15 m/s로 발사합니다.
- **빈칸 2**: `ball.pos.y >= ball.radius or t < 0.1` — 처음에는 공이 바닥(y ≈ 0.3)에서 시작하므로, `t < 0.1` 조건이 없으면 올라가기도 전에 멈춰버립니다. `or t < 0.1`을 추가하면 최소 0.1초 동안은 무조건 시뮬레이션이 진행됩니다.

물리적으로, 공은 약 1.53초 후 최고점(약 11.5m)에 도달하고, 총 약 3.06초 후에 다시 바닥으로 돌아옵니다.

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: 공 3개를 **서로 다른 높이**에서 **동시에** 떨어뜨리는 시뮬레이션을 만들어 보세요!

**조건**:
- 공 3개의 시작 높이: 5m, 10m, 15m
- 각 공의 색상은 서로 다르게 할 것
- 가장 높은 곳의 공이 바닥에 닿을 때까지 시뮬레이션을 진행할 것
- 바닥에 닿은 공은 더 이상 움직이지 않아야 함

**힌트**:
- 공 3개 각각에 velocity 속성을 설정해야 합니다
- while문 안에서 각 공의 높이를 확인하고, 바닥에 닿지 않은 공만 업데이트합니다
- `if` 조건문을 while문 안에서 사용하세요

<details>
<summary>💡 힌트 더 보기</summary>

구조를 생각해 봅시다.

- 공 3개를 각각 변수로 만든다 (ball1, ball2, ball3)
- while문의 조건은 가장 높은 공(ball3)이 바닥에 닿았는지 확인
- while문 안에서 각 공마다 if문으로 "아직 바닥 위에 있으면 업데이트"

```python
while ball3.pos.y >= ball3.radius:
    rate(100)
    if ball1.pos.y >= ball1.radius:
        # ball1 업데이트
    if ball2.pos.y >= ball2.radius:
        # ball2 업데이트
    # ball3은 항상 업데이트 (가장 높으므로 가장 늦게 도착)
```

</details>

<details>
<summary>🔑 예시 답안</summary>

```python
from vpython import *

# 장면 설정
scene.background = color.white
scene.caption = "서로 다른 높이에서 동시 낙하"

# 바닥
ground = box(pos=vector(0, -0.05, 0), size=vector(12, 0.1, 6),
             color=color.green, opacity=0.5)

# 공 3개 — 서로 다른 높이에서 시작
ball1 = sphere(pos=vector(-2, 5, 0), radius=0.4,
               color=color.yellow, make_trail=True)
ball1.velocity = vector(0, 0, 0)

ball2 = sphere(pos=vector(0, 10, 0), radius=0.4,
               color=color.orange, make_trail=True)
ball2.velocity = vector(0, 0, 0)

ball3 = sphere(pos=vector(2, 15, 0), radius=0.4,
               color=color.red, make_trail=True)
ball3.velocity = vector(0, 0, 0)

# 높이 라벨
label(pos=vector(-2, 5.8, 0), text="5m", height=12,
      box=False, color=color.black)
label(pos=vector(0, 10.8, 0), text="10m", height=12,
      box=False, color=color.black)
label(pos=vector(2, 15.8, 0), text="15m", height=12,
      box=False, color=color.black)

# 물리 설정
g = vector(0, -9.8, 0)
dt = 0.01

# 시뮬레이션 — 가장 높은 공이 바닥에 닿을 때까지
while ball3.pos.y >= ball3.radius:
    rate(100)

    if ball1.pos.y >= ball1.radius:
        ball1.velocity = ball1.velocity + g * dt
        ball1.pos = ball1.pos + ball1.velocity * dt

    if ball2.pos.y >= ball2.radius:
        ball2.velocity = ball2.velocity + g * dt
        ball2.pos = ball2.pos + ball2.velocity * dt

    ball3.velocity = ball3.velocity + g * dt
    ball3.pos = ball3.pos + ball3.velocity * dt
```

실행하면 세 공이 동시에 떨어지기 시작합니다. 낮은 곳의 공(5m)이 가장 먼저 바닥에 닿고, 높은 곳의 공(15m)이 가장 나중에 도착합니다. 중요한 관찰 포인트: 높이가 2배(5m → 10m)가 되어도 도착 시간은 2배가 아니라 약 1.4배(sqrt(2)배)입니다. 이것은 가속 운동의 특성입니다!

</details>

---

## ⚠️ 자주 하는 실수

while문은 강력하지만, 그만큼 조심해야 할 점도 있습니다.

**실수 1: 무한 루프 — 종료 조건을 잊은 경우**

```python
# ❌ 조건이 절대 거짓이 되지 않음 → 프로그램이 멈추지 않는다!
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 0.01

while True:     # 항상 True → 영원히 반복!
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
    # 공이 바닥을 뚫고 무한히 떨어진다!
```

```python
# ✅ 종료 조건을 명확히 설정
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:   # 바닥에 닿으면 멈춤!
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
```

> 만약 무한 루프에 빠졌다면, GlowScript에서는 페이지를 새로고침하고, 로컬에서는 Ctrl+C를 눌러 강제 종료하세요.

**실수 2: rate()를 빠뜨림**

```python
# ❌ rate()가 없으면 화면이 업데이트되지 않음!
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:
    # rate()가 없다! → 너무 빨라서 아무것도 안 보이고 바로 끝남
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
```

```python
# ✅ rate()를 반드시 while문 첫 줄에 넣기
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:
    rate(100)    # 1초에 100프레임 → 부드러운 애니메이션
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
```

> `rate()`는 while 시뮬레이션 루프의 **첫 번째 줄**에 넣는 것이 관례입니다. 이것이 없으면 컴퓨터가 가능한 한 빨리 반복해서 화면이 제대로 표시되지 않습니다.

**실수 3: 속도와 위치 업데이트 순서를 바꿈**

```python
# ❌ 위치를 먼저, 속도를 나중에 업데이트 → 약간 부정확
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:
    rate(100)
    ball.pos = ball.pos + ball.velocity * dt     # 위치를 먼저?
    ball.velocity = ball.velocity + g * dt       # 속도를 나중에?
```

```python
# ✅ 속도를 먼저, 위치를 나중에 (Euler method)
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:
    rate(100)
    ball.velocity = ball.velocity + g * dt       # 1. 속도 먼저!
    ball.pos = ball.pos + ball.velocity * dt     # 2. 위치 나중!
```

> 속도를 먼저 업데이트하고 그 새로운 속도로 위치를 업데이트하는 것이 더 정확합니다. 이 순서를 바꾸면 시뮬레이션이 실제 물리와 약간 달라질 수 있습니다.

**실수 4: dt를 너무 크게 설정**

```python
# ❌ dt가 너무 크면 시뮬레이션이 부정확하고 불안정함
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 1.0    # 1초 간격 → 너무 큼!

while ball.pos.y >= ball.radius:
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
```

```python
# ✅ dt = 0.01 정도가 적당함
from vpython import *

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red)
ball.velocity = vector(0, 0, 0)
g = vector(0, -9.8, 0)
dt = 0.01    # 0.01초 간격 → 정밀하고 안정적

while ball.pos.y >= ball.radius:
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
```

> dt가 크면 "한 프레임에 너무 많은 시간이 흘러서" 공이 바닥을 뚫고 지나가거나 물리적으로 이상한 행동을 할 수 있습니다. `dt = 0.01`이 가장 무난한 선택입니다.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **while문과 for문의 차이를 한 문장으로 설명할 수 있나요?** → for는 횟수가 정해진 반복, while은 조건이 참인 동안의 반복
- [ ] **`while ball.pos.y >= 0`이 무엇을 의미하는지 설명할 수 있나요?** → 공의 y좌표가 0 이상인 동안 반복합니다
- [ ] **`rate(100)`이 하는 일을 설명할 수 있나요?** → 1초에 최대 100번 반복하도록 속도를 제한합니다
- [ ] **dt가 무엇이고 왜 필요한지 설명할 수 있나요?** → 한 프레임당 시뮬레이션 시간 간격. 정밀한 물리 계산을 위해 작은 값을 사용합니다
- [ ] **속도와 위치 업데이트 순서를 기억하고 있나요?** → 속도를 먼저 업데이트하고, 그 다음에 위치를 업데이트합니다
- [ ] **무한 루프를 피하는 방법을 알고 있나요?** → while 조건이 언젠가 False가 되도록 반복문 안에서 조건 변수를 변화시켜야 합니다

> 💪 체크가 5개 이상이면 while문의 핵심을 완전히 이해한 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 바운스하는 공

공이 바닥에 닿으면 속도의 y성분을 반대로 바꾸면 튀어오르는 효과를 만들 수 있습니다. 에너지 손실을 적용하면 점점 낮게 튀어오릅니다.

```python
from vpython import *

scene.background = color.white

ground = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 6),
             color=color.green, opacity=0.5)

ball = sphere(pos=vector(0, 8, 0), radius=0.4,
              color=color.red, make_trail=True,
              trail_color=color.orange)
ball.velocity = vector(0, 0, 0)

g = vector(0, -9.8, 0)
dt = 0.01
t = 0

# 시뮬레이션 — 5초 동안 진행
while t < 5:
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
    t = t + dt

    # 바닥에 닿으면 튕기기 (에너지 20% 손실)
    if ball.pos.y <= ball.radius:
        ball.pos.y = ball.radius
        ball.velocity.y = -ball.velocity.y * 0.8
```

> 🔎 `0.8`을 `1.0`으로 바꾸면 에너지 손실 없이 영원히 같은 높이로 튀어오릅니다. `0.5`로 바꾸면 금방 멈추죠. 어떤 값이 가장 현실적일까요?

### 도전 2: 포물선 발사

공을 비스듬히 위로 던지는 시뮬레이션을 만들어 보세요.

```python
from vpython import *

scene.background = color.white

ground = box(pos=vector(0, -0.05, 0), size=vector(30, 0.1, 6),
             color=color.green, opacity=0.3)

ball = sphere(pos=vector(-10, 0.3, 0), radius=0.3,
              color=color.red, make_trail=True)

# 45도 각도로 발사 (x방향 10, y방향 10)
ball.velocity = vector(10, 10, 0)

g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:
    rate(200)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt
```

> 🔎 초기 속도의 x와 y 비율을 바꿔 보세요. `vector(10, 10, 0)`은 45도, `vector(10, 17.3, 0)`은 약 60도입니다. 어떤 각도에서 가장 멀리 날아갈까요?

### 도전 3: break로 특정 조건에서 멈추기

while문 안에서 `break`를 사용하면 언제든 반복을 즉시 종료할 수 있습니다.

```python
from vpython import *

scene.background = color.white

ground = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 6),
             color=color.green, opacity=0.5)

# 빨간 벽
wall = box(pos=vector(3, 2.5, 0), size=vector(0.2, 5, 4),
           color=color.red, opacity=0.5)

ball = sphere(pos=vector(-3, 8, 0), radius=0.3,
              color=color.blue, make_trail=True)
ball.velocity = vector(2, 0, 0)

g = vector(0, -9.8, 0)
dt = 0.01

while ball.pos.y >= ball.radius:
    rate(100)
    ball.velocity = ball.velocity + g * dt
    ball.pos = ball.pos + ball.velocity * dt

    # 벽에 부딪히면 즉시 멈춤!
    if ball.pos.x >= wall.pos.x - 0.3:
        print("벽에 충돌!")
        break
```

> 🔎 `break`는 while 조건과 관계없이 반복을 즉시 탈출합니다. 이 코드에서 공은 바닥에 먼저 닿을까요, 벽에 먼저 부딪힐까요? 초기 속도를 바꿔가며 실험해 보세요!

---

## 🔗 다음 장으로

이번 장에서 우리는 while 반복문으로 **진짜 물리 시뮬레이션**을 만들었습니다.

**배운 것 정리**:
- **while vs for**: for는 횟수 기반, while은 조건 기반 반복
- **rate(n)**: 1초에 n회 반복하도록 속도 제어
- **dt(시간 간격)**: 시뮬레이션의 정밀도를 결정하는 핵심 변수
- **물리 시뮬레이션 패턴**: 속도 업데이트 → 위치 업데이트 → 반복
- **종료 조건 설계**: 무한 루프를 피하고, 원하는 시점에 정확히 멈추기

이 장에서 배운 `while` + `dt` 패턴은 앞으로 만들 모든 시뮬레이션의 **뼈대**가 됩니다. 중력뿐 아니라 용수철, 마찰, 전자기력 — 어떤 힘이든 이 패턴 안에 넣으면 시뮬레이션할 수 있습니다.

다음 장에서는 이 물리 시뮬레이션 패턴을 더욱 발전시켜, **여러 물체가 서로 영향을 주고받는** 복잡한 시뮬레이션을 만들어 봅니다. 행성의 궤도 운동, 용수철에 연결된 물체의 진동 — 코드 몇 줄로 우주의 법칙을 재현하는 경험이 기다리고 있습니다!

> 🌟 **오늘의 한마디**: 여러분은 오늘 뉴턴의 운동 법칙을 코드로 구현했습니다. 교과서에서 공식으로만 보던 자유낙하를, 눈앞에서 직접 시뮬레이션했죠. **"공식을 외우는 것"과 "공식이 눈앞에서 작동하는 것을 보는 것"** — 어떤 쪽이 더 깊이 이해할 수 있을까요? 이것이 바로 코드로 배우는 물리의 힘입니다.
