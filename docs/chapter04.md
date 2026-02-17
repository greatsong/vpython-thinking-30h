# Chapter 4: 변수 — 이름표를 붙여 기억하기

**Part 2: 변수와 움직임의 세계**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **변수에 값을 저장하고 활용**할 수 있다 — 숫자, 문자열, 물체까지!
- **물체를 변수에 담아 속성을 나중에 변경**할 수 있다 — 위치, 색상, 크기를 자유자재로
- **변수 이름 짓기 규칙을 이해하고 의미 있는 이름**을 사용할 수 있다 — 코드를 읽기 좋게

> 🖥️ **이번 시간에 만들 것**: 3D 신호등을 만듭니다. 빨간불, 노란불, 초록불을 변수에 저장하고, 변수를 통해 켜고 끄는 동작을 구현합니다. 변수의 힘으로 물체를 "기억"하고 "변경"하는 경험을 하게 됩니다!

---

## 💡 왜 이걸 배우나요?

### 이름이 없으면 불편한 세상

지금까지 우리는 이렇게 코드를 썼습니다.

```python
from vpython import *

sphere(pos=vector(0, 2, 0), color=color.red, radius=1)
```

빨간 공이 하나 만들어지죠. 그런데 문제가 있습니다. 이 공의 색을 나중에 파란색으로 바꾸고 싶다면? 위치를 옮기고 싶다면? **방법이 없습니다.** 공을 만들었지만, 그 공에게 이름을 붙이지 않았기 때문입니다.

실생활을 생각해 보세요. 교실에 학생이 30명 있는데 아무에게도 이름이 없다면? "야, 너!" 라고 해도 누구를 부르는지 알 수 없겠죠. 이름이 있어야 특정한 사람을 부르고, 그 사람에게 무언가를 시킬 수 있습니다.

프로그래밍에서 **변수(variable)**가 바로 그 이름표입니다. 물체에 이름을 붙이면, 언제든지 그 이름을 불러서 물체를 바꿀 수 있습니다. 이것이 "변수"를 배우는 이유입니다.

### 🧠 변수가 열어주는 새로운 가능성

변수를 배우면 이런 것이 가능해집니다.

- 공을 만든 뒤, **나중에** 색을 바꾸기
- 상자의 크기를 **점점** 키우기
- 여러 물체 중 **특정 물체만** 골라서 움직이기
- 계산 결과를 **저장해 두었다가** 다시 쓰기

이전 챕터까지는 물체를 "만들기만" 했다면, 이제부터는 물체를 "기억하고 조종"합니다. Part 2의 시작, **변수의 세계**에 오신 것을 환영합니다!

---

## 📚 핵심 개념

### 개념 1: 변수란 무엇인가?

**🎭 비유로 시작하기**

변수는 **이름표가 붙은 상자**입니다.

우체국을 떠올려 보세요. 사서함에는 번호가 적혀 있고, 그 안에 편지를 넣어 둘 수 있습니다. "123번 사서함에 넣어 줘" 라고 하면 편지가 보관되고, "123번 사서함에서 꺼내 줘"라고 하면 편지를 다시 받을 수 있습니다.

변수도 마찬가지입니다. 상자에 이름표를 붙이고(`x`), 값을 넣어 두면(`10`), 나중에 이름만 불러서(`x`) 그 값을 꺼내 쓸 수 있습니다.

**📖 정확한 정의**

변수란 **값을 저장하는 이름이 붙은 공간**입니다. `=` 기호를 사용하여 값을 저장(할당)하고, 이름을 통해 언제든 그 값에 접근할 수 있습니다.

**💻 예시로 확인하기**

```python
from vpython import *

# 변수에 숫자를 저장한다
x = 10

# 변수에 저장된 값을 사용하여 물체를 만든다
sphere(pos=vector(x, 0, 0), radius=1, color=color.red)
```

실행하면 빨간 공이 x 좌표 10 위치에 나타납니다. `x`라는 변수에 `10`을 저장하고, 그것을 `vector(x, 0, 0)`에서 사용한 것입니다.

