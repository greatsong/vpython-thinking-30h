# Chapter 10: for 반복문 — 100개의 별을 한 번에

**Part 4: 반복과 패턴의 마법**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **for 반복문으로 같은 작업을 여러 번 수행**할 수 있다 — 코드 한 줄로 100개의 물체를 만들기
- **range() 함수를 활용하여 반복 횟수를 제어**할 수 있다 — 원하는 만큼 정확하게 반복하기
- **반복문으로 규칙적인 패턴(격자, 원형, 나선)을 생성**할 수 있다 — 수학과 코드의 아름다운 만남

> 🖥️ **이번 시간에 만들 것**: for 반복문으로 100개의 빛나는 별을 밤하늘에 뿌리고, 원형으로 배치된 행성계를 만들고, 나선형 은하까지 코드 몇 줄로 완성합니다. "복사-붙여넣기 100번"은 이제 잊으세요!

---

## 💡 왜 이걸 배우나요?

### 복사-붙여넣기의 한계

여러분이 밤하늘을 만들고 싶다고 상상해 보세요. 별이 100개 필요합니다. 지금까지 배운 방법으로는 이렇게 해야 합니다.

```python
from vpython import *

sphere(pos=vector(1, 2, 0), radius=0.1, color=color.white)
sphere(pos=vector(3, 5, 0), radius=0.1, color=color.white)
sphere(pos=vector(-2, 4, 0), radius=0.1, color=color.white)
# ... 이것을 100번 반복?! 😱
```

100줄을 복사-붙여넣기 하겠습니까? 만약 1000개가 필요하다면? 10000개라면?

**프로그래머는 반복 작업을 직접 하지 않습니다.** 컴퓨터에게 "이것을 100번 해"라고 명령합니다. 그 명령이 바로 **for 반복문**입니다.

### 🧠 컴퓨팅 사고력: 패턴 인식

반복문을 배우면 **패턴 인식(Pattern Recognition)** 능력이 급성장합니다. "이 100개의 물체가 어떤 규칙으로 배치되어 있는가?"를 파악하고, 그 규칙을 코드 한 줄로 표현하는 것 — 이것이 바로 프로그래머의 눈입니다.

복사기를 떠올려 보세요. 종이 한 장을 넣으면 똑같은 복사본을 100장이든 1000장이든 만들어 줍니다. for 반복문은 **코드 세계의 복사기**입니다. 단, 이 복사기는 더 똑똑해서 매번 조금씩 다르게 복사할 수도 있습니다!

---

## 📚 핵심 개념

### 개념 1: for 반복문 — 코드의 복사기

**🎭 비유로 시작하기**

체육 시간에 선생님이 "운동장을 5바퀴 돌아라!"라고 하면, 여러분은 같은 트랙을 5번 반복해서 뜁니다. 선생님은 한 번만 말했지만 여러분은 5번 행동합니다.

for 반복문도 같습니다. 코드를 한 번만 작성하면, 컴퓨터가 원하는 횟수만큼 반복 실행합니다.

> 📖 **파이썬 문법: for 반복문**
>
> **기본 형태**:
> ```python
> for 변수 in range(횟수):
>     반복할 코드
> ```
>
> **핵심 규칙**:
> - `for` — "~동안 반복해"라는 키워드
> - `변수` — 현재 몇 번째인지 알려주는 카운터 (보통 `i` 사용)
> - `in range(횟수)` — 몇 번 반복할지 지정
> - `:` (콜론) — 반드시 for 줄 끝에 붙일 것!
> - **들여쓰기** — 반복할 코드는 **반드시 4칸 들여쓰기** (스페이스바 4번 또는 Tab 1번)
>
> **예시**:
> ```python
> for i in range(3):
>     print(i)
> # 출력: 0, 1, 2
> ```
> `i`는 0부터 시작해서 2까지, 총 3번 반복합니다.

**💻 VPython에서 확인하기**

```python
from vpython import *

# 공 5개를 한 줄로 배치!
for i in range(5):
    sphere(pos=vector(i * 2, 0, 0), radius=0.5, color=color.cyan)
```

실행하면 공 5개가 x축을 따라 일렬로 나란히 나타납니다. `i`가 0, 1, 2, 3, 4로 변하면서 각 공의 x 위치가 0, 2, 4, 6, 8이 됩니다. 코드는 2줄인데, 물체는 5개!

