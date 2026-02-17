# Chapter 5: 연산과 수식 — 물체를 계산으로 배치하기

**Part 2: 변수와 움직임의 세계**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **사칙연산과 나머지 연산을 파이썬으로 수행**할 수 있다 — `+`, `-`, `*`, `/`, `//`, `%`, `**`
- **수식을 사용하여 물체의 위치와 크기를 계산**할 수 있다 — 원형 배치, 크기 비례
- **입력(input)을 받아 계산 결과를 3D로 보여줄 수 있다** — 3D 막대그래프

> 🖥️ **이번 시간에 만들 것**: 사용자에게 숫자를 입력받아 3D 막대그래프를 자동으로 생성하는 프로그램을 완성합니다. 그 과정에서 물체를 원형으로 배치하고, 크기를 계산으로 결정하는 방법도 배웁니다.

---

## 💡 왜 이걸 배우나요?

### 계산이 곧 배치다

지난 시간에 변수를 배웠습니다. `x = 3`처럼 값을 이름에 저장하는 것이죠. 그런데 가만 생각해 보세요. 물체 10개를 나란히 놓으려면 위치를 `0, 2, 4, 6, 8, ...`으로 일일이 지정해야 할까요?

**아닙니다.** 연산을 쓰면 됩니다.

`i * 2`라고 쓰면, `i`가 0일 때 위치는 0, 1일 때 2, 2일 때 4... 자동으로 계산됩니다. 나중에 반복문을 배우면 이 패턴이 폭발적으로 강력해지지만, 지금은 **"계산 한 줄이 배치를 결정한다"**는 감각을 먼저 익혀봅시다.

### 🧠 이 장의 사고력 포인트

- 🔍 **코드 → 결과 예측**: 수식이 포함된 코드를 읽고, 물체가 어디에 나타날지 머릿속으로 계산하기
- 🔄 **결과 → 코드 역추적**: 배치 패턴을 보고, 어떤 수식이 사용되었는지 추론하기
- 💡 **상상 → 코드 창작**: "이런 모양으로 배치하고 싶다"는 생각을 수식으로 바꾸기

---

## 📚 핵심 개념

### 개념 1: 파이썬의 산술 연산자

> 📖 **파이썬 문법: 산술 연산자**
>
> 파이썬에서 사용할 수 있는 산술 연산자는 7가지입니다.
>
> - **`+` (덧셈)**: `3 + 2` → `5`
> - **`-` (뺄셈)**: `3 - 2` → `1`
> - **`*` (곱셈)**: `3 * 2` → `6`
> - **`/` (나눗셈)**: `7 / 2` → `3.5` (항상 소수점 결과)
> - **`//` (몫)**: `7 // 2` → `3` (소수점 버림)
> - **`%` (나머지)**: `7 % 2` → `1` (나눈 나머지)
> - **`**` (거듭제곱)**: `3 ** 2` → `9` (3의 2승)
>
> 연산 우선순위는 수학과 같습니다: `**` → `*`, `/`, `//`, `%` → `+`, `-`
> 괄호 `()`로 우선순위를 바꿀 수 있습니다.

**🎭 비유로 시작하기**

계산기를 떠올려 보세요. 파이썬은 세상에서 가장 강력한 계산기입니다. 일반 계산기에는 없는 `//`(몫만), `%`(나머지만), `**`(거듭제곱)까지 있으니까요.

그런데 이 계산 결과를 단순히 숫자로 보는 것이 아니라, **3D 물체의 위치나 크기로 바로 연결**할 수 있다면 어떨까요? 이것이 VPython에서 연산을 배우는 이유입니다.

**💻 VPython에서 확인하기**

```python
from vpython import *

# 연산 결과를 물체의 위치로 사용하기
a = 3
b = 2

# 덧셈 결과 → x 위치
sphere(pos=vector(a + b, 0, 0), color=color.red, radius=0.5)

# 곱셈 결과 → y 위치
sphere(pos=vector(0, a * b, 0), color=color.blue, radius=0.5)

# 거듭제곱 결과 → 반지름
sphere(pos=vector(-3, 0, 0), color=color.green, radius=a ** 0.5)

# 결과를 label로 표시
label(pos=vector(a + b, -1, 0), text=f'a+b = {a+b}')
label(pos=vector(0, a * b + 1, 0), text=f'a*b = {a*b}')
label(pos=vector(-3, -1, 0), text=f'sqrt(a) = {a**0.5:.2f}')
```

