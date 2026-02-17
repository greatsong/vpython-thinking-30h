# Chapter 2: 좌표의 비밀 — 3D 공간 이해하기

**Part 1: 3D 세계에 첫 발을 내딛다**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **x, y, z 좌표계의 의미를 이해**하고 물체를 원하는 위치에 정확히 배치할 수 있다
- **`vector(x, y, z)`를 사용**하여 위치와 크기를 자유자재로 지정할 수 있다
- **3D 공간에서 방향을 좌표로 표현**할 수 있다 — 위/아래/앞/뒤/좌/우

> ⛄ **이번 시간에 만들 것**: 눈사람! `sphere` 3개를 y축 위로 차곡차곡 쌓아 올려 귀여운 눈사람을 완성합니다. 눈, 코, 팔까지 붙이면서 좌표 감각을 몸에 익힙니다.

---

## 💡 왜 이걸 배우나요?

### 좌표 — 3D 세계의 주소

지난 시간에 우리는 `sphere()`, `box()`, `cylinder()`로 물체를 만들었습니다. 그런데 한 가지 불편한 점이 있었죠. 물체가 어디에 나타날지 정확히 제어하기 어려웠습니다. `pos=vector(3, 0, 0)`이라고 쓰면 오른쪽으로 간다는 것은 알겠는데... 정확히 얼마나? 그리고 왜 숫자가 세 개나 필요한 걸까요?

**좌표계는 3D 세계의 주소 체계**입니다.

현실 세계에서 "서울시 강남구 역삼동 123번지"라고 하면 정확한 위치를 알 수 있듯이, 3D 세계에서는 `vector(3, 2, -1)`이라고 하면 정확한 위치를 알 수 있습니다. 주소를 모르면 택배를 보낼 수 없듯이, 좌표를 모르면 물체를 원하는 곳에 놓을 수 없습니다.

### 🧠 이번 장의 사고력 훈련 포인트

이번 장에서 여러분은 이런 사고력을 훈련합니다.

- **공간 추론**: "이 좌표에 물체를 놓으면 어디에 보일까?" 머릿속으로 3D 공간을 그리는 능력
- **분해**: 눈사람이라는 복잡한 형태를 "몸통 + 배 + 머리 + 눈 + 코 + 팔"로 쪼개는 능력
- **추상화**: 현실의 방향(위, 아래, 왼쪽...)을 숫자(+y, -y, -x...)로 변환하는 능력

---

## 📚 핵심 개념

### 개념 1: 3D 좌표계 — 교실 자리 번호의 확장

**🎭 비유로 시작하기**

교실에서 자리를 찾는 상황을 떠올려 봅시다.

> 선생님: "3번째 줄, 2번째 자리에 앉아."

이 한마디로 교실의 정확한 위치를 알 수 있습니다. 여기엔 숫자 두 개면 충분합니다 — "줄"과 "자리". 이것이 **2D 좌표**입니다.

그런데 만약 이 학교가 5층짜리 건물이라면?

> 선생님: "**3층**, 3번째 줄, 2번째 자리에 앉아."

이제 숫자가 **세 개** 필요합니다 — "층", "줄", "자리". 이것이 바로 **3D 좌표**입니다! 현실 세계는 3차원이니까, 위치를 정확히 표현하려면 항상 숫자 세 개가 필요합니다.

**📖 정확한 정의**

VPython의 3D 좌표계에서 숫자 세 개는 각각 이런 의미입니다.

- **x축** — 좌우 방향
  - x가 **양수(+)** → 오른쪽
  - x가 **음수(-)** → 왼쪽
  - x가 0 → 정가운데

- **y축** — 위아래 방향
  - y가 **양수(+)** → 위쪽
  - y가 **음수(-)** → 아래쪽
  - y가 0 → 정가운데

- **z축** — 앞뒤 방향
  - z가 **양수(+)** → 화면 앞쪽 (나를 향해 다가오는 방향)
  - z가 **음수(-)** → 화면 뒤쪽 (나에게서 멀어지는 방향)
  - z가 0 → 정가운데

**💻 눈으로 확인하기**

아래 코드를 실행하면 좌표축을 직접 볼 수 있습니다.

```python
from vpython import *

# x축 — 빨간색 화살표 (좌우)
arrow(pos=vector(0, 0, 0), axis=vector(5, 0, 0), color=color.red, shaftwidth=0.1)

# y축 — 초록색 화살표 (위아래)
arrow(pos=vector(0, 0, 0), axis=vector(0, 5, 0), color=color.green, shaftwidth=0.1)

# z축 — 파란색 화살표 (앞뒤)
arrow(pos=vector(0, 0, 0), axis=vector(0, 0, 5), color=color.blue, shaftwidth=0.1)

# 원점에 작은 공 (기준점)
sphere(pos=vector(0, 0, 0), radius=0.2, color=color.white)
```

실행하면 원점(0, 0, 0)에서 세 방향으로 화살표가 뻗어나가는 것이 보입니다. 마우스 오른쪽 버튼으로 화면을 돌려보세요. 세 축이 서로 직각으로 만나는 것을 확인할 수 있습니다.