---

### 개념 2: range() 함수 — 반복의 리모컨

**🎭 비유로 시작하기**

TV 리모컨의 채널 버튼을 떠올려 보세요. "1번부터 10번까지 돌려봐"라고 하면 10개 채널을 순서대로 볼 수 있습니다. `range()`는 반복문의 리모컨입니다. 어디서 시작하고, 어디서 끝나고, 몇 칸씩 건너뛸지를 조종합니다.

> 📖 **파이썬 문법: range() 함수**
>
> **사용법 3가지**:
>
> - `range(끝)` — 0부터 끝-1까지
>   - `range(5)` → 0, 1, 2, 3, 4
>
> - `range(시작, 끝)` — 시작부터 끝-1까지
>   - `range(2, 7)` → 2, 3, 4, 5, 6
>
> - `range(시작, 끝, 간격)` — 시작부터 끝-1까지, 간격만큼 건너뛰며
>   - `range(0, 10, 2)` → 0, 2, 4, 6, 8
>   - `range(10, 0, -1)` → 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
>
> **주의**: 끝 값은 포함되지 않습니다! `range(5)`는 5를 포함하지 않고 0~4입니다.

**💻 VPython에서 확인하기**

```python
from vpython import *

# range의 세 가지 사용법을 눈으로 확인!

# range(5): 0, 1, 2, 3, 4 → 빨간 공 5개
for i in range(5):
    sphere(pos=vector(i, 2, 0), radius=0.3, color=color.red)

# range(2, 7): 2, 3, 4, 5, 6 → 초록 공 5개 (x=2부터 시작)
for i in range(2, 7):
    sphere(pos=vector(i, 0, 0), radius=0.3, color=color.green)

# range(0, 10, 2): 0, 2, 4, 6, 8 → 파란 공 5개 (짝수 위치에만)
for i in range(0, 10, 2):
    sphere(pos=vector(i, -2, 0), radius=0.3, color=color.blue)
```

세 줄의 빨간, 초록, 파란 공이 각각 다른 규칙으로 배치됩니다. 같은 `range()`인데 인자(argument)에 따라 완전히 다른 패턴이 만들어지는 것을 확인해 보세요!

---

### 개념 3: 중첩 for문 — 격자 만들기

**🎭 비유로 시작하기**

바둑판을 떠올려 보세요. 가로 19줄, 세로 19줄이 교차하면서 361개의 점이 만들어집니다. "가로로 한 줄 찍고, 한 칸 내려가서 다시 가로로 한 줄 찍고..." 이렇게 반복하면 격자가 완성됩니다.

이것을 코드로 표현하면? **for문 안에 for문**을 넣습니다!

> 📖 **파이썬 문법: 중첩 for문 (nested for)**
>
> **기본 형태**:
> ```python
> for x in range(가로개수):
>     for y in range(세로개수):
>         # (x, y) 위치에 무언가 하기
> ```
>
> **동작 원리**:
> - 바깥 for문이 한 번 돌 때마다, 안쪽 for문이 처음부터 끝까지 **전부** 돕니다
> - `range(3)` × `range(3)` = 총 9번 실행 (3 × 3)
> - `range(5)` × `range(5)` = 총 25번 실행 (5 × 5)
>
> **주의**: 안쪽 for문의 들여쓰기는 **8칸** (4칸 + 4칸)입니다!

**💻 VPython에서 확인하기**

```python
from vpython import *

# 5×5 격자 만들기
for x in range(5):
    for y in range(5):
        sphere(pos=vector(x, y, 0), radius=0.3, color=color.yellow)
```

실행하면 5행 5열, 총 25개의 노란 공이 바둑판처럼 배치됩니다. 코드는 겨우 3줄인데 물체는 25개! 만약 `range(5)`를 `range(10)`으로 바꾸면? 100개가 됩니다!

---

### 개념 4: 반복 변수(loop variable) 활용하기

**🎭 비유로 시작하기**

복사기에 비유했던 for 반복문을 기억하시죠? 그런데 이 복사기는 매우 똑똑합니다. 매 복사본마다 **페이지 번호를 자동으로 바꿔** 줄 수 있습니다. 1쪽, 2쪽, 3쪽... 이렇게요.