> 📖 **파이썬 문법: 변수 선언과 할당 (`=`)**
>
> **형식**: `변수이름 = 값`
>
> **`=`의 의미**: 수학에서 `=`은 "같다"이지만, 파이썬에서 `=`은 **"오른쪽 값을 왼쪽 이름에 저장하라"** 는 명령입니다. 이것을 **할당(assignment)**이라고 합니다.
>
> **예시**
> - `radius = 1.5` — radius라는 이름에 1.5를 저장
> - `my_color = color.blue` — my_color라는 이름에 파란색을 저장
> - `ball = sphere()` — ball이라는 이름에 구 물체를 저장
>
> **핵심**: 파이썬에서는 변수를 미리 "선언"할 필요가 없습니다. 처음 `=`으로 값을 넣는 순간 자동으로 만들어집니다!

---

### 개념 2: 변수에 VPython 물체를 저장하기

**🎭 비유로 시작하기**

지금까지 우리는 3D 물체를 만들 때 이렇게 했습니다.

```python
sphere(color=color.red)
```

이것은 마치 "빨간 풍선을 만들어서 하늘에 날려보내는 것"과 같습니다. 풍선은 만들어졌지만, 손에 잡고 있는 줄이 없으니 다시 잡을 수 없습니다.

변수를 쓰면 **풍선에 줄을 매는 것**과 같습니다.

```python
my_balloon = sphere(color=color.red)
```

이제 `my_balloon`이라는 줄을 당기면 언제든 그 풍선을 조종할 수 있습니다!

**📖 정확한 정의**

VPython에서 물체를 생성할 때 변수에 할당하면, 그 변수를 통해 물체의 모든 속성(위치, 색상, 크기 등)에 접근하고 변경할 수 있습니다. `.`(점)을 사용하여 속성에 접근합니다.

**💻 예시로 확인하기**

```python
from vpython import *

# 변수에 물체를 저장한다 — 줄을 매는 것!
ball = sphere(pos=vector(0, 0, 0), color=color.red, radius=1)

# 변수를 통해 속성을 변경한다 — 줄을 당겨 조종!
ball.color = color.blue      # 색상을 파란색으로 변경
ball.pos = vector(3, 0, 0)   # 위치를 오른쪽으로 이동
ball.radius = 2              # 크기를 2배로 키움
```

실행하면 처음에 빨간 공이 중앙에 나타나지만, 바로 파란색으로 바뀌고, 오른쪽(x=3)으로 이동하며, 크기도 커집니다. 코드가 위에서 아래로 순식간에 실행되기 때문에, 최종 결과만 보입니다 — 파란색 큰 공이 오른쪽에 있는 모습입니다.

> 💡 **비교해 보세요**: 변수 없이 `sphere(color=color.red)`만 쓰면, 이 공의 색을 나중에 바꿀 방법이 없습니다. 변수에 담아야 조종할 수 있습니다!

---

### 개념 3: 변수 이름 짓기 규칙

**🎭 비유로 시작하기**

사람 이름에도 규칙이 있듯이(특수문자를 쓰지 않고, 숫자로 시작하지 않는 등), 변수 이름에도 지켜야 할 규칙이 있습니다. 그리고 규칙을 지키는 것 이상으로, **의미 있는 이름**을 짓는 것이 중요합니다.

`a`, `b`, `c`보다는 `ball`, `wall`, `speed`처럼 **이름만 봐도 무엇인지 알 수 있는** 이름이 좋은 이름입니다.

**📖 정확한 정의**

파이썬 변수 이름 규칙은 다음과 같습니다.

> 📖 **파이썬 문법: 변수 이름 규칙**
>
> **반드시 지켜야 하는 규칙 (어기면 오류!)**
> - 영문자(a-z, A-Z) 또는 밑줄(`_`)로 시작해야 한다
> - 숫자로 시작할 수 없다 (`3ball`은 불가, `ball3`은 가능)
> - 중간에는 영문자, 숫자, 밑줄만 사용 가능 (공백, 특수문자 불가)
> - 파이썬 예약어는 사용 불가 (`if`, `for`, `while`, `True`, `False` 등)
> - 대소문자를 구분한다 (`Ball`과 `ball`은 다른 변수!)
>
> **좋은 이름을 짓는 습관 (권장)**
> - 의미를 알 수 있는 이름: `x` 보다 `ball_x` 또는 `position`
> - 여러 단어는 밑줄로 연결: `my_ball`, `traffic_light`, `red_light`
> - 영어 소문자를 기본으로 사용

**💻 예시로 확인하기**