실행하면 세 개의 공이 나타납니다. 빨간 공은 `3+2=5`인 x=5 위치에, 파란 공은 `3*2=6`인 y=6 위치에, 초록 공은 `3**0.5≈1.73`의 반지름을 가집니다. **계산 결과가 물체의 모습을 결정합니다!**

---

### 개념 2: 나머지 연산(%)과 몫 연산(//)의 쓸모

**🎭 비유로 시작하기**

사탕 7개를 친구 2명에게 나눠주면 어떻게 될까요? 한 명에게 3개씩 주면(`7 // 2 = 3`), 1개가 남습니다(`7 % 2 = 1`). 프로그래밍에서 이 두 연산은 "깔끔하게 나누기"를 할 때 매우 유용합니다.

**💻 VPython에서 확인하기**

물체 5개를 2열로 배치해 봅시다. 몫과 나머지를 사용하면 격자 배치가 가능합니다.

```python
from vpython import *

# 5개의 물체를 2열로 배치
# 나머지(%) → 열(x 위치), 몫(//) → 행(y 위치)
for i in range(5):
    col = i % 2       # 0, 1, 0, 1, 0 → 열 번호
    row = i // 2      # 0, 0, 1, 1, 2 → 행 번호
    sphere(pos=vector(col * 3, -row * 3, 0), color=color.cyan, radius=0.8)
    label(pos=vector(col * 3, -row * 3 - 1.2, 0), text=f'i={i}')
```

> 💡 `for`와 `range`는 아직 정식으로 배우지 않았지만, 여기서는 "i를 0부터 4까지 바꿔가며 반복하라"는 의미라고만 알면 됩니다. Chapter 10에서 자세히 배웁니다!

---

### 개념 3: math 모듈과 삼각함수 맛보기

> 📖 **파이썬 문법: math 모듈**
>
> 파이썬에 내장된 수학 함수 모음입니다. 사용하려면 `import math`가 필요합니다.
>
> - **`math.pi`**: 원주율 π (3.14159...)
> - **`math.sin(각도)`**: 사인 값 (각도는 라디안 단위)
> - **`math.cos(각도)`**: 코사인 값 (각도는 라디안 단위)
> - **`math.sqrt(x)`**: 제곱근 (x의 0.5승과 같음)
> - **`math.radians(도)`**: 도(°)를 라디안으로 변환
>
> VPython에서는 `from vpython import *`만으로 `sin`, `cos`, `pi`, `sqrt` 등을 바로 사용할 수 있습니다 (math 모듈을 따로 import할 필요 없음!).

**🎭 비유로 시작하기**

시계 바늘을 떠올려 보세요. 바늘 끝은 원을 따라 돌아갑니다. 원 위의 한 점의 위치를 계산하려면 `sin`과 `cos`가 필요합니다. 수학 시간에 배우는 삼각함수가 바로 이것인데, 지금은 공식만 사용할 줄 알면 됩니다.

**핵심 공식**은 딱 이것입니다.

- **원 위의 x좌표** = 반지름 × cos(각도)
- **원 위의 y좌표** = 반지름 × sin(각도)

**💻 VPython에서 확인하기**

공 8개를 원형으로 배치해 봅시다.

```python
from vpython import *

# 원형 배치: 8개의 공을 반지름 4인 원 위에 배치
radius = 4         # 원의 반지름
num_objects = 8    # 물체 개수

for i in range(num_objects):
    angle = 2 * pi * i / num_objects   # 각도를 균등하게 나누기
    x = radius * cos(angle)            # x좌표 계산
    y = radius * sin(angle)            # y좌표 계산

    # 각도에 따라 색상을 다르게
    r = (i / num_objects)              # 0.0 ~ 0.875
    sphere(pos=vector(x, y, 0), radius=0.5, color=vector(r, 0.3, 1 - r))

# 중심에 작은 노란 공
sphere(pos=vector(0, 0, 0), radius=0.3, color=color.yellow)
```

실행하면 **마치 시계 숫자판처럼** 8개의 공이 원형으로 나타납니다. 중심에는 노란 공이 있고, 바깥 공들은 색상이 점점 변합니다. 삼각함수를 몰라도, 이 공식 두 줄(`cos`와 `sin`)만 기억하면 원형 배치를 할 수 있습니다!

---

### 개념 4: 입력(input) 받기