반복 변수 `i`가 바로 그 페이지 번호입니다. `i` 값이 매번 달라지기 때문에, 이것을 활용하면 "비슷하지만 조금씩 다른" 물체를 만들 수 있습니다.

**💻 VPython에서 확인하기**

```python
from vpython import *

# i를 활용해서 크기가 점점 커지는 공
for i in range(10):
    sphere(
        pos=vector(i * 1.5, 0, 0),
        radius=0.2 + i * 0.1,         # i가 클수록 반지름이 커짐
        color=vector(i/10, 0, 1-i/10)  # 보라→빨강 그라데이션
    )
```

왼쪽부터 오른쪽으로 갈수록 공이 커지면서 색상도 보라색에서 빨간색으로 변합니다. `i`라는 하나의 변수를 위치, 크기, 색상에 모두 활용한 것입니다!

---

## 🔨 따라하기

자, 이제 직접 해 봅시다! 한 줄 배치부터 시작해서 원형 배치까지, 단계별로 진행합니다.

### Step 1: 한 줄로 10개의 가로등 세우기 🏮

가로등을 만들어 봅시다. 기둥(cylinder) 위에 빛나는 공(sphere)을 올리면 가로등이 됩니다.

```python
from vpython import *

# 배경을 어둡게
scene.background = color.black

# 바닥
box(pos=vector(9, -0.1, 0), size=vector(22, 0.2, 4), color=vector(0.2, 0.2, 0.2))

# 가로등 10개를 한 줄로!
for i in range(10):
    x_pos = i * 2  # 가로등 사이 간격: 2

    # 기둥
    cylinder(
        pos=vector(x_pos, 0, 0),
        axis=vector(0, 3, 0),
        radius=0.08,
        color=vector(0.5, 0.5, 0.5)
    )

    # 전구 (빛나는 구)
    sphere(
        pos=vector(x_pos, 3, 0),
        radius=0.25,
        color=color.yellow,
        emissive=True  # 자체 발광!
    )
```

**실행 결과**: 어두운 배경 위에 10개의 가로등이 일렬로 서 있습니다. `emissive=True` 덕분에 전구가 스스로 빛나는 것처럼 보입니다.

**코드 분석**:
- `for i in range(10)` — i가 0부터 9까지, 총 10번 반복
- `x_pos = i * 2` — 가로등 간격이 2씩 벌어짐 (0, 2, 4, 6, ..., 18)
- for문 안에 cylinder와 sphere가 함께 있으므로, 매 반복마다 기둥과 전구가 한 쌍씩 생성됩니다

---

### Step 2: 격자로 체스판 만들기 ♟️

중첩 for문으로 8×8 체스판을 만들어 봅시다. 체스판의 핵심은 흑백이 번갈아 나타나는 패턴입니다.

```python
from vpython import *

scene.background = vector(0.3, 0.2, 0.1)

# 8×8 체스판
for x in range(8):
    for z in range(8):
        # 흑백 번갈아 배치: (x+z)가 짝수면 흰색, 홀수면 검정
        if (x + z) % 2 == 0:
            tile_color = color.white
        else:
            tile_color = vector(0.15, 0.15, 0.15)

        box(
            pos=vector(x, 0, z),
            size=vector(0.95, 0.1, 0.95),
            color=tile_color
        )
```

**실행 결과**: 흰색과 검정이 번갈아 나타나는 8×8 체스판이 완성됩니다!

**핵심 트릭**: `(x + z) % 2`가 0이면 짝수 칸(흰색), 1이면 홀수 칸(검정)입니다. `%`는 나머지 연산자인데, 이전 장에서 배운 if문과 결합하면 이렇게 패턴을 만들 수 있습니다.

---

### Step 3: 원형으로 행성계 만들기 🪐

원형 배치에는 삼각함수(`sin`, `cos`)가 필요합니다. 처음 보면 어렵게 느껴질 수 있지만, 패턴만 기억하면 됩니다!

> 📖 **파이썬 문법: 원형 배치 공식**
>
> ```python
> from math import sin, cos, pi
>
> for i in range(개수):
>     angle = 2 * pi * i / 개수
>     x = 반지름 * cos(angle)
>     y = 반지름 * sin(angle)
> ```
>
> **원리**:
> - `2 * pi` = 원 한 바퀴 (360도를 라디안으로)
> - `i / 개수` = 전체 원에서 현재 위치의 비율
> - `cos(angle)` = x좌표, `sin(angle)` = y좌표
>
> 이 공식을 외울 필요는 없습니다. **"원형 배치할 때는 이 패턴을 쓴다"** 는 것만 기억하세요!