```python
from vpython import *

# ✅ 좋은 변수 이름 — 의미가 명확하다
red_ball = sphere(pos=vector(-3, 0, 0), color=color.red, radius=1)
blue_box = box(pos=vector(0, 0, 0), color=color.blue, size=vector(2, 2, 2))
green_pole = cylinder(pos=vector(3, -1, 0), color=color.green, radius=0.3, axis=vector(0, 2, 0))

# ❌ 나쁜 변수 이름 — 나중에 헷갈린다
# a = sphere(...)
# b = box(...)
# c = cylinder(...)
```

`red_ball`은 이름만 봐도 "빨간 공"이라는 것을 알 수 있습니다. 코드가 길어질수록 이런 좋은 이름이 빛을 발합니다.

---

### 개념 4: 변수에 다양한 값 저장하기

파이썬 변수에는 숫자뿐만 아니라 다양한 종류의 값을 저장할 수 있습니다.

> 📖 **파이썬 문법: 데이터 타입(type)**
>
> 파이썬에서 변수에 저장할 수 있는 대표적인 값의 종류입니다.
>
> **정수(int)**: 소수점이 없는 숫자
> - `count = 3`
> - `floor = -1`
>
> **실수(float)**: 소수점이 있는 숫자
> - `radius = 1.5`
> - `speed = 0.01`
>
> **문자열(str)**: 따옴표로 감싼 텍스트
> - `name = "traffic light"`
> - `message = '신호등'`
>
> **VPython 물체(object)**: 3D 물체 자체를 통째로 저장!
> - `ball = sphere()`
> - `wall = box()`
>
> **VPython 벡터(vector)**: 3D 좌표/방향
> - `start_pos = vector(0, 0, 0)`
> - `my_color = vector(1, 0.5, 0)` (주황색)
>
> 💡 파이썬은 변수에 값을 넣을 때 자동으로 타입을 결정합니다. 미리 "이 변수는 숫자입니다"라고 선언할 필요가 없습니다!

```python
from vpython import *

# 다양한 타입의 값을 변수에 저장
count = 3                         # 정수
ball_radius = 0.8                 # 실수
title = "My 3D Scene"             # 문자열
start_pos = vector(0, 2, 0)      # 벡터
ball = sphere(pos=start_pos, radius=ball_radius, color=color.yellow)  # 물체

# 변수를 활용하여 물체를 배치
for i in range(count):
    sphere(pos=vector(i * 2 - 2, -2, 0), radius=ball_radius, color=color.cyan)
```

실행하면 노란 공 1개가 위에, 하늘색 공 3개가 아래에 나란히 나타납니다. `count`, `ball_radius`, `start_pos` 같은 변수를 재사용하여 코드를 깔끔하게 만들었습니다.

---

## 🔨 따라하기

자, 이제 직접 해 봅시다! **3D 신호등**을 단계별로 만들어 보겠습니다.

### Step 1: 신호등 몸체 만들기

먼저 신호등의 기둥과 몸체(배경판)를 만듭니다.

```python
from vpython import *

# === WHAT: 신호등의 기둥과 배경판을 만든다 ===
# --- WHY: 변수에 물체를 저장하는 기본 패턴을 익히기 위해 ---

# 신호등 기둥 — 회색 원기둥
pole = cylinder(
    pos=vector(0, -3, 0),     # 아래쪽에서 시작
    axis=vector(0, 3, 0),     # 위쪽으로 3만큼 뻗음
    radius=0.2,
    color=vector(0.3, 0.3, 0.3)  # 짙은 회색
)

# 신호등 몸체 — 어두운 상자
body = box(
    pos=vector(0, 1.5, 0),    # 기둥 위에 위치
    size=vector(1.5, 4, 1),   # 세로로 긴 직사각형
    color=vector(0.15, 0.15, 0.15)  # 거의 검정
)
```

실행하면 회색 기둥 위에 어두운 직사각형 몸체가 보입니다. `pole`과 `body`라는 변수에 각각 저장했기 때문에, 나중에 이 물체들의 속성을 바꿀 수 있습니다.

> 🔑 **핵심 패턴**: `변수이름 = 물체(속성들...)` — 이 패턴이 변수 활용의 기본입니다!

---

### Step 2: 세 개의 신호등 불 만들기

이제 빨간불, 노란불, 초록불을 변수에 저장합니다.