> 💡 **기억법**: **RGB = XYZ** — 빨간색(Red)이 x, 초록색(Green)이 y, 파란색(Blue)이 z입니다. 이 색상-축 대응은 3D 프로그래밍의 국제 표준입니다!

---

### 개념 2: vector — 3D 위치를 담는 그릇

**🎭 비유로 시작하기**

편지를 보내려면 봉투에 주소를 써야 합니다. "서울시, 강남구, 역삼동"처럼 세 가지 정보를 하나로 묶죠.

`vector`도 마찬가지입니다. x, y, z 세 개의 숫자를 하나로 묶어 "3D 주소"를 만들어 줍니다. `vector(3, 2, -1)`이라고 쓰면 "오른쪽으로 3, 위로 2, 뒤로 1"이라는 위치가 됩니다.

**📖 정확한 정의**

`vector(x, y, z)`는 VPython에서 **3차원 공간의 한 점을 나타내는 자료형**입니다. 위치(`pos`), 크기(`size`), 방향(`axis`) 등을 지정할 때 모두 사용됩니다.

> 📖 **파이썬 문법: 함수와 인자**
>
> `vector(3, 2, -1)`에서 `vector`는 **함수(function)**입니다. 괄호 안의 `3, 2, -1`은 함수에 전달하는 **인자(argument)**입니다.
>
> ```python
> vector(3, 2, -1)
> #       ↑  ↑   ↑
> #       x  y   z  ← 세 개의 인자
> ```
>
> 함수란 "특정 작업을 수행하는 명령 묶음"입니다. `vector()`는 "세 숫자를 받아서 3D 좌표를 만들어라"라는 명령이고, `sphere()`는 "공을 만들어라"라는 명령입니다.
>
> 인자가 여러 개일 때는 **쉼표(`,`)**로 구분합니다. 순서가 중요합니다 — 첫 번째가 x, 두 번째가 y, 세 번째가 z입니다.

**💻 예시로 확인하기**

```python
from vpython import *

# 같은 크기의 공 5개를 서로 다른 위치에 배치
sphere(pos=vector(0, 0, 0), radius=0.5, color=color.white)    # 원점 (정가운데)
sphere(pos=vector(3, 0, 0), radius=0.5, color=color.red)      # 오른쪽
sphere(pos=vector(-3, 0, 0), radius=0.5, color=color.blue)    # 왼쪽
sphere(pos=vector(0, 3, 0), radius=0.5, color=color.green)    # 위쪽
sphere(pos=vector(0, -3, 0), radius=0.5, color=color.yellow)  # 아래쪽
```

실행하면 흰색 공을 중심으로 빨강(오른쪽), 파랑(왼쪽), 초록(위), 노랑(아래)이 십자(+) 모양으로 배치됩니다. `vector`의 숫자를 바꾸면 공의 위치가 달라진다는 것을 눈으로 확인할 수 있습니다.

---

### 개념 3: 방향을 좌표로 말하기

**🎭 비유로 시작하기**

일상에서 우리는 "위로", "오른쪽으로", "앞으로"라는 말을 자연스럽게 씁니다. 3D 좌표계에서는 이런 말을 **숫자**로 바꿔야 합니다. 처음에는 낯설지만, 패턴을 알면 금방 익숙해집니다.

**📖 방향-좌표 변환 규칙**

일상 언어를 좌표로 바꾸는 방법을 정리합니다.

- **오른쪽** → x를 **증가**(양수 방향) → 예: `vector(2, 0, 0)`
- **왼쪽** → x를 **감소**(음수 방향) → 예: `vector(-2, 0, 0)`
- **위쪽** → y를 **증가**(양수 방향) → 예: `vector(0, 3, 0)`
- **아래쪽** → y를 **감소**(음수 방향) → 예: `vector(0, -3, 0)`
- **앞쪽** (나를 향해) → z를 **증가**(양수 방향) → 예: `vector(0, 0, 1)`
- **뒤쪽** (나에게서 멀리) → z를 **감소**(음수 방향) → 예: `vector(0, 0, -1)`

두 방향을 동시에 쓸 수도 있습니다.

- **오른쪽 위** → x와 y를 모두 증가 → 예: `vector(2, 3, 0)`
- **왼쪽 아래** → x와 y를 모두 감소 → 예: `vector(-2, -3, 0)`

**💻 예시로 확인하기**

```python
from vpython import *

# 기준점 (원점)
sphere(pos=vector(0, 0, 0), radius=0.3, color=color.white)

# 6방향에 공 배치 — 모든 방향 확인!
sphere(pos=vector(4, 0, 0), radius=0.5, color=color.red)      # 오른쪽
sphere(pos=vector(-4, 0, 0), radius=0.5, color=color.red)     # 왼쪽
sphere(pos=vector(0, 4, 0), radius=0.5, color=color.green)    # 위쪽
sphere(pos=vector(0, -4, 0), radius=0.5, color=color.green)   # 아래쪽
sphere(pos=vector(0, 0, 4), radius=0.5, color=color.blue)     # 앞쪽
sphere(pos=vector(0, 0, -4), radius=0.5, color=color.blue)    # 뒤쪽

# 화살표로 방향 표시
arrow(pos=vector(0,0,0), axis=vector(4,0,0), color=color.red, shaftwidth=0.05)
arrow(pos=vector(0,0,0), axis=vector(-4,0,0), color=color.red, shaftwidth=0.05)
arrow(pos=vector(0,0,0), axis=vector(0,4,0), color=color.green, shaftwidth=0.05)
arrow(pos=vector(0,0,0), axis=vector(0,-4,0), color=color.green, shaftwidth=0.05)
arrow(pos=vector(0,0,0), axis=vector(0,0,4), color=color.blue, shaftwidth=0.05)
arrow(pos=vector(0,0,0), axis=vector(0,0,-4), color=color.blue, shaftwidth=0.05)
```