```python
from vpython import *
from math import sin, cos, pi

scene.background = color.black

# 태양
sun = sphere(pos=vector(0, 0, 0), radius=1.5, color=color.yellow, emissive=True)

# 태양 주위에 8개의 행성을 원형 배치
planet_colors = [
    vector(0.6, 0.6, 0.6),  # 수성 (회색)
    vector(0.9, 0.7, 0.3),  # 금성 (노란주황)
    vector(0.2, 0.5, 1.0),  # 지구 (파란)
    vector(0.9, 0.3, 0.2),  # 화성 (빨간)
    vector(0.8, 0.6, 0.4),  # 목성 (갈색)
    vector(0.9, 0.8, 0.5),  # 토성 (연한노랑)
    vector(0.5, 0.8, 0.9),  # 천왕성 (연한파랑)
    vector(0.3, 0.4, 0.9),  # 해왕성 (진한파랑)
]

for i in range(8):
    angle = 2 * pi * i / 8
    distance = 4 + i * 1.2       # 바깥으로 갈수록 멀어짐
    x = distance * cos(angle)
    z = distance * sin(angle)

    # 행성
    sphere(
        pos=vector(x, 0, z),
        radius=0.3 + i * 0.05,
        color=planet_colors[i]
    )

    # 궤도 (얇은 링)
    ring(
        pos=vector(0, 0, 0),
        axis=vector(0, 1, 0),
        radius=distance,
        thickness=0.02,
        color=vector(0.3, 0.3, 0.3)
    )
```

**실행 결과**: 가운데 빛나는 태양 주위로 8개의 행성이 원형으로 배치되고, 각 행성의 궤도가 회색 링으로 표시됩니다.

**코드 분석**:
- `planet_colors` — 리스트(list)에 색상을 미리 담아두고 `planet_colors[i]`로 꺼내 씁니다
- `distance = 4 + i * 1.2` — 안쪽 행성부터 바깥으로 점점 멀어짐
- `cos(angle)`과 `sin(angle)` — 원형 배치의 마법 공식

---

## 📝 전체 코드

이 장의 하이라이트! for 반복문의 진짜 힘을 보여주는 **100개의 별이 빛나는 밤하늘 + 나선 은하** 전체 코드입니다.

```python
from vpython import *
from math import sin, cos, pi
import random

# === WHAT: 나선 은하와 별이 빛나는 밤하늘 만들기 ===
# --- WHY: for 반복문으로 수백 개의 물체를 한 번에 생성하는 힘을 체험 ---

scene.background = color.black
scene.caption = "🌌 나선 은하 — for 반복문의 힘!"

# --- 1단계: 은하 중심 ---
sphere(
    pos=vector(0, 0, 0),
    radius=0.8,
    color=color.yellow,
    emissive=True
)

# --- 2단계: 나선 팔(spiral arm) 생성 ---
# 나선 2개를 만들어 은하 모양 구현
for arm in range(2):
    arm_offset = pi * arm  # 두 번째 팔은 180도 반대편

    for i in range(150):
        t = i * 0.04                           # 나선 진행 정도
        r = 1 + t * 8                          # 중심에서의 거리 (점점 멀어짐)
        angle = t * 4 * pi + arm_offset        # 회전 각도

        x = r * cos(angle) + random.uniform(-0.5, 0.5)
        y = random.uniform(-0.3, 0.3)          # 약간의 두께
        z = r * sin(angle) + random.uniform(-0.5, 0.5)

        # 중심에 가까울수록 밝고 노란색, 멀수록 어둡고 파란색
        brightness = max(0.2, 1 - t * 0.1)
        star_color = vector(brightness, brightness * 0.9, brightness * 0.7)

        sphere(
            pos=vector(x, y, z),
            radius=0.08 + random.uniform(0, 0.05),
            color=star_color,
            emissive=True
        )

# --- 3단계: 배경 별 100개 ---
for i in range(100):
    sphere(
        pos=vector(
            random.uniform(-30, 30),
            random.uniform(-20, 20),
            random.uniform(-30, 30)
        ),
        radius=0.04,
        color=color.white,
        emissive=True
    )
```