```python
from vpython import *

# 신호등 기둥
pole = cylinder(
    pos=vector(0, -3, 0),
    axis=vector(0, 3, 0),
    radius=0.2,
    color=vector(0.3, 0.3, 0.3)
)

# 신호등 몸체
body = box(
    pos=vector(0, 1.5, 0),
    size=vector(1.5, 4, 1),
    color=vector(0.15, 0.15, 0.15)
)

# === WHAT: 세 개의 신호등 불(구)을 변수에 저장한다 ===
# --- WHY: 변수에 담아야 나중에 색상을 변경(켜기/끄기)할 수 있기 때문 ---

# 빨간불 — 맨 위
red_light = sphere(
    pos=vector(0, 2.5, 0.5),   # 몸체 앞쪽에 배치
    radius=0.4,
    color=color.red              # 처음에는 빨간색(켜진 상태)
)

# 노란불 — 가운데
yellow_light = sphere(
    pos=vector(0, 1.5, 0.5),
    radius=0.4,
    color=vector(0.3, 0.3, 0)   # 처음에는 어두운 노란색(꺼진 상태)
)

# 초록불 — 맨 아래
green_light = sphere(
    pos=vector(0, 0.5, 0.5),
    radius=0.4,
    color=vector(0, 0.3, 0)     # 처음에는 어두운 초록색(꺼진 상태)
)
```

실행하면 신호등 몸체 위에 세 개의 공이 세로로 배치됩니다. 빨간불만 밝게 빛나고, 나머지 두 개는 어둡습니다.

**여기서 주목할 점**:
- 세 개의 불을 각각 `red_light`, `yellow_light`, `green_light`라는 변수에 저장했습니다
- 이름만 봐도 어떤 불인지 바로 알 수 있죠!
- 변수에 저장했기 때문에, 다음 단계에서 색상을 바꿀 수 있습니다

---

### Step 3: 변수를 사용하여 신호등 바꾸기

이제 핵심입니다! 변수를 통해 물체의 속성을 변경합니다. 빨간불을 끄고 초록불을 켜 봅시다.

```python
from vpython import *

# 신호등 기둥
pole = cylinder(
    pos=vector(0, -3, 0),
    axis=vector(0, 3, 0),
    radius=0.2,
    color=vector(0.3, 0.3, 0.3)
)

# 신호등 몸체
body = box(
    pos=vector(0, 1.5, 0),
    size=vector(1.5, 4, 1),
    color=vector(0.15, 0.15, 0.15)
)

# 세 개의 불 — 처음에는 빨간불만 켜져 있음
red_light = sphere(pos=vector(0, 2.5, 0.5), radius=0.4, color=color.red)
yellow_light = sphere(pos=vector(0, 1.5, 0.5), radius=0.4, color=vector(0.3, 0.3, 0))
green_light = sphere(pos=vector(0, 0.5, 0.5), radius=0.4, color=vector(0, 0.3, 0))

# === WHAT: 변수를 통해 신호등의 상태를 변경한다 ===
# --- WHY: 변수에 물체를 저장하면 나중에 속성을 자유롭게 바꿀 수 있다는 것을 체험 ---

# ⏱️ 2초 대기 (빨간불 상태를 보여주기 위해)
from time import sleep
sleep(2)

# 🔴→🟡 빨간불 끄기, 노란불 켜기
red_light.color = vector(0.3, 0, 0)      # 빨간불 끔 (어둡게)
yellow_light.color = color.yellow         # 노란불 켬 (밝게)

sleep(1)

# 🟡→🟢 노란불 끄기, 초록불 켜기
yellow_light.color = vector(0.3, 0.3, 0)  # 노란불 끔 (어둡게)
green_light.color = color.green            # 초록불 켬 (밝게)
```

실행하면 놀라운 일이 벌어집니다!

1. 처음에 **빨간불**만 켜져 있다가
2. 2초 후 빨간불이 꺼지고 **노란불**이 켜지고
3. 1초 후 노란불이 꺼지고 **초록불**이 켜집니다

**변수의 마법**이 바로 이것입니다! `red_light.color = ...`처럼, 변수 이름 뒤에 `.속성`을 붙여서 물체의 상태를 언제든지 바꿀 수 있습니다.

> 💡 **핵심 깨달음**: 변수 없이 `sphere(color=color.red)`만 썼다면, 이 색을 나중에 바꿀 방법이 없었을 것입니다. 변수에 저장했기 때문에 `red_light.color = ...`로 조종이 가능한 것입니다!