> 📖 **파이썬 문법: input()과 형 변환**
>
> - **`input("메시지")`**: 사용자에게 텍스트를 입력받습니다. 결과는 항상 **문자열(str)** 입니다.
> - **`int(x)`**: x를 정수로 변환합니다. `int("42")` → `42`
> - **`float(x)`**: x를 소수로 변환합니다. `float("3.14")` → `3.14`
> - **`str(x)`**: x를 문자열로 변환합니다. `str(42)` → `"42"`
>
> `input()`의 결과는 문자열이므로, 숫자로 계산하려면 반드시 `int()` 또는 `float()`로 변환해야 합니다!

**🎭 비유로 시작하기**

지금까지는 코드에 숫자를 직접 적었습니다. 하지만 실제 프로그램은 **사용자에게 물어보고** 그 답에 따라 다르게 동작합니다. 카페 키오스크처럼요 — "몇 잔 주문하시겠습니까?"라고 물은 뒤, 입력에 따라 총 금액을 계산합니다.

**💻 VPython에서 확인하기**

```python
from vpython import *

# 사용자에게 공의 개수를 입력받기
num = int(input("공을 몇 개 만들까요? (1~10): "))

# 입력받은 수만큼 공을 나란히 배치
for i in range(num):
    x_pos = i * 2.5 - (num - 1) * 1.25   # 가운데 정렬 계산
    sphere(pos=vector(x_pos, 0, 0), radius=0.8, color=color.orange)

# 결과 안내
label(pos=vector(0, 2, 0), text=f'{num}개의 공이 생성되었습니다!')
```

실행하면 콘솔에 "공을 몇 개 만들까요?"라고 물어봅니다. 숫자를 입력하면 그만큼 공이 나란히 나타납니다. 핵심은 `int(input(...))`입니다 — `input()`으로 받은 문자열을 `int()`로 정수 변환해야 계산에 쓸 수 있습니다.

> ⚠️ **GlowScript 참고**: GlowScript에서는 `input()` 대신 `winput()`이나 `slider()`를 사용합니다. 이 교재의 `input()` 코드는 로컬 환경(`.py` 파일)에서 실행하세요.

---

## 🔨 따라하기

자, 이제 직접 해 봅시다! 오늘의 목표는 **사용자 입력을 받아 3D 막대그래프를 만드는 프로그램**을 완성하는 것입니다. 하나씩 쌓아 올라갑시다.

### Step 1: 연산으로 계단 만들기

먼저 간단한 것부터 — 연산을 사용해서 계단 모양을 만들어 봅시다.

```python
from vpython import *

# 계단 만들기: 높이가 점점 올라가는 상자 5개
step1 = box(pos=vector(-4, 0.5, 0), size=vector(1.5, 1, 1.5), color=color.red)
step2 = box(pos=vector(-2, 1.0, 0), size=vector(1.5, 2, 1.5), color=color.orange)
step3 = box(pos=vector( 0, 1.5, 0), size=vector(1.5, 3, 1.5), color=color.yellow)
step4 = box(pos=vector( 2, 2.0, 0), size=vector(1.5, 4, 1.5), color=color.green)
step5 = box(pos=vector( 4, 2.5, 0), size=vector(1.5, 5, 1.5), color=color.cyan)
```

코드를 자세히 보세요. 패턴이 보이나요?

- **x 위치**: `-4, -2, 0, 2, 4` → 2씩 증가
- **y 위치**: `0.5, 1.0, 1.5, 2.0, 2.5` → 0.5씩 증가
- **높이**: `1, 2, 3, 4, 5` → 1씩 증가

이 패턴을 수식으로 표현하면 이렇습니다.

```python
from vpython import *

# 같은 계단을 수식으로 만들기
colors = [color.red, color.orange, color.yellow, color.green, color.cyan]

for i in range(5):
    x = i * 2 - 4         # -4, -2, 0, 2, 4
    height = i + 1         # 1, 2, 3, 4, 5
    y = height / 2         # 상자의 중심이 바닥에서 높이의 절반 위치
    box(pos=vector(x, y, 0), size=vector(1.5, height, 1.5), color=colors[i])

# 바닥판
box(pos=vector(0, -0.05, 0), size=vector(12, 0.1, 3), color=color.white, opacity=0.3)
```

**핵심 통찰**: `i * 2 - 4`라는 수식 하나로 5개 물체의 x 위치를 모두 결정했습니다. 수식이 곧 배치입니다!

---

### Step 2: 원형 배치 — 꽃잎 만들기

이번에는 삼각함수를 사용해서 물체를 원형으로 배치해 봅시다. 꽃잎 모양을 만들어 보겠습니다.