**실행 결과**: 화면 가운데에 나선형 은하가 나타나고, 주변에 100개의 작은 별이 반짝입니다. 마우스로 카메라를 돌려보면 은하의 입체적인 구조를 확인할 수 있습니다.

**핵심 포인트**:
- 바깥 for문(`for arm in range(2)`)이 나선 팔 2개를 만듭니다
- 안쪽 for문(`for i in range(150)`)이 각 팔에 150개의 별을 만듭니다
- 별도의 for문으로 배경 별 100개를 추가합니다
- 총 물체 수: 1(중심) + 300(나선 팔) + 100(배경) = **401개!** 코드는 겨우 30줄 남짓입니다

> 💡 `random.uniform(a, b)`는 a와 b 사이의 랜덤 숫자를 만듭니다. 이것 덕분에 별들이 딱딱한 선이 아니라 자연스럽게 흩어져 보입니다.

---

## 🧠 사고력 챌린지

---

### 🔍 코드 → 결과 예측 (⭐⭐⭐)

> **문제**: 아래 코드를 실행하면 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 먼저 그려 보세요!

```python
from vpython import *

for i in range(5):
    for j in range(5):
        if i == j:
            sphere(pos=vector(i, j, 0), radius=0.4, color=color.red)
        elif i + j == 4:
            sphere(pos=vector(i, j, 0), radius=0.4, color=color.blue)
        else:
            sphere(pos=vector(i, j, 0), radius=0.2, color=color.white)
```

**생각해 볼 것**:
- 전체 공은 몇 개인가요? (5 × 5 = ?)
- `i == j`인 경우는 어디인가요? (좌표를 나열해 보세요)
- `i + j == 4`인 경우는 어디인가요?
- 빨간 공과 파란 공은 어떤 모양을 이루나요?
- 두 조건이 동시에 만족하는 점이 있나요?

<details>
<summary>🔑 정답 확인하기</summary>

총 25개의 공이 5×5 격자에 배치됩니다.

**빨간 공 (i == j)**: (0,0), (1,1), (2,2), (3,3), (4,4) → **왼쪽 아래에서 오른쪽 위로 가는 대각선** 5개

**파란 공 (i + j == 4)**: (0,4), (1,3), (3,1), (4,0) → **왼쪽 위에서 오른쪽 아래로 가는 대각선** 4개

**핵심**: (2,2)에서 두 조건이 동시에 만족합니다(i==j이면서 i+j==4). `elif`이므로 `i == j`가 먼저 검사되어 **빨간 공**이 됩니다. 따라서 파란 공은 4개입니다.

전체 모양은 **X자(엑스)**입니다! 빨간 대각선과 파란 대각선이 교차하며, 나머지는 작은 흰 공으로 채워집니다.

핵심 포인트: for문의 변수 `i`, `j`를 조건문(`if`)과 결합하면 격자 안에서 패턴을 만들 수 있습니다. 이것이 **패턴 인식**과 **조건 분기**의 결합입니다!

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래와 같은 장면을 만드는 코드를 작성해 보세요.

**장면 설명**:
- **정삼각형 모양**으로 공이 배치되어 있습니다 (볼링 핀 배치처럼)
- 1행: 공 1개 (맨 앞)
- 2행: 공 2개
- 3행: 공 3개
- 4행: 공 4개
- 5행: 공 5개 (맨 뒤)
- 총 15개의 공, 모두 빨간색, 반지름 0.4
- 각 행은 y축 방향으로 1씩 간격, 공 사이 간격도 1
- 각 행의 공들은 가운데 정렬 (첫 행의 공이 정중앙)

**힌트**:
- 행 번호를 `row`라고 하면, row행에는 `row + 1`개의 공이 필요합니다
- 가운데 정렬하려면 각 행의 시작 x좌표를 `- row / 2`로 하면 됩니다

<details>
<summary>💡 힌트 더 보기</summary>

- 바깥 for문: `for row in range(5)` — 5개 행
- 안쪽 for문: `for col in range(row + 1)` — 현재 행 번호 + 1개의 공
- x좌표: `col - row / 2` (가운데 정렬)
- y좌표: `-row` (아래로 내려가면서)

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