---

## 📝 전체 코드

이 장에서 만든 **3D 신호등**의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *
from time import sleep

# === WHAT: 3D 신호등을 만들고, 변수를 통해 빨강→노랑→초록으로 전환한다 ===
# --- WHY: 변수에 물체를 저장하면 속성을 자유롭게 변경할 수 있다는 핵심 개념 체험 ---

# 🎬 장면 설정
scene.background = vector(0.1, 0.1, 0.2)  # 어두운 파란 배경 (밤 느낌)

# 🏗️ 신호등 구조물
pole = cylinder(
    pos=vector(0, -3, 0),
    axis=vector(0, 3, 0),
    radius=0.2,
    color=vector(0.3, 0.3, 0.3)
)

body = box(
    pos=vector(0, 1.5, 0),
    size=vector(1.5, 4, 1),
    color=vector(0.15, 0.15, 0.15)
)

# 💡 세 개의 신호등 불 — 변수에 저장!
red_light = sphere(pos=vector(0, 2.5, 0.5), radius=0.4, color=color.red)
yellow_light = sphere(pos=vector(0, 1.5, 0.5), radius=0.4, color=vector(0.3, 0.3, 0))
green_light = sphere(pos=vector(0, 0.5, 0.5), radius=0.4, color=vector(0, 0.3, 0))

# 🛣️ 바닥 (도로 느낌)
road = box(
    pos=vector(0, -3.1, 0),
    size=vector(12, 0.1, 6),
    color=vector(0.2, 0.2, 0.2)
)

# 🔴 빨간불 상태 (2초간 유지)
sleep(2)

# 🟡 노란불로 전환
red_light.color = vector(0.3, 0, 0)      # 빨간불 끔
yellow_light.color = color.yellow         # 노란불 켬
sleep(1)

# 🟢 초록불로 전환
yellow_light.color = vector(0.3, 0.3, 0)  # 노란불 끔
green_light.color = color.green            # 초록불 켬
sleep(2)

# 🟡 다시 노란불
green_light.color = vector(0, 0.3, 0)     # 초록불 끔
yellow_light.color = color.yellow         # 노란불 켬
sleep(1)

# 🔴 다시 빨간불
yellow_light.color = vector(0.3, 0.3, 0)  # 노란불 끔
red_light.color = color.red               # 빨간불 켬
```

**실행하면 이런 장면이 보입니다**: 어두운 밤하늘 배경에 신호등이 서 있고, 빨간불 → 노란불 → 초록불 → 노란불 → 빨간불 순서로 신호가 바뀝니다. 변수에 저장된 물체의 색상을 `.color`로 바꾸는 것만으로 신호등이 "작동"합니다!

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 컴퓨팅 사고력의 근육을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하면 최종적으로 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 코드를 한 줄씩 따라가 보세요!

```python
from vpython import *

a = sphere(pos=vector(-2, 0, 0), color=color.red, radius=1)
b = sphere(pos=vector(2, 0, 0), color=color.blue, radius=1)

a.pos = vector(2, 0, 0)
b.pos = vector(-2, 0, 0)

a.color = color.blue
b.color = color.red