실행 후 마우스로 화면을 돌려보세요. 빨간 공 2개는 좌우로, 초록 공 2개는 위아래로, 파란 공 2개는 앞뒤로 배치된 것을 확인할 수 있습니다. 이것이 3D 좌표계의 6가지 기본 방향입니다!

> 📖 **파이썬 문법: 키워드 인자(keyword argument)**
>
> `sphere(pos=vector(3, 0, 0), color=color.red, radius=0.5)`에서 `pos=`, `color=`, `radius=`처럼 **이름=값** 형태로 쓰는 것을 **키워드 인자**라고 합니다.
>
> ```python
> sphere(pos=vector(3, 0, 0), color=color.red, radius=0.5)
> #      ↑                    ↑                 ↑
> #      키워드 인자 1          키워드 인자 2       키워드 인자 3
> ```
>
> 키워드 인자의 장점은 **순서를 바꿔도 괜찮다**는 것입니다.
>
> ```python
> # 아래 두 줄은 완전히 같은 결과를 만듭니다!
> sphere(pos=vector(0,0,0), color=color.red, radius=1)
> sphere(radius=1, color=color.red, pos=vector(0,0,0))
> ```
>
> 이름이 붙어 있으니, 파이썬이 어떤 값이 어떤 속성인지 알 수 있기 때문입니다.

---

## 🔨 따라하기

자, 이제 핵심 개념을 배웠으니 **눈사람 만들기** 프로젝트를 시작합시다! 단계별로 따라 하면서 좌표 감각을 손에 익혀 봅시다.

### Step 1: 몸통 3개 쌓기 — y좌표로 수직 배치

눈사람의 기본 구조는 간단합니다. 큰 공(몸통) 위에 중간 공(배), 그 위에 작은 공(머리)을 올리면 됩니다. 핵심은 **y좌표**를 적절히 조절하여 공들이 자연스럽게 쌓이도록 하는 것입니다.

```python
from vpython import *

# 몸통 — 가장 크고, 가장 아래에
body = sphere(pos=vector(0, 0, 0), radius=1.5, color=color.white)

# 배 — 중간 크기, 몸통 위에
belly = sphere(pos=vector(0, 2.2, 0), radius=1.0, color=color.white)

# 머리 — 가장 작고, 가장 위에
head = sphere(pos=vector(0, 3.7, 0), radius=0.7, color=color.white)
```

**코드 분석**:

- 세 공 모두 **x=0, z=0**입니다. 좌우나 앞뒤로 치우치지 않고 정중앙에 수직으로 쌓입니다.
- **y값만 다릅니다**: 0 → 2.2 → 3.7, 점점 위로 올라갑니다.
- **radius(반지름)가 점점 작아집니다**: 1.5 → 1.0 → 0.7, 아래가 크고 위가 작은 눈사람 형태입니다.

> 🤔 **왜 y값이 0, 2.2, 3.7일까?** 공과 공이 자연스럽게 닿으려면, 아래 공의 중심 + 아래 공의 반지름 + 위 공의 반지름 정도로 y를 설정하면 됩니다. 몸통(반지름 1.5) + 배(반지름 1.0) = 2.5인데, 살짝 겹쳐 보이도록 2.2로 했습니다. 이런 식으로 숫자를 조절하는 것을 **미세 조정**이라고 합니다.

> 📖 **파이썬 문법: 변수(variable)**
>
> `body = sphere(...)` 에서 `body`는 **변수**입니다. 변수란 "값에 붙이는 이름표"입니다.
>
> ```python
> body = sphere(pos=vector(0, 0, 0), radius=1.5, color=color.white)
> # ↑      ↑
> # 이름표  만들어진 물체
> ```
>
> 이렇게 이름을 붙여 두면 나중에 `body`라고 쓰기만 해도 이 물체를 가리킬 수 있습니다. 예를 들어 `body.color = color.blue`라고 하면 몸통 색이 파란색으로 바뀝니다.
>
> 변수 이름 규칙:
> - 영어 소문자로 시작 (관례)
> - 띄어쓰기 대신 밑줄(`_`) 사용: `left_eye`, `right_arm`
> - 의미가 드러나는 이름을 사용: `body`(몸통), `head`(머리)

---

### Step 2: 눈, 코, 팔 붙이기 — x, z 좌표 활용