# 볼링 핀 삼각형 배치
for row in range(5):
    for col in range(row + 1):
        x = col - row / 2  # 가운데 정렬
        y = -row            # 아래로 내려감

        sphere(
            pos=vector(x, y, 0),
            radius=0.4,
            color=color.red
        )

# 바닥 장식
box(pos=vector(0, -5.5, 0), size=vector(8, 0.1, 2), color=vector(0.6, 0.4, 0.2))
```

핵심 포인트: `range(row + 1)`은 매 행마다 반복 횟수가 달라집니다. 0행→1번, 1행→2번, ... 4행→5번. 이렇게 **바깥 변수(row)를 안쪽 range의 인자로 사용**하면 삼각형, 피라미드 같은 패턴을 만들 수 있습니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: for 반복문과 원형 배치 공식을 활용하여 **꽃** 모양을 만들어 보세요!

**요구 사항**:
- 가운데에 노란색 원(꽃의 중심) 1개
- 중심 주변에 **꽃잎** 6~8개가 원형으로 배치
- 꽃잎은 타원체(ellipsoid)나 구(sphere)로 표현
- 아래에 초록색 원기둥(줄기) 1개
- 색상은 자유롭게 선택!

**참고할 원형 배치 패턴**:
```python
from math import sin, cos, pi
for i in range(개수):
    angle = 2 * pi * i / 개수
    x = 반지름 * cos(angle)
    y = 반지름 * sin(angle)
```

<details>
<summary>🔑 예시 답안: 해바라기</summary>

```python
from vpython import *
from math import sin, cos, pi

scene.background = vector(0.5, 0.8, 1)  # 하늘색 배경

# 줄기
cylinder(
    pos=vector(0, -4, 0),
    axis=vector(0, 3.5, 0),
    radius=0.15,
    color=vector(0.2, 0.6, 0.1)
)

# 꽃잎 8장 (원형 배치)
for i in range(8):
    angle = 2 * pi * i / 8
    px = 1.5 * cos(angle)
    py = 1.5 * sin(angle)

    ellipsoid(
        pos=vector(px, py, 0),
        length=1.5,
        height=0.7,
        width=0.3,
        color=vector(1, 0.85, 0),  # 황금색 꽃잎
        axis=vector(cos(angle), sin(angle), 0)  # 꽃잎이 바깥을 향하도록
    )

# 꽃 중심 (갈색)
sphere(pos=vector(0, 0, 0), radius=0.8, color=vector(0.5, 0.3, 0.1))

# 잎사귀 2장
for side in [-1, 1]:
    ellipsoid(
        pos=vector(side * 0.8, -2, 0),
        length=1.2,
        height=0.5,
        width=0.2,
        color=vector(0.2, 0.7, 0.1),
        axis=vector(side, 1, 0)
    )
```

이것은 하나의 예시입니다. 꽃잎의 수, 색상, 크기를 바꾸면 장미, 튤립, 코스모스 등 다양한 꽃을 표현할 수 있습니다. 여러분만의 꽃을 만들어 보세요!

</details>

---

## ⚠️ 자주 하는 실수

프로그래밍에서 반복문은 강력한 만큼, 실수도 잘 일어나는 영역입니다. 아래는 가장 흔한 실수들입니다.

**실수 1: 들여쓰기를 빠뜨림**

```python
# ❌ 들여쓰기가 없으면 오류!
for i in range(5):
sphere(pos=vector(i, 0, 0), radius=0.5)
# IndentationError: expected an indented block
```

```python
# ✅ for 안의 코드는 반드시 4칸 들여쓰기
for i in range(5):
    sphere(pos=vector(i, 0, 0), radius=0.5)
```

> 파이썬에서 들여쓰기는 장식이 아닙니다. **"이 코드는 for문에 속한다"** 는 것을 알려주는 문법입니다. 콜론(`:`) 다음 줄은 반드시 들여쓰기!

**실수 2: 콜론(`:`)을 빠뜨림**

```python
# ❌ for 줄 끝에 콜론이 없으면 오류!
for i in range(5)
    sphere(pos=vector(i, 0, 0), radius=0.5)
# SyntaxError: expected ':'
```

```python
# ✅ for 줄 끝에는 반드시 콜론!
for i in range(5):
    sphere(pos=vector(i, 0, 0), radius=0.5)
```

**실수 3: range의 끝값 혼동**

```python
# ❌ range(5)는 5를 포함하지 않음!
for i in range(5):
    print(i)