a.radius = 0.5
```

**생각해 볼 것**:
- 처음에 `a`와 `b`는 각각 어디에, 어떤 색으로 만들어지나요?
- `a.pos`와 `b.pos`를 바꾸면 어떻게 되나요?
- `a.color`과 `b.color`을 바꾸면?
- 마지막에 `a.radius`만 바꿨습니다. `b`의 크기는?
- 최종적으로 두 공의 위치, 색상, 크기는 어떻게 되나요?

<details>
<summary>🔑 정답 확인하기</summary>

코드를 한 줄씩 추적해 봅시다.

**1단계**: `a` = 빨간 공(왼쪽, 반지름 1), `b` = 파란 공(오른쪽, 반지름 1)

**2단계**: 위치를 교환 → `a`가 오른쪽으로, `b`가 왼쪽으로 이동

**3단계**: 색상을 교환 → `a`가 파란색으로, `b`가 빨간색으로 변경

**4단계**: `a`의 반지름만 0.5로 변경. `b`는 그대로 1

**최종 결과**:
- **왼쪽(x=-2)**: 빨간색 큰 공(반지름 1) — 변수 `b`
- **오른쪽(x=2)**: 파란색 작은 공(반지름 0.5) — 변수 `a`

핵심 포인트: 처음 위치와 색이 완전히 뒤바뀌었습니다! 변수를 통해 속성을 하나씩 바꾸면, 원래 물체의 모습이 완전히 달라질 수 있습니다. 코드를 위에서 아래로 **순서대로** 추적하는 것이 핵심입니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐)

> **문제**: 아래와 같은 장면을 만드는 코드를 작성해 보세요. **변수를 사용하여** 물체를 만들어야 합니다!

**장면 설명**:
- **눈사람**이 서 있습니다
- 몸통: 흰색 큰 구(아래쪽, y=-1, 반지름 1.2)
- 가슴: 흰색 중간 구(가운데, y=0.8, 반지름 0.9)
- 머리: 흰색 작은 구(위쪽, y=2.2, 반지름 0.6)
- 코: 주황색 원기둥(머리에서 앞쪽으로 튀어나옴, 반지름 0.1)
- **그런데!** 눈사람을 만든 후, 변수를 이용하여 머리의 색을 **하늘색(cyan)**으로 바꾸세요
- 그리고 코의 색을 **빨간색(red)**으로 바꾸세요

**힌트**:
- 물체를 만들 때 반드시 변수에 저장하세요 (예: `head = sphere(...)`)
- 색을 바꾸려면 `변수.color = 새로운색` 패턴을 사용하세요

<details>
<summary>💡 힌트 더 보기</summary>

- 구 3개 + 원기둥 1개 = 총 4개의 변수 필요
- 코 원기둥의 `pos`는 머리 위치에서 약간 앞쪽(z 방향)
- 코 원기둥의 `axis`는 앞쪽으로 뻗는 방향: `vector(0, 0, 1)`

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

# 눈사람 만들기 — 각 부분을 변수에 저장
body_bottom = sphere(pos=vector(0, -1, 0), radius=1.2, color=color.white)
body_middle = sphere(pos=vector(0, 0.8, 0), radius=0.9, color=color.white)
head = sphere(pos=vector(0, 2.2, 0), radius=0.6, color=color.white)
nose = cylinder(pos=vector(0, 2.2, 0.6), axis=vector(0, 0, 0.8), radius=0.1, color=color.orange)

# 변수를 이용하여 속성 변경!
head.color = color.cyan   # 머리를 하늘색으로
nose.color = color.red    # 코를 빨간색으로
```

핵심 포인트: 물체를 변수에 저장했기 때문에, 만든 **후에** 색을 바꿀 수 있었습니다. 만약 `sphere(...)` 만 쓰고 변수에 담지 않았다면, 나중에 색을 바꿀 방법이 없습니다. 이것이 변수의 핵심 가치입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: 변수를 활용하여 **"변신하는 물체"**를 만들어 보세요!

**조건**:
- 물체를 최소 **2개** 만들고, 각각 변수에 저장하세요
- 만든 후에 변수를 사용하여 **속성을 3번 이상** 변경하세요 (색상, 위치, 크기 등)
- `from time import sleep`과 `sleep(초)`를 사용하면 변화 과정을 눈으로 볼 수 있습니다
- 정답은 없습니다! 자유롭게 만들어 보세요

**아이디어가 안 떠오른다면**:
- 🌅 **해 뜨는 장면**: 노란 공(해)을 만들고, 위치를 점점 위로 올리면서 색을 주황→노랑으로 변경
- 🎈 **풍선 불기**: 작은 공을 만들고, `radius`를 점점 키워서 풍선이 부풀어 오르는 모습
- 🏠 **집 꾸미기**: 상자(벽)와 원뿔(지붕)을 만든 뒤, 벽 색을 여러 번 바꿔보기
- 🚦 **나만의 신호등**: 배운 것을 응용하여 가로형 신호등이나 보행자 신호등 만들기

<details>
<summary>🔑 예시 답안: 해 뜨는 장면</summary>