```python
from vpython import *

# 꽃의 중심
sphere(pos=vector(0, 0, 0), radius=0.8, color=color.yellow)

# 꽃잎 12장을 원형으로 배치
num_petals = 12
petal_radius = 3     # 꽃잎이 놓일 원의 반지름

for i in range(num_petals):
    angle = 2 * pi * i / num_petals    # 각도 균등 분배
    x = petal_radius * cos(angle)
    y = petal_radius * sin(angle)

    # 꽃잎은 타원형 상자로 표현
    box(pos=vector(x, y, 0),
        size=vector(1.2, 0.6, 0.3),
        color=vector(1, 0.4, 0.7),       # 분홍색
        axis=vector(cos(angle), sin(angle), 0))  # 바깥을 향하도록 회전

# 줄기
cylinder(pos=vector(0, -0.8, 0),
         axis=vector(0, -5, 0),
         radius=0.2,
         color=color.green)

# 잎 2장
box(pos=vector(0.8, -3, 0), size=vector(1.5, 0.5, 0.1),
    color=color.green, axis=vector(1, 0.5, 0))
box(pos=vector(-0.8, -4, 0), size=vector(1.5, 0.5, 0.1),
    color=color.green, axis=vector(-1, 0.5, 0))
```

실행하면 분홍색 꽃이 나타납니다! 꽃잎 하나하나의 위치가 `cos`과 `sin`으로 계산되었습니다. `num_petals`를 바꿔보세요 — 6으로 하면 6잎 꽃, 20으로 하면 촘촘한 꽃이 됩니다.

> 💡 **이해가 안 되어도 괜찮아요!** `cos`과 `sin`의 원리는 수학 시간에 배우게 됩니다. 지금은 "이 공식을 쓰면 원형으로 배치할 수 있구나"라는 감각만 가져가세요. 마법 주문처럼 사용해도 됩니다!

---

### Step 3: 사용자 입력으로 3D 막대그래프 만들기

이제 모든 것을 합쳐서 최종 프로젝트를 만듭니다. 사용자에게 숫자 여러 개를 입력받아 3D 막대그래프로 보여주는 프로그램입니다.

```python
from vpython import *

# === 3D 막대그래프 생성기 ===

# 1단계: 사용자에게 데이터 입력받기
print("=== 3D 막대그래프 생성기 ===")
print("과목별 점수를 입력하세요 (0~100)")
print()

korean = int(input("국어 점수: "))
math_score = int(input("수학 점수: "))   # math는 모듈 이름이라 math_score로!
english = int(input("영어 점수: "))
science = int(input("과학 점수: "))
social = int(input("사회 점수: "))

# 데이터를 리스트로 정리
scores = [korean, math_score, english, science, social]
subjects = ["국어", "수학", "영어", "과학", "사회"]
bar_colors = [color.red, color.blue, color.green, color.orange, color.purple]

# 2단계: 점수를 3D 막대로 변환
max_height = 10   # 100점일 때 막대 높이

for i in range(5):
    # 점수를 높이로 변환: 100점 → 높이 10, 50점 → 높이 5
    height = scores[i] / 100 * max_height
    x_pos = i * 3 - 6    # -6, -3, 0, 3, 6 (가운데 정렬)

    # 막대 생성
    box(pos=vector(x_pos, height / 2, 0),
        size=vector(2, height, 2),
        color=bar_colors[i],
        opacity=0.85)

    # 과목명 라벨
    label(pos=vector(x_pos, -1.5, 0),
          text=subjects[i],
          height=14,
          box=False)

    # 점수 라벨
    label(pos=vector(x_pos, height + 0.8, 0),
          text=f'{scores[i]}점',
          height=12,
          box=False)

# 3단계: 바닥과 제목
box(pos=vector(0, -0.05, 0), size=vector(18, 0.1, 4),
    color=color.white, opacity=0.3)

# 평균 계산
average = sum(scores) / len(scores)

label(pos=vector(0, max_height + 2, 0),
      text=f'📊 나의 성적표 (평균: {average:.1f}점)',
      height=18,
      box=False)

# 평균선 표시
cylinder(pos=vector(-8, average / 100 * max_height, 0),
         axis=vector(16, 0, 0),
         radius=0.03,
         color=color.yellow)

label(pos=vector(9, average / 100 * max_height, 0),
      text=f'평균 {average:.1f}',
      height=10,
      color=color.yellow,
      box=False)
```

이 코드를 실행하면 먼저 콘솔에서 5과목의 점수를 물어봅니다. 입력을 마치면 3D 막대그래프가 짜잔 하고 나타납니다! 노란색 수평선은 평균을 나타냅니다.

**코드에 사용된 연산 총정리**