# 출력: 0, 1, 2, 3, 4 (5가 아님!)
```

```python
# ✅ 5까지 포함하려면 range(6)을 사용
for i in range(6):
    print(i)
# 출력: 0, 1, 2, 3, 4, 5
```

> `range(n)`은 **0부터 n-1까지**입니다. n개의 숫자를 만들지만, n 자체는 포함하지 않습니다. 이것은 파이썬의 일관된 규칙이니 꼭 기억하세요!

**실수 4: 중첩 for문에서 변수 이름 겹침**

```python
# ❌ 바깥과 안쪽 for문이 같은 변수 i를 사용!
for i in range(5):
    for i in range(5):      # i가 덮어씌워짐!
        sphere(pos=vector(i, i, 0), radius=0.3)
# 격자가 아니라 대각선만 만들어짐
```

```python
# ✅ 서로 다른 변수 이름 사용
for x in range(5):
    for y in range(5):
        sphere(pos=vector(x, y, 0), radius=0.3)
```

> 중첩 for문에서는 **바깥 변수와 안쪽 변수의 이름을 다르게** 하세요. 보통 `x, y` 또는 `i, j` 또는 `row, col`을 사용합니다.

**실수 5: for문 안에 넣을 코드를 밖에 씀**

```python
# ❌ sphere가 for문 밖에 있음 → 1개만 생성됨
for i in range(10):
    x_pos = i * 2
sphere(pos=vector(x_pos, 0, 0), radius=0.5)
# x_pos는 마지막 값(18)만 사용됨 → 공 1개
```

```python
# ✅ sphere도 for문 안에 넣어야 10개 생성
for i in range(10):
    x_pos = i * 2
    sphere(pos=vector(x_pos, 0, 0), radius=0.5)
```

> 들여쓰기가 맞는지 항상 확인하세요. for문 안에서 반복하고 싶은 코드는 **모두 같은 깊이로 들여쓰기** 되어야 합니다.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **`for i in range(10):`이 무엇을 하는지 설명할 수 있나요?** → i를 0부터 9까지 바꾸면서 아래 코드를 10번 반복 실행합니다
- [ ] **`range(5)`가 만드는 숫자를 나열할 수 있나요?** → 0, 1, 2, 3, 4
- [ ] **`range(2, 8, 2)`가 만드는 숫자를 나열할 수 있나요?** → 2, 4, 6
- [ ] **중첩 for문이 왜 필요한지 설명할 수 있나요?** → 격자(2차원)처럼 두 방향으로 반복이 필요할 때 사용합니다
- [ ] **for문의 변수 `i`를 활용하여 물체의 크기나 색상을 변화시킬 수 있나요?** → `radius=0.1*i`, `color=vector(i/10, 0, 0)` 등으로 가능합니다
- [ ] **원형 배치 공식(`cos`, `sin`)을 참고해서 물체를 원형으로 배치할 수 있나요?** → 공식을 외울 필요 없이, 패턴을 복사해서 수정할 수 있으면 됩니다

> 💪 체크가 4개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 피보나치 나선 🌻

해바라기 씨앗은 피보나치 수열의 규칙으로 배치됩니다. 황금각(137.5도)을 사용하면 자연의 아름다운 패턴을 재현할 수 있습니다.

```python
from vpython import *
from math import sin, cos, pi, sqrt

scene.background = color.black

golden_angle = pi * (3 - sqrt(5))  # 황금각 ≈ 137.5도

for i in range(300):
    r = 0.5 * sqrt(i)                   # 거리: 제곱근으로 점점 넓어짐
    angle = i * golden_angle             # 매번 황금각만큼 회전

    x = r * cos(angle)
    y = r * sin(angle)

    # 중심에서 멀수록 색상 변화
    t = i / 300
    sphere(
        pos=vector(x, y, 0),
        radius=0.15 + t * 0.1,
        color=vector(0.8 * t, 0.4, 0.2 * (1 - t)),
        emissive=True
    )
```

> 실행해 보세요! 해바라기 씨앗과 같은 나선 패턴이 나타납니다. `300`을 `500`, `1000`으로 바꿔보면 더 큰 해바라기가 됩니다.

### 도전 2: 3D 프랙탈 나무 🌳

나무는 자기 자신을 반복하는 구조(프랙탈)입니다. 큰 가지에서 작은 가지가 나오고, 작은 가지에서 더 작은 가지가 나옵니다.

```python
from vpython import *
from math import sin, cos, pi
import random