```python
from vpython import *
from time import sleep

# 배경을 밤색으로 설정
scene.background = vector(0.05, 0.05, 0.15)

# 바다
sea = box(pos=vector(0, -2, 0), size=vector(20, 0.5, 10), color=vector(0, 0.1, 0.3))

# 태양 — 작고 붉은 상태에서 시작
sun = sphere(pos=vector(0, -1, -3), radius=0.8, color=vector(0.8, 0.2, 0))

# 수평선 위로 태양이 떠오른다
sleep(1)
sun.pos = vector(0, 0, -3)          # 위치를 위로
sun.color = vector(1, 0.4, 0)       # 좀 더 밝은 주황색
sun.radius = 1.0                     # 약간 커짐

sleep(1)
sun.pos = vector(0, 1, -3)          # 더 위로
sun.color = vector(1, 0.7, 0.1)     # 주황→노랑으로
sun.radius = 1.2

sleep(1)
sun.pos = vector(0, 2.5, -3)        # 하늘 높이
sun.color = vector(1, 1, 0.3)       # 밝은 노란색
sun.radius = 1.5                     # 가장 크게

# 배경도 밝아진다
scene.background = vector(0.4, 0.6, 0.9)  # 밝은 하늘색
sea.color = vector(0, 0.3, 0.7)           # 바다도 밝아짐
```

이것은 하나의 예시일 뿐입니다. 여러분만의 "변신" 장면을 만들어 보세요!

</details>

---

## ⚠️ 자주 하는 실수

프로그래밍을 처음 하면 누구나 실수합니다. 아래는 변수를 배울 때 가장 흔한 실수와 해결법입니다.

**실수 1: 변수에 저장하지 않고 속성을 바꾸려 함**

```python
# ❌ 변수에 저장하지 않았으므로 나중에 바꿀 수 없다!
from vpython import *
sphere(color=color.red)
# 이 공의 색을 바꾸고 싶은데... 방법이 없다!
```

```python
# ✅ 변수에 저장하면 나중에 속성을 바꿀 수 있다
from vpython import *
ball = sphere(color=color.red)
ball.color = color.blue  # 이제 바꿀 수 있다!
```

> 물체를 나중에 조종하고 싶다면, **반드시** 변수에 저장하세요!

**실수 2: `=`과 `==`을 혼동함**

```python
# ❌ = 하나는 "저장하라"는 뜻이지, "같다"가 아닙니다!
from vpython import *
x = 5     # x에 5를 저장 (할당)
# x == 5  # x가 5인지 비교 (나중에 if문에서 배움)
```

> `=` 하나 = 저장(할당), `==` 두 개 = 비교. 지금은 `=`(저장)만 기억하면 됩니다!

**실수 3: 숫자로 시작하는 변수 이름**

```python
# ❌ 숫자로 시작하면 오류!
from vpython import *
3ball = sphere(color=color.red)
# SyntaxError: invalid syntax
```

```python
# ✅ 영문자나 밑줄로 시작해야 합니다
from vpython import *
ball3 = sphere(color=color.red)     # 숫자가 뒤에 오는 것은 OK
_ball = sphere(color=color.blue)    # 밑줄로 시작도 OK
```

> 변수 이름은 영문자 또는 밑줄(`_`)로 시작해야 합니다!

**실수 4: `.`(점)을 빠뜨리고 속성에 접근**

```python
# ❌ 점(.)을 빠뜨리면 오류!
from vpython import *
ball = sphere(color=color.red)
ball color = color.blue   # SyntaxError!
```

```python
# ✅ 변수와 속성 사이에 점(.)을 찍어야 합니다
from vpython import *
ball = sphere(color=color.red)
ball.color = color.blue   # 정상 작동!
```

> `변수.속성`의 `.`은 "~의"라는 뜻입니다. `ball.color`는 "ball의 color(색상)"입니다.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **변수란 무엇인지 한 문장으로 설명할 수 있나요?** → 값을 저장하는 이름이 붙은 공간
- [ ] **`ball = sphere(color=color.red)`에서 `=`의 역할을 알고 있나요?** → 오른쪽 값을 왼쪽 이름에 저장(할당)
- [ ] **변수에 저장된 물체의 색을 바꿀 수 있나요?** → `ball.color = color.blue` 처럼 `.속성`으로 접근
- [ ] **올바른 변수 이름과 잘못된 변수 이름을 구분할 수 있나요?** → `my_ball` (O), `3ball` (X), `for` (X)
- [ ] **변수에 저장하지 않은 물체를 나중에 바꿀 수 있나요?** → 불가능! 반드시 변수에 저장해야 함
- [ ] **신호등 코드에서 불이 바뀌는 원리를 설명할 수 있나요?** → 변수.color를 밝은색/어두운색으로 변경