- `scores[i] / 100 * max_height` — 점수를 높이로 비례 변환 (나눗셈 + 곱셈)
- `i * 3 - 6` — 막대 위치 계산 (곱셈 + 뺄셈)
- `height / 2` — 상자의 중심 위치 (나눗셈)
- `sum(scores) / len(scores)` — 평균 계산 (덧셈 + 나눗셈)

---

## 📝 전체 코드

이 장에서 만든 최종 작품의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 사용자 입력을 받아 3D 막대그래프를 생성하는 프로그램 ===
# --- WHY: 연산 결과를 물체의 위치와 크기로 변환하는 경험을 하기 위해 ---

# ──────────────────────────────────────
# 1. 사용자 입력 받기
# ──────────────────────────────────────
print("=== 🎨 3D 막대그래프 생성기 ===")
print("과목별 점수를 입력하세요 (0~100)")
print()

korean = int(input("국어 점수: "))
math_score = int(input("수학 점수: "))
english = int(input("영어 점수: "))
science = int(input("과학 점수: "))
social = int(input("사회 점수: "))

scores = [korean, math_score, english, science, social]
subjects = ["국어", "수학", "영어", "과학", "사회"]
bar_colors = [color.red, color.blue, color.green, color.orange, color.purple]

# ──────────────────────────────────────
# 2. 3D 막대그래프 그리기
# ──────────────────────────────────────
max_height = 10    # 100점 = 높이 10

for i in range(5):
    height = scores[i] / 100 * max_height      # 비례 변환
    x_pos = i * 3 - 6                           # 가운데 정렬

    # 막대
    box(pos=vector(x_pos, height / 2, 0),
        size=vector(2, height, 2),
        color=bar_colors[i],
        opacity=0.85)

    # 과목명
    label(pos=vector(x_pos, -1.5, 0),
          text=subjects[i], height=14, box=False)

    # 점수
    label(pos=vector(x_pos, height + 0.8, 0),
          text=f'{scores[i]}점', height=12, box=False)

# ──────────────────────────────────────
# 3. 바닥, 평균선, 제목
# ──────────────────────────────────────
box(pos=vector(0, -0.05, 0),
    size=vector(18, 0.1, 4),
    color=color.white, opacity=0.3)

average = sum(scores) / len(scores)

# 평균선
cylinder(pos=vector(-8, average / 100 * max_height, 0),
         axis=vector(16, 0, 0),
         radius=0.03,
         color=color.yellow)

label(pos=vector(9, average / 100 * max_height, 0),
      text=f'평균 {average:.1f}',
      height=10, color=color.yellow, box=False)

# 제목
label(pos=vector(0, max_height + 2, 0),
      text=f'나의 성적표 (평균: {average:.1f}점)',
      height=18, box=False)
```

**실행하면 이런 장면이 보입니다**: 5개의 과목별 막대가 점수에 비례한 높이로 솟아 있고, 노란색 평균선이 가로로 그어져 있습니다. 마우스로 돌려보면 진짜 3D 막대그래프입니다! 입력한 점수에 따라 그래프 모양이 달라지니, 여러 번 실행해서 비교해 보세요.

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 이 문제들을 통해 **연산과 3D 배치의 관계**를 꿰뚫어 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하면 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 먼저 계산해 보세요!

```python
from vpython import *

a = 10
b = 3

# 물체 1
sphere(pos=vector(a / b, 0, 0), radius=0.5, color=color.red)