머리에 눈(검은 공 2개), 코(주황 원뿔 1개), 그리고 양팔(나뭇가지 원기둥 2개)을 붙여 봅시다. 이제 x좌표와 z좌표도 본격적으로 사용합니다!

```python
from vpython import *

# === 몸체 (Step 1에서 만든 것) ===
body = sphere(pos=vector(0, 0, 0), radius=1.5, color=color.white)
belly = sphere(pos=vector(0, 2.2, 0), radius=1.0, color=color.white)
head = sphere(pos=vector(0, 3.7, 0), radius=0.7, color=color.white)

# === 눈 — 머리 앞쪽에 검은 공 2개 ===
left_eye = sphere(pos=vector(-0.25, 3.9, 0.55), radius=0.08, color=color.black)
right_eye = sphere(pos=vector(0.25, 3.9, 0.55), radius=0.08, color=color.black)

# === 코 — 주황색 원뿔 (당근코!) ===
nose = cone(pos=vector(0, 3.65, 0.6), axis=vector(0, 0, 0.8),
            radius=0.1, color=color.orange)

# === 팔 — 나뭇가지 (갈색 원기둥 2개) ===
left_arm = cylinder(pos=vector(-1.0, 2.2, 0), axis=vector(-1.5, 0.8, 0),
                    radius=0.05, color=vector(0.55, 0.27, 0.07))
right_arm = cylinder(pos=vector(1.0, 2.2, 0), axis=vector(1.5, 0.8, 0),
                     radius=0.05, color=vector(0.55, 0.27, 0.07))
```

**좌표 해석 연습**:

- **왼쪽 눈** `vector(-0.25, 3.9, 0.55)`:  x=-0.25(살짝 왼쪽), y=3.9(머리 높이), z=0.55(앞쪽으로 나옴)
- **오른쪽 눈** `vector(0.25, 3.9, 0.55)`: x=+0.25(살짝 오른쪽), 나머지는 왼쪽 눈과 같음
- **코** `vector(0, 3.65, 0.6)`: x=0(정가운데), y=3.65(눈보다 살짝 아래), z=0.6(앞으로 나옴)
- **왼팔 시작점** `vector(-1.0, 2.2, 0)`: 배의 왼쪽 옆에서 시작
- **왼팔 방향** `axis=vector(-1.5, 0.8, 0)`: 왼쪽으로 뻗으면서(x=-1.5) 살짝 위로(y=0.8)

> 💡 **좌우 대칭 만들기 팁**: 왼쪽과 오른쪽을 대칭으로 만들 때는 **x값의 부호만 반대**로 바꾸면 됩니다. 왼쪽 눈이 x=-0.25이면, 오른쪽 눈은 x=+0.25. 팔도 마찬가지입니다!

---

### Step 3: 모자와 바닥 추가 — 완성!

마지막으로 모자(검은 원기둥 + 검은 원기둥)와 눈 덮인 바닥(흰 상자)을 추가해서 작품을 완성합시다.

```python
from vpython import *

# === 몸체 ===
body = sphere(pos=vector(0, 0, 0), radius=1.5, color=color.white)
belly = sphere(pos=vector(0, 2.2, 0), radius=1.0, color=color.white)
head = sphere(pos=vector(0, 3.7, 0), radius=0.7, color=color.white)

# === 눈 ===
left_eye = sphere(pos=vector(-0.25, 3.9, 0.55), radius=0.08, color=color.black)
right_eye = sphere(pos=vector(0.25, 3.9, 0.55), radius=0.08, color=color.black)

# === 코 (당근) ===
nose = cone(pos=vector(0, 3.65, 0.6), axis=vector(0, 0, 0.8),
            radius=0.1, color=color.orange)

# === 팔 (나뭇가지) ===
left_arm = cylinder(pos=vector(-1.0, 2.2, 0), axis=vector(-1.5, 0.8, 0),
                    radius=0.05, color=vector(0.55, 0.27, 0.07))
right_arm = cylinder(pos=vector(1.0, 2.2, 0), axis=vector(1.5, 0.8, 0),
                     radius=0.05, color=vector(0.55, 0.27, 0.07))

# === 모자 ===
# 모자 챙 (넓고 납작한 원기둥)
hat_brim = cylinder(pos=vector(0, 4.2, 0), axis=vector(0, 0.08, 0),
                    radius=0.9, color=color.black)
# 모자 윗부분 (좁고 긴 원기둥)
hat_top = cylinder(pos=vector(0, 4.28, 0), axis=vector(0, 0.8, 0),
                   radius=0.55, color=color.black)

# === 단추 (배에 3개) ===
button1 = sphere(pos=vector(0, 2.7, 0.95), radius=0.08, color=color.black)
button2 = sphere(pos=vector(0, 2.2, 1.0), radius=0.08, color=color.black)
button3 = sphere(pos=vector(0, 1.7, 0.95), radius=0.08, color=color.black)

# === 바닥 (눈 덮인 땅) ===
ground = box(pos=vector(0, -1.7, 0), size=vector(12, 0.2, 8),
             color=color.white, opacity=0.5)
```

완성입니다! 실행하면 모자 쓰고 당근 코를 가진 귀여운 눈사람이 눈 덮인 바닥 위에 서 있습니다.