> 💪 체크가 4개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 변수로 물체 바꿔치기 실험

변수에는 새로운 값을 덮어쓸 수 있습니다. 이런 코드를 실행하면 어떻게 될까요?

```python
from vpython import *

# x에 빨간 공을 저장
x = sphere(pos=vector(-2, 0, 0), color=color.red, radius=1)

# x에 파란 상자를 새로 저장 (빨간 공은 어떻게 될까?)
x = box(pos=vector(2, 0, 0), color=color.blue, size=vector(1, 1, 1))

# 이제 x를 조종하면 어떤 물체가 바뀔까?
x.color = color.green
```

> 🔎 실행해 보고, 빨간 공은 사라지는지 남아있는지, 초록색으로 바뀌는 것은 어떤 물체인지 관찰해 보세요! 변수에 새로운 값을 넣으면 이전 "이름표"가 떨어져 나간다는 것을 느낄 수 있습니다.

### 도전 2: 가로형 신호등 만들기

배운 것을 응용하여, 가로로 배치된 신호등을 만들어 보세요!

```python
from vpython import *
from time import sleep

# 가로형 신호등 몸체
body = box(pos=vector(0, 0, 0), size=vector(4, 1.5, 1), color=vector(0.15, 0.15, 0.15))

# 불 세 개를 가로로 배치 (y는 같고 x만 다르게)
red_light = sphere(pos=vector(-1.2, 0, 0.5), radius=0.4, color=color.red)
yellow_light = sphere(pos=vector(0, 0, 0.5), radius=0.4, color=vector(0.3, 0.3, 0))
green_light = sphere(pos=vector(1.2, 0, 0.5), radius=0.4, color=vector(0, 0.3, 0))

# 여기에 신호등 전환 코드를 직접 작성해 보세요!
# sleep()과 변수.color를 활용하세요
```

### 도전 3: 변수로 "이사" 시키기

물체를 여러 위치로 이동시키는 실험을 해 보세요.

```python
from vpython import *
from time import sleep

# 공을 만들고 변수에 저장
traveler = sphere(pos=vector(-4, 0, 0), color=color.yellow, radius=0.5, make_trail=True)

# 위치를 하나씩 바꾸며 이동 (궤적이 남음!)
sleep(0.5)
traveler.pos = vector(-2, 1, 0)

sleep(0.5)
traveler.pos = vector(0, 2, 0)

sleep(0.5)
traveler.pos = vector(2, 1, 0)

sleep(0.5)
traveler.pos = vector(4, 0, 0)
```

> 🔎 `make_trail=True`를 추가하면 물체가 이동한 자취가 선으로 그려집니다! `pos`를 바꿀 때마다 궤적이 남는 모습을 관찰해 보세요.

---

## 🔗 다음 장으로

이번 장에서 우리는 프로그래밍의 핵심 개념 **변수**를 배웠습니다.

**배운 것 정리**:
- 변수 = 값을 저장하는 이름이 붙은 공간
- `=`는 "저장하라"(할당)는 뜻
- `ball = sphere(...)` — 물체를 변수에 저장
- `ball.color = color.blue` — 변수를 통해 속성 변경
- 좋은 변수 이름은 의미가 명확하다 (`red_light` > `a`)

변수 덕분에 물체를 "기억"하고 "조종"할 수 있게 되었습니다. 하지만 지금은 위치를 직접 숫자로 하나씩 적어 넣고 있죠. 만약 물체를 규칙적으로 배치하고 싶다면? 예를 들어, 공을 10개 일렬로 놓고 싶은데 좌표를 하나씩 직접 쓰는 건 너무 힘들겠죠?

**다음 장 "연산과 수식 — 물체를 계산으로 배치하기"** 에서는 사칙연산과 수식을 사용하여 물체의 위치와 크기를 **계산**으로 정하는 방법을 배웁니다. 숫자를 직접 쓰는 대신, 계산을 시키는 거죠! 🧮

> 🌟 **오늘의 한마디**: 변수는 프로그래밍의 기초 중의 기초입니다. 오늘 배운 `변수 = 값`, `변수.속성 = 새값` 패턴은 앞으로 매 챕터마다 사용됩니다. 이 패턴이 손에 익었다면, 여러분은 이미 프로그래머의 사고방식을 갖추기 시작한 것입니다!