scene.background = vector(0.5, 0.8, 1.0)

# 바닥
box(pos=vector(0, -0.1, 0), size=vector(20, 0.2, 20), color=vector(0.3, 0.6, 0.2))

def draw_branch(start, direction, length, thickness, depth):
    """가지를 그리고, 끝에서 새 가지를 재귀적으로 생성"""
    if depth <= 0 or length < 0.1:
        # 끝 가지에는 잎사귀(초록 공)
        sphere(pos=start + direction * length, radius=0.3, color=vector(0.1, 0.7, 0.2))
        return

    # 가지 그리기
    branch_color = vector(0.4, 0.25, 0.1) if depth > 2 else vector(0.3, 0.5, 0.15)
    cylinder(pos=start, axis=direction * length, radius=thickness, color=branch_color)

    end = start + direction * length

    # 두 갈래로 나누기
    for side in [-1, 1]:
        spread = 0.4 + random.uniform(-0.1, 0.1)
        new_dir = vector(
            direction.x + side * spread,
            direction.y + random.uniform(-0.1, 0.2),
            direction.z + random.uniform(-0.2, 0.2)
        ).norm()

        draw_branch(end, new_dir, length * 0.7, thickness * 0.6, depth - 1)

# 나무 시작!
draw_branch(
    start=vector(0, 0, 0),
    direction=vector(0, 1, 0),
    length=3,
    thickness=0.2,
    depth=5
)
```

> 이 코드에는 **재귀(recursion)** 라는 고급 개념이 사용됩니다. 함수가 자기 자신을 호출하는 것인데, 아직 배우지 않았으니 "이런 것도 가능하구나!" 정도로 감상하세요. depth 값을 바꾸면 나무의 복잡도가 달라집니다.

### 도전 3: 원하는 패턴 도전 ✨

for 반복문으로 만들 수 있는 패턴은 무한합니다! 아래 중 하나를 골라 도전해 보세요.

- **DNA 이중나선**: 두 개의 나선이 사다리처럼 연결된 구조
- **계단**: 상자를 점점 높이 쌓아 올라가는 나선형 계단
- **무지개**: 반원 모양으로 7가지 색상의 공을 배치
- **도시 야경**: 다양한 높이의 상자(빌딩)를 격자로 배치하고 꼭대기에 빛나는 구 추가

---

## 🔗 다음 장으로

이번 장에서 우리는 for 반복문의 엄청난 힘을 경험했습니다.

**배운 것 정리**:
- `for i in range(n):` — 같은 코드를 n번 반복 실행
- `range(시작, 끝, 간격)` — 반복 범위를 세밀하게 제어
- 중첩 for문 — 격자, 체스판 같은 2차원 패턴 생성
- 반복 변수 `i` 활용 — 크기, 색상, 위치를 점진적으로 변화
- `cos`, `sin` — 원형/나선형 패턴의 마법 공식

for 반복문 하나로 별 100개, 은하 400개의 별, 피보나치 나선까지 만들었습니다. 코드 몇 줄이 수백 개의 물체를 만들어내는 경험은 프로그래밍의 진짜 매력을 느끼게 해 줍니다.

그런데 잠깐, 지금까지 만든 반복 패턴은 모두 **처음에 정해진 횟수만큼** 반복했습니다. 만약 "특정 조건이 될 때까지 계속 반복"하고 싶다면? 예를 들어, 공이 벽에 닿을 때까지 계속 움직이게 하려면?

**다음 장 "리스트와 반복 — 물체들을 기억하고 다루기"** 에서는 반복문으로 만든 수많은 물체들을 리스트(list)에 저장하고, 나중에 다시 꺼내어 움직이고 변형하는 방법을 배웁니다. 정적인 패턴에서 동적인 시뮬레이션으로 한 걸음 더 나아갑니다! 🚀

> 🌟 **오늘의 한마디**: 프로그래머의 진짜 힘은 "같은 일을 반복하지 않는 것"입니다. for 반복문을 배운 여러분은 이제 100줄짜리 코드를 3줄로 줄일 수 있는 마법사입니다. 이 마법을 어디에 쓸지는 여러분의 상상력에 달려 있습니다!