**주목할 점**:

- **모든 물체가 `vector(x, y, z)` 좌표로 정확한 위치에 배치**되었습니다
- x좌표로 좌우(눈, 팔), y좌표로 위아래(몸→배→머리→모자), z좌표로 앞뒤(눈과 코가 앞으로 나옴)를 표현했습니다
- **단추의 z좌표**가 약 1.0인 것은 배의 **앞면 표면**에 위치하도록 한 것입니다

---

## 📝 전체 코드

이 장에서 만든 눈사람의 완성 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 3D 좌표를 활용한 눈사람 만들기 ===
# --- WHY: x, y, z 좌표를 조합하여 복잡한 형태를 구성하는 연습 ---

# ──── 몸체 (3개의 구를 y축으로 쌓기) ────
body = sphere(pos=vector(0, 0, 0), radius=1.5, color=color.white)       # 몸통
belly = sphere(pos=vector(0, 2.2, 0), radius=1.0, color=color.white)    # 배
head = sphere(pos=vector(0, 3.7, 0), radius=0.7, color=color.white)     # 머리

# ──── 얼굴 (x, z좌표로 정밀 배치) ────
left_eye = sphere(pos=vector(-0.25, 3.9, 0.55), radius=0.08, color=color.black)
right_eye = sphere(pos=vector(0.25, 3.9, 0.55), radius=0.08, color=color.black)
nose = cone(pos=vector(0, 3.65, 0.6), axis=vector(0, 0, 0.8),
            radius=0.1, color=color.orange)

# ──── 팔 (axis로 방향 지정) ────
left_arm = cylinder(pos=vector(-1.0, 2.2, 0), axis=vector(-1.5, 0.8, 0),
                    radius=0.05, color=vector(0.55, 0.27, 0.07))
right_arm = cylinder(pos=vector(1.0, 2.2, 0), axis=vector(1.5, 0.8, 0),
                     radius=0.05, color=vector(0.55, 0.27, 0.07))

# ──── 모자 (원기둥 2개 조합) ────
hat_brim = cylinder(pos=vector(0, 4.2, 0), axis=vector(0, 0.08, 0),
                    radius=0.9, color=color.black)
hat_top = cylinder(pos=vector(0, 4.28, 0), axis=vector(0, 0.8, 0),
                   radius=0.55, color=color.black)

# ──── 단추 ────
button1 = sphere(pos=vector(0, 2.7, 0.95), radius=0.08, color=color.black)
button2 = sphere(pos=vector(0, 2.2, 1.0), radius=0.08, color=color.black)
button3 = sphere(pos=vector(0, 1.7, 0.95), radius=0.08, color=color.black)

# ──── 바닥 (눈 덮인 땅) ────
ground = box(pos=vector(0, -1.7, 0), size=vector(12, 0.2, 8),
             color=color.white, opacity=0.5)
```

실행하면 모자를 쓰고 당근 코를 가진 눈사람이 하얀 바닥 위에 서 있습니다. 마우스로 화면을 돌려보면 뒤에서도, 위에서도, 옆에서도 볼 수 있습니다. 여러분이 좌표만으로 이 눈사람을 만든 겁니다!

---

## 🧠 사고력 챌린지

좌표의 감각을 단단히 다지는 시간입니다. 각 문제를 통해 **3D 공간을 머릿속에서 그리는 능력**을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐)

> **문제**: 아래 코드를 실행하면 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 먼저 그려 보세요!

```python
from vpython import *