# 물체 2
sphere(pos=vector(a // b, 2, 0), radius=0.5, color=color.blue)

# 물체 3
sphere(pos=vector(a % b, 4, 0), radius=0.5, color=color.green)

# 물체 4
box(pos=vector(a ** 0.5, 6, 0), size=vector(1, 1, 1), color=color.yellow)
```

**생각해 볼 것**:
- `a / b` = `10 / 3` = ? (소수점까지 나오는 나눗셈)
- `a // b` = `10 // 3` = ? (몫만 취하는 나눗셈)
- `a % b` = `10 % 3` = ? (나머지)
- `a ** 0.5` = `10 ** 0.5` = ? (제곱근)
- 물체들의 y 위치는 각각 몇인가요?

<details>
<summary>🔑 정답 확인하기</summary>

계산 결과는 다음과 같습니다.

- **빨간 공**: `10 / 3 ≈ 3.33` → x=3.33, y=0 위치
- **파란 공**: `10 // 3 = 3` → x=3, y=2 위치
- **초록 공**: `10 % 3 = 1` → x=1, y=4 위치
- **노란 상자**: `10 ** 0.5 ≈ 3.16` → x=3.16, y=6 위치

물체 4개가 **서로 다른 높이(y=0, 2, 4, 6)**에 배치됩니다. 가장 눈에 띄는 것은 초록 공입니다 — x=1로 혼자 왼쪽에 떨어져 있습니다. 빨간 공, 파란 공, 노란 상자는 x≈3 근처에 세로로 모여 있습니다.

**핵심 포인트**: 같은 숫자 10과 3이라도 연산자(`/`, `//`, `%`, `**`)에 따라 결과가 완전히 달라집니다. 특히 `/`와 `//`의 차이(3.33 vs 3)에 주목하세요!

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래 장면을 만드는 코드를 작성해 보세요.

**장면 설명**:
- 상자 4개가 **나란히** 있습니다 (x 위치: -3, 0, 3, 6)
- 각 상자의 **높이가 다릅니다**: 2, 4, 6, 8
- 상자의 **색상**은 높이가 높을수록 빨간색에 가깝습니다
- 모든 상자의 **가로와 깊이**는 1.5입니다
- 상자들은 **바닥에 붙어** 있습니다 (y 위치 = 높이 / 2)

**힌트**:
- x 위치 패턴: `-3, 0, 3, 6` → `i * 3 - 3`으로 표현할 수 있을까요?
- 높이 패턴: `2, 4, 6, 8` → `(i + 1) * 2`로 표현할 수 있을까요?
- 색상: `vector(비율, 0, 0)` 형식으로 빨간색 농도를 조절해 보세요

<details>
<summary>💡 힌트 더 보기</summary>

- `for i in range(4):`로 4번 반복합니다
- 색상의 빨간색 값을 `(i + 1) / 4`로 하면 0.25, 0.5, 0.75, 1.0이 됩니다
- `box()`의 `pos`에서 y 좌표는 `height / 2`로 설정하면 바닥에 붙습니다

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

for i in range(4):
    x = i * 3 - 3              # -3, 0, 3, 6
    height = (i + 1) * 2       # 2, 4, 6, 8
    red_value = (i + 1) / 4    # 0.25, 0.5, 0.75, 1.0

    box(pos=vector(x, height / 2, 0),
        size=vector(1.5, height, 1.5),
        color=vector(red_value, 0, 0))

# 바닥
box(pos=vector(1.5, -0.05, 0), size=vector(14, 0.1, 3),
    color=color.white, opacity=0.3)
```

핵심 포인트: 결과물의 **패턴(규칙)**을 찾아 **수식**으로 표현하는 것이 핵심입니다. `i * 3 - 3`이라는 수식 하나가 4개 물체의 위치를 결정하고, `(i + 1) * 2`라는 수식 하나가 높이를 결정합니다. 이것이 바로 **패턴 인식(Pattern Recognition)** — 컴퓨팅 사고력의 핵심 요소입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐)

> **문제**: 연산을 사용하여 **여러분이 원하는 3D 데이터 시각화**를 만들어 보세요!

**아이디어가 안 떠오른다면**:
- 📊 **가족 키 비교**: 가족 구성원의 키를 입력받아 3D 인형(cylinder+sphere)의 높이로 표현
- 🌡️ **일주일 기온**: 월~일 7일 기온을 입력받아 막대그래프로 표현, 영하 기온은 아래로
- 🎯 **과녁 점수판**: 원형 배치(sin/cos)를 사용해서 점수를 원형 그래프로 표현
- 🏙️ **도시 스카이라인**: 건물 높이를 랜덤 또는 입력으로 받아 도시 풍경 만들기

**규칙**:
- `from vpython import *`로 시작할 것
- **연산(+, -, *, / 등) 중 최소 3가지** 이상 사용할 것
- `input()`으로 사용자 입력을 **1개 이상** 받을 것
- 정답은 없습니다! 자유롭게 만들어 보세요

<details>
<summary>🔑 예시 답안: 가족 키 비교 시각화</summary>

```python
from vpython import *

# 가족 구성원의 키 입력받기
print("=== 👨‍👩‍👧‍👦 가족 키 비교 시각화 ===")
num_family = int(input("가족 구성원 수: "))

names = []
heights = []

for i in range(num_family):
    name = input(f"{i+1}번째 가족 이름: ")
    h = float(input(f"{name}의 키(cm): "))
    names.append(name)
    heights.append(h)

# 키를 3D 크기로 변환 (실제 키의 1/20 비율)
scale = 1 / 20

for i in range(num_family):
    x = i * 3 - (num_family - 1) * 1.5   # 가운데 정렬
    h = heights[i] * scale                 # cm → 3D 단위

    # 몸체 (원기둥)
    cylinder(pos=vector(x, 0, 0),
             axis=vector(0, h * 0.7, 0),
             radius=0.4,
             color=vector(0.3, 0.5, 0.9))

    # 머리 (구)
    sphere(pos=vector(x, h * 0.85, 0),
           radius=0.5,
           color=vector(1, 0.85, 0.7))

    # 이름과 키 라벨
    label(pos=vector(x, -1, 0),
          text=f'{names[i]}\n{heights[i]}cm',
          height=12, box=False)

# 바닥
box(pos=vector(0, -0.05, 0),
    size=vector(num_family * 3 + 2, 0.1, 3),
    color=color.white, opacity=0.3)
```

이것은 하나의 예시일 뿐입니다. 여러분만의 데이터를 시각화해 보세요!

</details>

---

## ⚠️ 자주 하는 실수

프로그래밍에서 연산을 다룰 때 누구나 한 번쯤 겪는 실수들입니다.

**실수 1: `input()` 결과를 숫자로 변환하지 않음**

```python
# ❌ input()의 결과는 문자열이라 계산할 수 없습니다
from vpython import *
x = input("x 위치: ")
sphere(pos=vector(x, 0, 0))
# TypeError: can't convert str to float
```

```python
# ✅ int() 또는 float()로 변환해야 합니다
from vpython import *
x = float(input("x 위치: "))
sphere(pos=vector(x, 0, 0))
```

> `input()`은 항상 **문자열**을 돌려줍니다. 숫자로 쓰려면 `int()` 또는 `float()`로 감싸세요!

**실수 2: 변수 이름으로 `math`를 사용**

```python
# ❌ math는 파이썬의 모듈 이름이라 변수로 쓰면 안 됩니다
from vpython import *
math = 95
# 이후 math.sin() 등이 작동하지 않게 됩니다!
```

```python
# ✅ 의미를 살린 다른 이름을 사용합니다
from vpython import *
math_score = 95
```

> 파이썬의 내장 이름(`math`, `list`, `str`, `int` 등)은 변수명으로 사용하지 마세요. 원래 기능이 사라집니다!

**실수 3: 정수 나눗셈의 혼동**

```python
# ⚠️ / 와 // 의 차이를 혼동하면 위치가 어긋납니다
from vpython import *

# / → 소수점까지 계산 (3.5)
sphere(pos=vector(7 / 2, 1, 0), color=color.red, radius=0.5)

# // → 소수점 버림 (3)
sphere(pos=vector(7 // 2, -1, 0), color=color.blue, radius=0.5)
```

> 정확한 나눗셈이 필요하면 `/`, 정수 결과만 원하면 `//`를 사용하세요. 특히 **인덱스나 개수** 계산에는 `//`가 적합합니다.

**실수 4: 상자(box)의 pos는 중심이다**

```python
# ❌ 높이가 6인 상자를 바닥에 놓고 싶을 때
from vpython import *
box(pos=vector(0, 0, 0), size=vector(2, 6, 2), color=color.blue)
# → 상자의 절반이 바닥 아래로 빠집니다!
```

```python
# ✅ y 위치를 높이의 절반으로 설정합니다
from vpython import *
height = 6
box(pos=vector(0, height / 2, 0), size=vector(2, height, 2), color=color.blue)
# → 상자가 바닥 위에 깔끔하게 서 있습니다
```

> `box()`의 `pos`는 상자의 **중심**입니다. 바닥에 붙이려면 `y = height / 2`로 설정하세요. 이것은 **나눗셈이 실제로 쓰이는** 대표적인 예입니다!

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **`7 / 2`와 `7 // 2`의 차이를 설명할 수 있나요?** → `/`는 소수점까지(3.5), `//`는 몫만(3)
- [ ] **`7 % 2`의 결과가 무엇인지 바로 말할 수 있나요?** → 1 (7을 2로 나눈 나머지)
- [ ] **`3 ** 2`의 결과가 무엇인지 알고 있나요?** → 9 (3의 2승)
- [ ] **수식으로 물체의 위치를 계산할 수 있나요?** → `i * 2 - 4`처럼 패턴을 수식으로 표현
- [ ] **`cos`과 `sin`으로 원형 배치를 하는 공식을 알고 있나요?** → `x = r * cos(angle)`, `y = r * sin(angle)`
- [ ] **`input()`으로 받은 값을 숫자로 변환할 수 있나요?** → `int(input(...))` 또는 `float(input(...))`

> 💪 체크가 4개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 구구단 타워 만들기

특정 단의 구구단을 3D 탑으로 쌓아 봅시다.

```python
from vpython import *

dan = int(input("몇 단을 만들까요? (2~9): "))

for i in range(1, 10):
    result = dan * i                    # 구구단 결과
    height = result / 10                # 결과를 높이로 변환

    box(pos=vector(0, sum(range(1, i)) * dan / 10 + height / 2, 0),
        size=vector(2, height, 2),
        color=vector(i / 9, 0.2, 1 - i / 9))

    label(pos=vector(2.5, sum(range(1, i)) * dan / 10 + height / 2, 0),
          text=f'{dan} x {i} = {result}',
          height=10, box=False)
```

### 도전 2: 나선형 계단 만들기

`sin`, `cos`와 높이 변화를 결합하면 나선형(spiral)이 됩니다!

```python
from vpython import *

num_steps = 30
radius = 3

for i in range(num_steps):
    angle = 2 * pi * i / 12           # 12개마다 한 바퀴
    x = radius * cos(angle)
    z = radius * sin(angle)
    y = i * 0.5                        # 점점 올라감

    box(pos=vector(x, y, z),
        size=vector(2, 0.2, 1),
        color=vector(i / num_steps, 0.6, 1 - i / num_steps),
        axis=vector(-sin(angle), 0, cos(angle)))

# 중심 기둥
cylinder(pos=vector(0, 0, 0),
         axis=vector(0, num_steps * 0.5, 0),
         radius=0.3,
         color=color.white,
         opacity=0.5)
```

### 도전 3: 연산 퀴즈 시각화

사용자에게 연산 문제를 내고, 정답을 3D로 보여주는 프로그램을 만들어 보세요!

```python
from vpython import *
from random import randint

# 랜덤 문제 생성
a = randint(1, 20)
b = randint(1, 10)

print(f"문제: {a} + {b} = ?")
answer = int(input("정답: "))
correct = a + b

# 정답을 3D로 시각화
if answer == correct:
    # 맞으면 초록 구를 correct 개만큼 원형으로 배치
    for i in range(correct):
        angle = 2 * pi * i / correct
        sphere(pos=vector(4 * cos(angle), 4 * sin(angle), 0),
               radius=0.3, color=color.green)
    label(pos=vector(0, 0, 0), text=f'정답! {a}+{b}={correct}', height=16)
else:
    # 틀리면 빨간 X 표시
    cylinder(pos=vector(-2, -2, 0), axis=vector(4, 4, 0),
             radius=0.1, color=color.red)
    cylinder(pos=vector(-2, 2, 0), axis=vector(4, -4, 0),
             radius=0.1, color=color.red)
    label(pos=vector(0, -4, 0),
          text=f'오답! 정답은 {correct}', height=16)
```

---

## 🔗 다음 장으로

이번 장에서 우리는 **연산으로 3D 세계를 설계하는 방법**을 배웠습니다.

**배운 것 정리**:
- `+`, `-`, `*`, `/`, `//`, `%`, `**` = 파이썬의 7가지 산술 연산자
- `cos`, `sin` = 원형 배치의 마법 주문
- `input()` + `int()` = 사용자에게 숫자 입력받기
- 수식 하나가 물체 여러 개의 위치를 결정한다

가장 중요한 깨달음은 이것입니다: **계산은 추상적인 숫자 놀이가 아니라, 눈에 보이는 3D 결과로 바로 연결됩니다.** `i * 3 - 6`이라는 수식이 5개 막대의 배치를 결정하고, `score / 100 * max_height`라는 수식이 막대의 높이를 결정합니다.

하지만 아직 한 가지 아쉬운 것이 있습니다. 물체를 배치하기만 했지, **움직이지는** 못했습니다. 공이 데굴데굴 굴러가게 하려면? 물체가 점점 커지게 하려면?

**다음 장 "움직여라! — 애니메이션의 원리"** 에서는 `rate()`와 `while` 루프로 물체를 움직이게 만듭니다. 코드로 만든 세상이 살아 움직이는 순간, 프로그래밍의 진짜 재미가 시작됩니다! 🎬

> 🌟 **오늘의 한마디**: 수학 수업에서 배운 연산이 여기서 이렇게 쓰인다니, 놀랍지 않나요? 수식은 차가운 숫자가 아닙니다 — 여러분의 상상을 3D로 바꿔주는 마법 주문입니다. 다음 시간에는 그 마법에 '움직임'까지 더해 봅시다!