box(pos=vector(0, 0, 0), size=vector(4, 0.5, 4), color=color.green)
cylinder(pos=vector(0, 0.25, 0), axis=vector(0, 3, 0), radius=0.2, color=vector(0.55, 0.27, 0.07))
cone(pos=vector(0, 3.25, 0), axis=vector(0, 2, 0), radius=1.5, color=color.green)
sphere(pos=vector(0, 5.5, 0), radius=0.3, color=color.yellow)
```

**생각해 볼 것**:
- 물체는 총 몇 개인가요? 각각 어떤 종류인가요?
- 모든 물체의 x와 z가 0입니다. 어떤 배치일까요?
- y값을 순서대로 따라가면 어떤 모양이 만들어질까요?
- 색상에서 힌트를 얻을 수 있나요? (초록, 갈색, 초록, 노랑)

<details>
<summary>🔑 정답 확인하기</summary>

**크리스마스 트리**입니다! 🎄

- **초록 상자**(y=0): 나무를 심을 바닥/화분 (넓고 납작한 모양)
- **갈색 원기둥**(y=0.25에서 위로 3만큼): 나무 줄기
- **초록 원뿔**(y=3.25에서 위로 2만큼): 나무 잎 (삼각형 모양)
- **노란 구**(y=5.5): 꼭대기 별 장식

핵심 포인트: 모든 물체가 **x=0, z=0**이므로 수직으로 쌓여 있습니다. y값만 위로 증가하면서 "바닥 → 줄기 → 잎 → 별" 순서로 트리가 완성됩니다. 색상도 큰 힌트입니다 — 갈색은 나무 줄기, 초록은 잎을 연상시킵니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐)

> **문제**: 아래 장면을 만드는 코드를 작성해 보세요.

**장면 설명: 신호등**

- **검은색 상자**가 세로로 길게 서 있습니다 (가로 2, 세로 6, 깊이 1, 위치는 원점)
- 상자 앞면에 **빨간 구**가 맨 위에 있습니다 (y=2)
- 그 아래에 **노란 구**가 있습니다 (y=0)
- 맨 아래에 **초록 구**가 있습니다 (y=-2)
- 세 공 모두 반지름은 0.7이고, **상자보다 약간 앞**(z=0.8)에 있습니다
- 검은 원기둥이 **기둥** 역할을 합니다 (x=0, 아래로 뻗음)

**힌트**:
- 물체는 총 5개: 상자 1 + 구 3 + 원기둥 1
- 구들의 x와 z는 모두 같고, y만 다릅니다

<details>
<summary>💡 힌트 더 보기</summary>

- 상자: `box(pos=vector(0, 0, 0), size=vector(2, 6, 1), color=color.black)`
- 빨간 구: y=2, 노란 구: y=0, 초록 구: y=-2
- 기둥은 상자 아래에서 시작하여 더 아래로 뻗어야 합니다
- 기둥의 pos는 `vector(0, -3, 0)`, axis는 `vector(0, -3, 0)` 정도

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

# 신호등 몸체 (검은 상자)
traffic_body = box(pos=vector(0, 0, 0), size=vector(2, 6, 1), color=color.black)

# 빨간불 (맨 위)
red_light = sphere(pos=vector(0, 2, 0.8), radius=0.7, color=color.red)

# 노란불 (가운데)
yellow_light = sphere(pos=vector(0, 0, 0.8), radius=0.7, color=color.yellow)

# 초록불 (맨 아래)
green_light = sphere(pos=vector(0, -2, 0.8), radius=0.7, color=color.green)

# 기둥
pole = cylinder(pos=vector(0, -3, 0), axis=vector(0, -3, 0),
                radius=0.3, color=color.black)
```

핵심 포인트: 세 개의 공은 **y값만 다르고** 나머지는 같습니다. 이처럼 "패턴을 찾아 반복하기"는 프로그래밍에서 매우 중요한 사고방식입니다. 또한, 공들을 상자 **앞**에 배치하기 위해 z=0.8로 앞으로 빼낸 것도 좌표 감각의 좋은 연습입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: 3D 좌표를 활용하여 **"자기 방 책상 위 풍경"**을 VPython으로 만들어 보세요!

**요구 사항**:
- `from vpython import *`로 시작
- 물체를 **5개 이상** 사용
- **x, y, z 좌표를 모두** 활용 (모든 물체가 같은 평면에 있으면 안 됩니다)
- 물체마다 **주석**으로 무엇을 나타내는지 적기

**아이디어 예시**:
- 📱 스마트폰 (납작한 box)
- 📚 책 여러 권 (box를 쌓아 올리기)
- ✏️ 연필꽂이 (cylinder) + 연필 (가는 cylinder)
- 🖥️ 모니터 (넓은 box) + 키보드 (납작한 box)
- ☕ 컵 (cylinder + 손잡이)
- 🪴 화분 (cylinder + sphere)

**규칙**:
- 책상 표면은 y=0으로 설정하면 편합니다
- 책상 위의 물체들은 y가 0보다 큰 값을 갖습니다
- 좌우(x)와 앞뒤(z)를 잘 활용해서 물체들이 겹치지 않게 배치하세요

<details>
<summary>🔑 예시 답안: 책상 위 풍경</summary>

```python
from vpython import *

# 책상 (넓은 갈색 상자)
desk = box(pos=vector(0, 0, 0), size=vector(8, 0.3, 4),
           color=vector(0.6, 0.35, 0.15))

# 모니터 (얇은 검은 상자, 책상 뒤쪽 가운데)
monitor = box(pos=vector(0, 2, -1.2), size=vector(3.5, 2.5, 0.15),
              color=color.black)
# 모니터 받침대
stand = cylinder(pos=vector(0, 0.15, -1.2), axis=vector(0, 0.6, 0),
                 radius=0.3, color=color.black)

# 키보드 (납작한 회색 상자, 책상 앞쪽 가운데)
keyboard = box(pos=vector(0, 0.25, 0.5), size=vector(2.5, 0.15, 0.8),
               color=vector(0.7, 0.7, 0.7))

# 커피컵 (원기둥, 오른쪽)
cup = cylinder(pos=vector(2.5, 0.15, 0.3), axis=vector(0, 1.0, 0),
               radius=0.35, color=color.white)

# 책 3권 쌓기 (왼쪽)
book1 = box(pos=vector(-2.5, 0.35, 0), size=vector(1.2, 0.3, 1.5), color=color.blue)
book2 = box(pos=vector(-2.5, 0.65, 0), size=vector(1.2, 0.3, 1.5), color=color.red)
book3 = box(pos=vector(-2.5, 0.95, 0), size=vector(1.2, 0.3, 1.5), color=color.green)

# 연필 (가느다란 노란 원기둥, 오른쪽 앞)
pencil = cylinder(pos=vector(1.5, 0.15, 1.0), axis=vector(0.3, 0.1, -1.5),
                  radius=0.04, color=color.yellow)

# 화분 (초록 구 + 갈색 원기둥, 왼쪽 뒤)
pot = cylinder(pos=vector(-3, 0.15, -1.0), axis=vector(0, 0.6, 0),
               radius=0.4, color=vector(0.55, 0.27, 0.07))
plant = sphere(pos=vector(-3, 1.0, -1.0), radius=0.5, color=color.green)
```

이것은 예시일 뿐입니다! 여러분만의 책상 위 풍경을 자유롭게 만들어 보세요. 실제 자기 책상을 보면서 만들면 더 재미있습니다.

</details>

---

## ⚠️ 자주 하는 실수

이 장에서 특히 자주 발생하는 실수들입니다.

**실수 1: x, y, z 순서를 헷갈림**

```python
# ❌ "위로 3" 가려고 했는데 y 자리에 안 넣음
from vpython import *
sphere(pos=vector(3, 0, 0))  # 이것은 "오른쪽으로 3"!
```

```python
# ✅ "위로 3"은 y 자리에 넣어야 합니다
from vpython import *
sphere(pos=vector(0, 3, 0))  # y=3 → 위쪽으로 3!
```

> vector의 순서는 항상 **(x, y, z) = (좌우, 위아래, 앞뒤)** 입니다!

**실수 2: 물체가 겹쳐서 안 보임**

```python
# ❌ 두 물체가 같은 위치에 있어서 하나만 보임
from vpython import *
sphere(pos=vector(0, 0, 0), color=color.red, radius=1)
sphere(pos=vector(0, 0, 0), color=color.blue, radius=1)
# 파란 공이 빨간 공 안에 완전히 겹침!
```

```python
# ✅ 위치를 다르게 하거나 크기를 다르게 합니다
from vpython import *
sphere(pos=vector(-2, 0, 0), color=color.red, radius=1)
sphere(pos=vector(2, 0, 0), color=color.blue, radius=1)
```

> 같은 위치에 같은 크기의 물체를 놓으면 하나가 다른 하나에 완전히 가려집니다. 꼭 위치나 크기를 다르게 하세요!

**실수 3: 공을 쌓을 때 간격 계산 실수**

```python
# ❌ 반지름을 고려하지 않고 쌓으면 공이 떠 있거나 겹침
from vpython import *
sphere(pos=vector(0, 0, 0), radius=2)
sphere(pos=vector(0, 1, 0), radius=1)
# radius=2인 공 위에 y=1이면 공이 큰 공 안에 파묻힘!
```

```python
# ✅ 아래 공의 반지름 + 위 공의 반지름 ≈ y 간격
from vpython import *
sphere(pos=vector(0, 0, 0), radius=2)
sphere(pos=vector(0, 2.8, 0), radius=1)
# 2 + 1 = 3이지만 살짝 겹치게 2.8로 → 자연스러운 눈사람
```

> 두 공을 쌓을 때 y 간격 ≈ 아래 공의 반지름 + 위 공의 반지름. 약간 작게 하면 겹쳐서 자연스럽고, 크게 하면 떠 있는 느낌이 납니다.

**실수 4: vector의 괄호나 쉼표 실수**

```python
# ❌ vector 안의 쉼표를 빼먹으면 오류!
from vpython import *
sphere(pos=vector(1 2 3))
```

```python
# ❌ vector의 괄호를 빼먹어도 오류!
from vpython import *
sphere(pos=1, 2, 3)
```

```python
# ✅ vector(x, y, z)의 형태를 정확히 지키세요
from vpython import *
sphere(pos=vector(1, 2, 3))
```

> `vector(x, y, z)` — 괄호 안에 쉼표로 구분된 숫자 3개, 이 형태를 기억하세요!

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다.

- [ ] **x, y, z가 각각 어떤 방향인지 말할 수 있나요?** → x=좌우, y=위아래, z=앞뒤
- [ ] **`vector(0, 5, 0)`은 어디를 가리키는지 알고 있나요?** → 원점에서 위로 5만큼
- [ ] **물체를 "왼쪽 위"에 놓으려면 어떤 좌표를 써야 하나요?** → x는 음수, y는 양수 (예: `vector(-3, 4, 0)`)
- [ ] **두 개의 공을 수직으로 자연스럽게 쌓으려면 y 간격을 어떻게 계산하나요?** → 아래 공의 반지름 + 위 공의 반지름
- [ ] **`body = sphere(...)`에서 `body`가 무엇인지 설명할 수 있나요?** → 만들어진 구 물체에 붙인 이름(변수)
- [ ] **눈사람 코드에서 좌우 대칭을 만드는 방법을 알고 있나요?** → x값의 부호만 반대로 바꾸기

> 💪 체크가 4개 이상이면 좌표계를 잘 이해한 것입니다! 다음 장으로 넘어갈 준비가 되었습니다.

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 눈사람에 장식 추가하기

완성된 눈사람에 자기만의 장식을 추가해 보세요.

```python
from vpython import *

# (눈사람 전체 코드는 위의 📝 전체 코드를 사용하세요)
# 아래는 추가할 수 있는 장식 예시입니다

# 목도리 — 빨간 고리 (ring 물체 사용)
scarf = ring(pos=vector(0, 3.1, 0), axis=vector(0, 1, 0),
             radius=0.75, thickness=0.15, color=color.red)

# 눈송이 — 작은 흰 공 여러 개를 흩뿌리기
sphere(pos=vector(2, 4, 1), radius=0.05, color=color.white)
sphere(pos=vector(-1.5, 5, -0.5), radius=0.05, color=color.white)
sphere(pos=vector(3, 3, -1), radius=0.05, color=color.white)
sphere(pos=vector(-2, 6, 0.8), radius=0.05, color=color.white)
sphere(pos=vector(1, 5.5, -1.2), radius=0.05, color=color.white)
```

> 🎨 입, 머플러, 빗자루, 장갑 등 다른 장식도 생각해 보세요. 어떤 물체를 어떤 좌표에 놓아야 할지 먼저 구상한 다음 코드로 옮기는 연습이 됩니다!

### 도전 2: 주사위 만들기

정육면체(box) 위에 점(작은 sphere)을 올바른 위치에 배치하여 주사위를 만들어 보세요.

```python
from vpython import *

# 주사위 본체 (흰색 정육면체)
dice = box(pos=vector(0, 0, 0), size=vector(2, 2, 2), color=color.white)

# 앞면 (z=1.01 위치에) — 숫자 1: 점 1개 (정가운데)
sphere(pos=vector(0, 0, 1.01), radius=0.15, color=color.black)

# 윗면 (y=1.01 위치에) — 숫자 2: 점 2개 (대각선)
sphere(pos=vector(-0.4, 1.01, -0.4), radius=0.15, color=color.black)
sphere(pos=vector(0.4, 1.01, 0.4), radius=0.15, color=color.black)

# 오른면 (x=1.01 위치에) — 숫자 3: 점 3개 (대각선 + 가운데)
sphere(pos=vector(1.01, 0, 0), radius=0.15, color=color.black)
sphere(pos=vector(1.01, 0.5, 0.5), radius=0.15, color=color.black)
sphere(pos=vector(1.01, -0.5, -0.5), radius=0.15, color=color.black)
```

> 🎲 나머지 세 면(4, 5, 6)도 완성해 보세요! 각 면이 어떤 축에 수직인지, 점의 좌표를 어떻게 계산할지 생각하는 것이 핵심입니다.

### 도전 3: 좌표 맞추기 게임

아래 코드는 빨간 공이 어딘가에 숨어 있습니다. 코드를 실행하지 말고, 좌표만 보고 빨간 공의 위치를 맞춰 보세요!

```python
from vpython import *

box(pos=vector(0, 0, 0), size=vector(6, 0.2, 6), color=color.white, opacity=0.3)
sphere(pos=vector(-2, 0, 2), radius=0.4, color=color.blue)
sphere(pos=vector(2, 0, -2), radius=0.4, color=color.green)
sphere(pos=vector(2, 3, 2), radius=0.4, color=color.red)   # 이 공은 어디에?
cylinder(pos=vector(2, 0, 2), axis=vector(0, 3, 0), radius=0.05, color=color.gray(0.5))
```

> 빨간 공은 바닥 위 어디에, 얼마나 높이 떠 있을까요? 원기둥(cylinder)은 무엇을 의미할까요? 머릿속으로 그려본 후 실행해서 확인해 보세요!

---

## 🔗 다음 장으로

이번 장에서 우리는 3D 좌표계의 비밀을 풀었습니다.

**배운 것 정리**:
- **x, y, z 좌표계** — x는 좌우, y는 위아래, z는 앞뒤
- **`vector(x, y, z)`** — 3D 위치를 하나로 묶어주는 함수
- **방향의 좌표 표현** — "오른쪽 위" = x 양수, y 양수
- **변수** — 물체에 이름을 붙여 나중에 참조할 수 있음
- **키워드 인자** — `pos=`, `color=`처럼 이름=값 형태로 속성 지정

눈사람을 만들면서 좌표 감각이 어느 정도 잡혔을 겁니다. 하지만 아직 한 가지 아쉬운 점이 있습니다. 눈사람의 머리 위치를 바꾸려면 숫자를 일일이 다시 계산해야 했죠. "몸통 위치 + 몸통 반지름 + 머리 반지름"처럼 **계산을 코드로 자동화**할 수는 없을까요?

**다음 장 "변수와 계산 — 코드에게 수학을 맡기자"** 에서는 변수를 본격적으로 활용하고, 사칙연산으로 좌표를 자동 계산하는 방법을 배웁니다. 같은 눈사람을 만들더라도 훨씬 스마트한 코드가 됩니다! 🧮

> 🌟 **오늘의 한마디**: 좌표 세 개면 우주의 어떤 지점이든 표현할 수 있습니다. 여러분은 오늘 그 좌표의 언어를 배웠고, 눈사람이라는 작품으로 증명했습니다. 이제 여러분은 3D 세계의 건축가입니다!
