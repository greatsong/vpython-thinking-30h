# Chapter 13: 함수 — 나만의 명령어 만들기

**Part 5: 함수, 위젯, 그리고 종합 프로젝트**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **`def`로 함수를 정의하고 호출**할 수 있다 — 자주 쓰는 코드를 한 단어로 실행
- **매개변수와 반환값**을 이해한다 — 함수에 재료를 넣고 결과를 받는 구조
- **반복되는 코드를 함수로 구조화**할 수 있다 — 10줄짜리 코드가 1줄 호출로 변하는 마법

> 🖥️ **이번 시간에 만들 것**: `create_building()` 함수를 만들어 한 줄의 호출로 빌딩을 짓고, `for` 루프와 결합하여 **랜덤 도시**를 자동으로 생성합니다. 마우스로 도시를 돌려보며 "내가 코드로 도시 설계자가 되었다!"는 경험을 하게 됩니다.

---

## 💡 왜 이걸 배우나요?

### 반복의 고통에서 벗어나기

지금까지 여러분은 `for` 루프, `while` 루프, 리스트, 충돌 감지, 키보드 입력까지 정말 많은 것을 배웠습니다. 그런데 코드가 길어지면서 이런 경험을 한 적이 있지 않나요?

> "아, 또 비슷한 코드를 써야 하네... 아까 쓴 코드를 복사해서 숫자만 바꿔야지."

빨간 공을 만들고, 파란 공을 만들고, 초록 공을 만들고... 매번 `sphere(pos=..., color=..., radius=...)`를 복사해서 붙여넣고 값만 바꾸는 작업. 솔직히 좀 지겹죠?

**함수는 이 문제를 해결합니다.**

함수를 쓰면 "공을 만드는 레시피"를 한 번만 정의해 두고, 이후에는 `make_ball(빨강)`, `make_ball(파랑)` 처럼 한 줄로 호출하면 됩니다. 마치 **자판기**처럼요 — 버튼 하나 누르면 복잡한 내부 과정을 거쳐 원하는 결과가 톡 하고 나옵니다.

### 프로그래머의 핵심 능력: 추상화

사실 함수는 프로그래밍에서 가장 중요한 개념 중 하나입니다. 전문 프로그래머들이 매일 하는 일의 핵심이 바로 "반복되는 패턴을 함수로 묶는 것"입니다. 이것을 **추상화(Abstraction)** 라고 합니다.

추상화란, 복잡한 세부 사항을 감추고 **핵심만 드러내는 것**입니다. 여러분이 자판기에서 음료를 뽑을 때, 내부에서 물을 끓이고 원두를 갈고 추출하는 과정을 알 필요 없이 그냥 버튼만 누르잖아요? 함수도 똑같습니다. 복잡한 코드를 함수 안에 넣어두면, 사용할 때는 함수 이름만 부르면 됩니다.

---

## 📚 핵심 개념

### 개념 1: 함수란 무엇인가?

**🎭 비유로 시작하기 — 자판기**

자판기를 떠올려 봅시다.

- **동전을 넣는다** → 이것이 **매개변수(parameter)**
- **버튼을 누른다** → 이것이 **함수 호출**
- **음료가 나온다** → 이것이 **반환값(return value)**

자판기를 한 번 만들어 두면, 누구나 동전만 넣으면 음료를 받을 수 있습니다. 함수도 마찬가지입니다. 한 번 정의해 두면, 필요할 때마다 호출해서 결과를 받을 수 있습니다.

> 📖 **파이썬 문법: `def`로 함수 정의하기**
>
> 함수를 만들려면 `def` 키워드를 사용합니다.
>
> ```python
> def 함수이름(매개변수1, 매개변수2):
>     # 함수가 할 일 (들여쓰기 필수!)
>     실행할_코드
> ```
>
> - `def`는 "define(정의하다)"의 줄임말입니다
> - 함수 이름 뒤에 **괄호 `()`** 를 쓰고, 안에 매개변수를 넣습니다
> - 괄호 뒤에 반드시 **콜론 `:`** 을 붙입니다
> - 함수 본문은 반드시 **들여쓰기(4칸 스페이스)**를 해야 합니다
> - 함수를 **정의하는 것**과 **호출하는 것**은 다릅니다. 정의만 하면 아무 일도 일어나지 않습니다!

**💻 예시로 확인하기**

```python
from vpython import *

# 함수 정의 — "레시피를 적는 것" (아직 실행 안 됨!)
def make_red_ball():
    sphere(color=color.red, radius=0.5)

# 함수 호출 — "레시피대로 만들어!" (이때 실행됨!)
make_red_ball()
```

`def make_red_ball():` 줄은 "빨간 공 만드는 법"을 적어둔 것이고, `make_red_ball()` 줄이 실제로 빨간 공을 만드는 순간입니다. 정의와 호출, 이 두 단계를 꼭 기억하세요!

---

### 개념 2: 매개변수 — 함수에 재료 넣기

**🎭 비유로 시작하기 — 레시피**

케이크 레시피를 생각해 봅시다. 같은 레시피라도 "딸기"를 넣으면 딸기 케이크가 되고, "초콜릿"을 넣으면 초콜릿 케이크가 됩니다. 레시피(함수)는 같지만, 재료(매개변수)에 따라 결과가 달라지는 것이죠.

> 📖 **파이썬 문법: 매개변수(parameter)와 인자(argument)**
>
> ```python
> def greet(name):        # name은 "매개변수" — 함수 정의 시 사용
>     print(f"안녕, {name}!")
>
> greet("철수")           # "철수"는 "인자" — 함수 호출 시 전달하는 값
> greet("영희")           # 같은 함수, 다른 인자 → 다른 결과
> ```
>
> - **매개변수(parameter)**: 함수를 정의할 때 괄호 안에 쓰는 변수 이름
> - **인자(argument)**: 함수를 호출할 때 실제로 전달하는 값
> - 매개변수는 여러 개 쓸 수 있고, 쉼표로 구분합니다

**💻 VPython 예시 — 위치를 받아 공을 만드는 함수**

```python
from vpython import *

# 매개변수로 위치와 색상을 받는 함수
def make_ball(x, y, ball_color):
    sphere(pos=vector(x, y, 0), color=ball_color, radius=0.5)

# 같은 함수를 다른 인자로 호출 → 다른 위치, 다른 색상의 공!
make_ball(-2, 0, color.red)
make_ball(0, 0, color.green)
make_ball(2, 0, color.blue)
```

함수 하나로 빨강, 초록, 파랑 공 세 개를 만들었습니다! 만약 함수가 없었다면 `sphere(pos=..., color=..., radius=...)` 를 세 번 반복해야 했겠죠.

---

### 개념 3: 반환값 — 함수에서 결과 돌려받기

**🎭 비유로 시작하기 — 계산기**

계산기에 `3 + 5`를 입력하면 `8`이라는 **결과**가 나옵니다. 계산기는 답을 화면에 보여주고, 우리는 그 답을 활용합니다. 함수도 마찬가지로 계산한 결과를 **돌려줄** 수 있습니다.

> 📖 **파이썬 문법: `return` — 결과를 돌려주기**
>
> ```python
> def add(a, b):
>     result = a + b
>     return result       # 결과를 돌려준다
>
> answer = add(3, 5)      # answer에 8이 저장된다
> print(answer)           # 8
> ```
>
> - `return`은 함수의 결과를 호출한 곳으로 **돌려보내는** 명령입니다
> - `return`을 만나면 함수는 즉시 **종료**됩니다
> - `return`이 없는 함수는 `None`을 돌려줍니다 (아무것도 돌려주지 않음)
> - `return` 뒤에 어떤 값이든 올 수 있습니다: 숫자, 문자열, 리스트, 심지어 VPython 물체까지!

**💻 VPython 예시 — 두 물체 사이의 거리를 계산하는 함수**

```python
from vpython import *

def distance(obj1, obj2):
    diff = obj2.pos - obj1.pos
    return mag(diff)    # mag()는 벡터의 크기(길이)를 구하는 VPython 함수

ball_a = sphere(pos=vector(-3, 0, 0), color=color.red, radius=0.3)
ball_b = sphere(pos=vector(4, 0, 0), color=color.blue, radius=0.3)

d = distance(ball_a, ball_b)
print(f"두 공 사이의 거리: {d}")    # 7.0
```

`distance()` 함수는 두 물체를 받아서 거리를 계산한 뒤, 그 숫자를 `return`으로 돌려줍니다. 돌려받은 값을 변수 `d`에 저장해서 활용할 수 있습니다.

---

### 개념 4: 기본값 매개변수 — 편리한 기본 설정

**🎭 비유로 시작하기 — 커피 주문**

카페에서 "아메리카노 주세요"라고 하면 기본 사이즈(레귤러)가 나옵니다. "아메리카노 라지 사이즈 주세요"라고 하면 큰 사이즈가 나오죠. 따로 말하지 않으면 기본값이 적용되는 겁니다.

> 📖 **파이썬 문법: 기본값 매개변수(default parameter)**
>
> ```python
> def make_sphere(x=0, y=0, r=0.5, c=color.white):
>     sphere(pos=vector(x, y, 0), radius=r, color=c)
>
> make_sphere()                    # 모든 기본값 사용: 원점, 반지름 0.5, 흰색
> make_sphere(x=3)                 # x만 변경, 나머지는 기본값
> make_sphere(x=-3, c=color.red)   # x와 색상만 변경
> ```
>
> - 매개변수에 `=값`을 붙이면 기본값이 설정됩니다
> - 호출할 때 해당 인자를 생략하면 기본값이 사용됩니다
> - 기본값이 있는 매개변수는 기본값이 없는 매개변수 **뒤에** 와야 합니다

이렇게 하면 자주 쓰는 설정은 생략하고, 바꾸고 싶은 것만 지정할 수 있어서 매우 편리합니다.

---

### 개념 5: 독스트링 — 함수에 설명서 달기

> 📖 **파이썬 문법: 독스트링(docstring)**
>
> ```python
> def create_building(x, z, height, building_color):
>     """지정된 위치에 빌딩을 생성합니다.
>
>     x: 빌딩의 x 좌표
>     z: 빌딩의 z 좌표
>     height: 빌딩의 높이
>     building_color: 빌딩의 색상
>     """
>     box(pos=vector(x, height/2, z),
>         size=vector(1, height, 1),
>         color=building_color)
> ```
>
> - 함수 본문의 맨 첫 줄에 `"""..."""`(삼중 따옴표)로 설명을 적는 것을 독스트링이라고 합니다
> - 함수가 무엇을 하는지, 매개변수가 무엇인지 설명합니다
> - 나중에 자기가 만든 함수를 다시 볼 때 큰 도움이 됩니다
> - 좋은 프로그래머의 습관: "미래의 나"를 위해 설명서를 남기자!

---

## 🔨 따라하기

자, 이제 함수를 직접 만들어 봅시다! 간단한 함수부터 시작해서, 최종적으로 **랜덤 도시 생성기**를 완성합니다.

### Step 1: 나무를 만드는 함수

나무 한 그루는 원기둥(줄기) + 구(잎)로 만들 수 있습니다. 이것을 함수로 만들면, 한 줄 호출로 나무를 심을 수 있습니다!

```python
from vpython import *

def create_tree(x, z):
    """지정된 위치에 나무를 생성합니다."""
    # 줄기 — 갈색 원기둥
    cylinder(pos=vector(x, 0, z),
             axis=vector(0, 2, 0),
             radius=0.15,
             color=vector(0.55, 0.27, 0.07))
    # 잎 — 초록 구
    sphere(pos=vector(x, 2.5, z),
           radius=0.7,
           color=color.green)

# 바닥
box(pos=vector(0, -0.05, 0), size=vector(12, 0.1, 12),
    color=vector(0.3, 0.6, 0.3))

# 함수 호출로 나무 심기!
create_tree(-3, -2)
create_tree(0, 1)
create_tree(3, -1)
create_tree(-1, 3)
create_tree(2, 3)
```

**실행 결과**: 초록색 바닥 위에 나무 5그루가 서 있는 작은 숲이 나타납니다. `create_tree()` 함수를 한 번 정의해 두니, 나무를 추가하려면 호출 한 줄만 더 쓰면 됩니다! 나무 100그루를 심어야 해도 루프와 결합하면 코드 두 줄이면 충분합니다.

---

### Step 2: 빌딩을 만드는 공장 함수

이번에는 매개변수를 더 많이 활용하는 "공장 함수"를 만들어 봅시다. 높이, 색상, 위치를 모두 인자로 받아서, 다양한 빌딩을 찍어냅니다.

```python
from vpython import *

def create_building(x, z, height, building_color):
    """지정된 위치에 빌딩을 생성합니다."""
    # 빌딩 본체
    box(pos=vector(x, height / 2, z),
        size=vector(1, height, 1),
        color=building_color)
    # 옥상 안테나
    cylinder(pos=vector(x, height, z),
             axis=vector(0, 0.5, 0),
             radius=0.03,
             color=color.red)

# 바닥
box(pos=vector(0, -0.05, 0), size=vector(14, 0.1, 14),
    color=vector(0.3, 0.3, 0.3))

# 다양한 빌딩 생성!
create_building(-3, 0, 5, color.cyan)
create_building(-1, 0, 3, color.blue)
create_building(1, 0, 7, color.white)
create_building(3, 0, 4, color.yellow)
```

**실행 결과**: 회색 바닥 위에 높이가 제각각인 네 개의 빌딩이 나란히 서 있습니다. 같은 함수에 다른 인자를 넣어 완전히 다른 빌딩을 만들었습니다. 이것이 바로 **매개변수의 힘**입니다!

---

### Step 3: 거리 계산 함수와 return 활용

물체를 만드는 것뿐 아니라, 계산 결과를 돌려주는 함수도 만들어 봅시다. 두 물체 사이의 거리를 구하고, 그 거리에 따라 연결선의 색상을 다르게 합니다.

```python
from vpython import *

def distance(obj1, obj2):
    """두 물체 사이의 거리를 반환합니다."""
    diff = obj2.pos - obj1.pos
    return mag(diff)

def connect_if_close(obj1, obj2, threshold=3):
    """두 물체가 threshold 이내이면 선으로 연결합니다."""
    d = distance(obj1, obj2)
    if d < threshold:
        curve(pos=[obj1.pos, obj2.pos], color=color.yellow, radius=0.02)
        return True
    return False

# 공 5개 생성
balls = []
positions = [
    vector(-3, 0, 0),
    vector(-1, 1, 0),
    vector(1, -1, 0),
    vector(2, 2, 0),
    vector(4, 0, 0)
]

for p in positions:
    b = sphere(pos=p, color=color.cyan, radius=0.3)
    balls.append(b)

# 가까운 공들끼리 연결
count = 0
for i in range(len(balls)):
    for j in range(i + 1, len(balls)):
        if connect_if_close(balls[i], balls[j]):
            count += 1

print(f"연결된 쌍의 수: {count}")
```

**실행 결과**: 하늘색 공 5개가 나타나고, 서로 거리가 3 이내인 공들 사이에 노란 선이 그려집니다. `distance()` 함수가 거리를 **계산해서 돌려주고**, `connect_if_close()` 함수가 그 값을 **활용**하는 구조입니다. 함수끼리 협력하는 모습을 확인해 보세요!

---

### Step 4: 랜덤 도시 생성기 — 최종 프로젝트!

드디어 이번 장의 대미를 장식할 프로젝트입니다. 지금까지 배운 모든 것을 합쳐서 **랜덤 도시 생성기**를 만듭니다.

```python
from vpython import *
from random import uniform, choice, randint

# === 함수 정의: 도시를 구성하는 요소들 ===

def create_building(x, z, height, building_color):
    """빌딩 한 채를 생성합니다."""
    # 본체
    box(pos=vector(x, height / 2, z),
        size=vector(1, height, 1),
        color=building_color)
    # 창문 (앞면에 작은 점으로 표현)
    for floor in range(1, int(height)):
        box(pos=vector(x, floor, z + 0.51),
            size=vector(0.2, 0.2, 0.01),
            color=color.yellow,
            opacity=0.8)

def create_tree(x, z, tree_height=2):
    """나무 한 그루를 생성합니다."""
    cylinder(pos=vector(x, 0, z),
             axis=vector(0, tree_height, 0),
             radius=0.1,
             color=vector(0.55, 0.27, 0.07))
    sphere(pos=vector(x, tree_height + 0.4, z),
           radius=0.5,
           color=vector(0.1, uniform(0.4, 0.8), 0.1))

def create_street_light(x, z):
    """가로등 하나를 생성합니다."""
    # 기둥
    cylinder(pos=vector(x, 0, z),
             axis=vector(0, 3, 0),
             radius=0.05,
             color=color.gray(0.5))
    # 전구
    sphere(pos=vector(x, 3.2, z),
           radius=0.15,
           color=color.yellow,
           emissive=True)

def create_ground(size_val):
    """바닥을 생성합니다."""
    box(pos=vector(0, -0.05, 0),
        size=vector(size_val, 0.1, size_val),
        color=vector(0.2, 0.2, 0.2))

def generate_city(grid_range, spacing):
    """도시 전체를 생성합니다."""
    building_colors = [
        color.cyan,
        color.blue,
        color.white,
        vector(0.8, 0.8, 0.9),
        vector(0.6, 0.7, 0.8)
    ]

    building_count = 0

    for x in range(grid_range[0], grid_range[1], spacing):
        for z in range(grid_range[0], grid_range[1], spacing):
            # 빌딩 생성 (80% 확률)
            if uniform(0, 1) < 0.8:
                h = uniform(1, 8)
                c = choice(building_colors)
                create_building(x, z, h, c)
                building_count += 1
            else:
                # 나무 생성 (20% 확률)
                create_tree(x, z)

    return building_count

# === 메인 코드: 도시를 만들자! ===

scene.background = vector(0.05, 0.05, 0.15)    # 밤하늘 배경
scene.caption = "마우스 오른쪽 버튼으로 시점을 돌려 도시를 감상하세요!"

# 바닥 생성
create_ground(16)

# 도시 생성
total = generate_city(grid_range=(-6, 7), spacing=2)

# 가로등 배치 (도시 외곽)
for x in range(-7, 8, 3):
    create_street_light(x, -7)
    create_street_light(x, 7)

print(f"빌딩 {total}채의 도시가 생성되었습니다!")
```

**실행 결과**: 어두운 밤하늘 배경 아래, 높이가 제각각인 빌딩들이 격자 형태로 배치된 도시가 나타납니다. 빌딩 앞면에는 노란 창문이 빛나고, 빌딩이 없는 자리에는 나무가 심어져 있으며, 도시 외곽에는 가로등이 늘어서 있습니다. 실행할 때마다 빌딩의 높이와 색상, 나무의 위치가 달라지는 **랜덤 도시**입니다!

코드 구조를 살펴봅시다.

- **`create_building()`** — 빌딩 한 채를 만드는 함수 (창문 포함)
- **`create_tree()`** — 나무 한 그루를 만드는 함수 (기본값 매개변수 활용)
- **`create_street_light()`** — 가로등 하나를 만드는 함수
- **`create_ground()`** — 바닥을 만드는 함수
- **`generate_city()`** — 위 함수들을 조합하여 도시 전체를 만드는 함수 (빌딩 수를 return)

각 함수가 **하나의 역할**만 담당하고, `generate_city()`가 이 함수들을 **조합**하여 전체를 완성합니다. 이것이 함수로 코드를 구조화하는 핵심 패턴입니다!

---

## 📝 전체 코드

이 장에서 만든 최종 작품의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *
from random import uniform, choice, randint

# === WHAT: 함수를 활용한 랜덤 도시 생성기 ===
# --- WHY: 반복되는 물체 생성 코드를 함수로 구조화하는 법을 배우기 위해 ---

def create_building(x, z, height, building_color):
    """지정된 위치에 빌딩 한 채를 생성합니다.

    x: 빌딩의 x 좌표
    z: 빌딩의 z 좌표
    height: 빌딩의 높이
    building_color: 빌딩의 색상
    """
    # 빌딩 본체
    box(pos=vector(x, height / 2, z),
        size=vector(1, height, 1),
        color=building_color)
    # 창문 (앞면에 노란 사각형으로 표현)
    for floor in range(1, int(height)):
        box(pos=vector(x, floor, z + 0.51),
            size=vector(0.2, 0.2, 0.01),
            color=color.yellow,
            opacity=0.8)

def create_tree(x, z, tree_height=2):
    """지정된 위치에 나무 한 그루를 생성합니다.

    x: 나무의 x 좌표
    z: 나무의 z 좌표
    tree_height: 나무 줄기의 높이 (기본값: 2)
    """
    # 줄기
    cylinder(pos=vector(x, 0, z),
             axis=vector(0, tree_height, 0),
             radius=0.1,
             color=vector(0.55, 0.27, 0.07))
    # 잎
    sphere(pos=vector(x, tree_height + 0.4, z),
           radius=0.5,
           color=vector(0.1, uniform(0.4, 0.8), 0.1))

def create_street_light(x, z):
    """지정된 위치에 가로등 하나를 생성합니다."""
    # 기둥
    cylinder(pos=vector(x, 0, z),
             axis=vector(0, 3, 0),
             radius=0.05,
             color=color.gray(0.5))
    # 전구 (emissive=True로 빛나는 효과)
    sphere(pos=vector(x, 3.2, z),
           radius=0.15,
           color=color.yellow,
           emissive=True)

def create_ground(size_val):
    """바닥(도로)을 생성합니다."""
    box(pos=vector(0, -0.05, 0),
        size=vector(size_val, 0.1, size_val),
        color=vector(0.2, 0.2, 0.2))

def generate_city(grid_range, spacing):
    """격자 형태의 랜덤 도시를 생성합니다.

    grid_range: (시작, 끝) 범위 튜플
    spacing: 건물 사이 간격
    반환값: 생성된 빌딩의 수
    """
    building_colors = [
        color.cyan,
        color.blue,
        color.white,
        vector(0.8, 0.8, 0.9),
        vector(0.6, 0.7, 0.8)
    ]

    building_count = 0

    for x in range(grid_range[0], grid_range[1], spacing):
        for z in range(grid_range[0], grid_range[1], spacing):
            if uniform(0, 1) < 0.8:
                h = uniform(1, 8)
                c = choice(building_colors)
                create_building(x, z, h, c)
                building_count += 1
            else:
                create_tree(x, z)

    return building_count

# === 메인 코드 ===

scene.background = vector(0.05, 0.05, 0.15)    # 밤하늘 배경
scene.caption = "마우스 오른쪽 버튼으로 시점을 돌려 도시를 감상하세요!"

# 바닥 생성
create_ground(16)

# 도시 생성
total = generate_city(grid_range=(-6, 7), spacing=2)

# 가로등 배치 (도시 외곽 앞뒤)
for x in range(-7, 8, 3):
    create_street_light(x, -7)
    create_street_light(x, 7)

print(f"빌딩 {total}채의 랜덤 도시가 완성되었습니다!")
```

**실행하면 이런 장면이 보입니다**: 밤하늘 배경 아래 다양한 높이와 색상의 빌딩들이 격자 형태로 배치되어 있고, 빌딩 앞면에는 노란 창문이 빛나며, 빈 자리에는 나무가 심어져 있고, 외곽에는 가로등이 줄지어 있는 도시 풍경입니다. 매번 실행할 때마다 다른 도시가 생성됩니다!

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 함수에 대한 **컴퓨팅 사고력의 근육**을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하면 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 먼저 그려 보세요!

```python
from vpython import *

def make_tower(x, levels, tower_color):
    for i in range(levels):
        box(pos=vector(x, i, 0),
            size=vector(1, 0.8, 1),
            color=tower_color,
            opacity=1 - i * 0.2)

make_tower(-2, 3, color.red)
make_tower(0, 5, color.blue)
make_tower(2, 2, color.green)
```

**생각해 볼 것**:
- `make_tower`는 어떤 일을 하는 함수인가요?
- `range(levels)`에서 `i`는 어떤 값들을 가지나요?
- `opacity=1 - i * 0.2`는 층이 올라갈수록 어떻게 변하나요?
- 세 번 호출되었으니 탑은 몇 개일까요?
- 각 탑의 층수는 몇 층인가요?

<details>
<summary>🔑 정답 확인하기</summary>

**세 개의 탑**이 나란히 서 있습니다.

- **왼쪽(x=-2)**: 빨간 탑, **3층**. 아래층(i=0)은 불투명(opacity=1.0), 위로 갈수록 점점 투명해짐(0.8, 0.6)
- **가운데(x=0)**: 파란 탑, **5층**. 아래는 불투명하고 위로 갈수록 투명해짐(1.0, 0.8, 0.6, 0.4, 0.2). 맨 위층은 거의 보이지 않을 정도로 투명!
- **오른쪽(x=2)**: 초록 탑, **2층**. 아래층은 불투명(1.0), 위층은 약간 투명(0.8)

핵심 포인트: 함수의 매개변수(`levels`)에 따라 루프 횟수가 달라집니다. 같은 함수를 다른 인자로 호출하면 다른 결과가 나옵니다. `opacity` 계산식이 `i`에 따라 변하므로, 높은 층일수록 투명해지는 "사라지는 탑" 효과가 만들어집니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래와 같은 장면을 만드는 함수를 작성해 보세요.

**장면 설명**:
- 화면에 **눈사람 3개**가 나란히 서 있습니다
- 각 눈사람은 **흰색 구 3개**(아래=큰, 중간=중, 위=작은)로 이루어져 있습니다
- 왼쪽 눈사람은 x=-4, 가운데는 x=0, 오른쪽은 x=4에 위치합니다
- 모든 눈사람의 크기가 **동일**합니다

**요구사항**:
- `create_snowman(x)` 함수를 정의하세요
- 이 함수를 **3번 호출**하여 눈사람 3개를 만드세요
- 아래 구의 반지름은 1, 중간은 0.7, 위는 0.4로 하세요

**힌트**:
- 아래 구의 중심 y좌표를 1이라고 하면, 중간 구는 아래 구 위에, 위 구는 중간 구 위에 있어야 합니다
- 각 구의 y 좌표를 반지름을 이용해 계산해 보세요

<details>
<summary>💡 힌트 더 보기</summary>

- 아래 구: `pos=vector(x, 1, 0)`, `radius=1`
- 중간 구: 아래 구의 위쪽 표면(y=2)에서 중간 구의 반지름(0.7)만큼 위 → `pos=vector(x, 2.7, 0)`
- 위 구: 중간 구의 위쪽 표면(y=3.4)에서 위 구의 반지름(0.4)만큼 위 → `pos=vector(x, 3.8, 0)`

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

def create_snowman(x):
    """지정된 x 위치에 눈사람을 생성합니다."""
    # 아래 (몸통)
    sphere(pos=vector(x, 1, 0), radius=1, color=color.white)
    # 중간 (배)
    sphere(pos=vector(x, 2.7, 0), radius=0.7, color=color.white)
    # 위 (머리)
    sphere(pos=vector(x, 3.8, 0), radius=0.4, color=color.white)

# 바닥
box(pos=vector(0, -0.05, 0), size=vector(14, 0.1, 6),
    color=vector(0.85, 0.9, 1))

# 눈사람 3개 만들기!
create_snowman(-4)
create_snowman(0)
create_snowman(4)
```

핵심 포인트: "눈사람 하나를 만드는 코드"를 함수로 묶으면, 눈사람을 몇 개든 쉽게 만들 수 있습니다. 반복되는 패턴을 발견하고 함수로 추출하는 것이 **추상화(Abstraction)** 의 핵심입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐)

> **문제**: 아래 조건에 맞는 **나만의 공장 함수**를 만들고, 그것을 활용한 장면을 만들어 보세요.

**규칙**:
- 함수 이름은 `create_`로 시작할 것 (예: `create_robot`, `create_flower`, `create_car`)
- 매개변수를 **3개 이상** 사용할 것
- 그 중 하나는 **기본값 매개변수**일 것
- 독스트링을 포함할 것
- 이 함수를 **`for` 루프와 결합**하여 여러 개의 물체를 만들 것

**아이디어가 안 떠오른다면**:
- `create_flower(x, z, petal_color, height=1)` — 꽃 (원기둥 줄기 + 구 꽃잎들)
- `create_lamp(x, z, lamp_height, light_color=color.yellow)` — 디자인 조명
- `create_robot(x, z, body_color, head_size=0.5)` — 간단한 로봇

<details>
<summary>🔑 예시 답안: 꽃밭 생성기</summary>

```python
from vpython import *
from random import uniform, choice

def create_flower(x, z, petal_color, height=1.5):
    """지정된 위치에 꽃 한 송이를 생성합니다.

    x: 꽃의 x 좌표
    z: 꽃의 z 좌표
    petal_color: 꽃잎의 색상
    height: 줄기의 높이 (기본값: 1.5)
    """
    # 줄기
    cylinder(pos=vector(x, 0, z),
             axis=vector(0, height, 0),
             radius=0.03,
             color=color.green)
    # 꽃 중심
    sphere(pos=vector(x, height, z),
           radius=0.12,
           color=color.yellow)
    # 꽃잎 4개 (동서남북)
    for dx, dz in [(0.15, 0), (-0.15, 0), (0, 0.15), (0, -0.15)]:
        sphere(pos=vector(x + dx, height, z + dz),
               radius=0.1,
               color=petal_color)

# 바닥 (잔디)
box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 10),
    color=vector(0.2, 0.7, 0.2))

# 랜덤 꽃밭 생성!
flower_colors = [color.red, color.magenta, color.orange,
                 vector(1, 0.4, 0.7), color.purple]

for i in range(30):
    fx = uniform(-4, 4)
    fz = uniform(-4, 4)
    fc = choice(flower_colors)
    fh = uniform(0.8, 2.0)
    create_flower(fx, fz, fc, fh)
```

이것은 하나의 예시일 뿐입니다. 여러분만의 창의적인 공장 함수를 만들어 보세요!

</details>

---

## ⚠️ 자주 하는 실수

함수를 처음 배울 때 누구나 하는 실수들입니다. 미리 알아두면 시간을 아낄 수 있습니다!

**실수 1: 함수를 정의만 하고 호출하지 않음**

```python
# ❌ 정의만 했으니 아무 일도 일어나지 않습니다
from vpython import *

def make_ball():
    sphere(color=color.red)

# 여기서 끝나면 공이 안 나타남!
```

```python
# ✅ 정의한 뒤 반드시 호출해야 합니다
from vpython import *

def make_ball():
    sphere(color=color.red)

make_ball()    # 이 줄이 있어야 공이 나타남!
```

> 함수 정의는 "레시피를 적는 것"이고, 함수 호출은 "레시피대로 만드는 것"입니다. 적기만 하고 만들지 않으면 아무 일도 안 됩니다!

**실수 2: 들여쓰기를 빠뜨림**

```python
# ❌ 들여쓰기가 없으면 함수 본문이 아니라 별개의 코드로 인식됩니다
from vpython import *

def make_ball():
sphere(color=color.red)    # IndentationError!
```

```python
# ✅ 함수 본문은 반드시 4칸 들여쓰기
from vpython import *

def make_ball():
    sphere(color=color.red)    # 4칸 들여쓰기!
```

> 파이썬은 들여쓰기로 코드 블록을 구분합니다. `def` 아래의 코드는 반드시 들여쓰기 해야 합니다.

**실수 3: 매개변수와 인자의 개수가 다름**

```python
# ❌ 매개변수 3개인데 인자를 2개만 전달
from vpython import *

def make_ball(x, y, ball_color):
    sphere(pos=vector(x, y, 0), color=ball_color)

make_ball(1, 2)    # TypeError: 인자가 부족합니다!
```

```python
# ✅ 매개변수 수에 맞게 인자를 전달
from vpython import *

def make_ball(x, y, ball_color):
    sphere(pos=vector(x, y, 0), color=ball_color)

make_ball(1, 2, color.red)    # 정확히 3개!
```

> 함수를 호출할 때, 기본값이 없는 매개변수에는 반드시 인자를 전달해야 합니다.

**실수 4: return 값을 저장하지 않음**

```python
# ❌ return 값을 받지 않으면 결과가 사라집니다
from vpython import *

def distance(a, b):
    return mag(b.pos - a.pos)

ball1 = sphere(pos=vector(0, 0, 0))
ball2 = sphere(pos=vector(3, 4, 0))

distance(ball1, ball2)     # 계산은 되지만 결과를 저장하지 않음!
print(distance(ball1, ball2))  # 이렇게 하거나
```

```python
# ✅ return 값을 변수에 저장하여 활용
from vpython import *

def distance(a, b):
    return mag(b.pos - a.pos)

ball1 = sphere(pos=vector(0, 0, 0))
ball2 = sphere(pos=vector(3, 4, 0))

d = distance(ball1, ball2)    # 변수에 저장!
print(f"거리: {d}")           # 거리: 5.0
```

> `return`으로 돌려준 값은 변수에 저장해야 나중에 활용할 수 있습니다.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다.

- [ ] **`def`로 함수를 정의할 수 있나요?** 함수 이름, 괄호, 콜론, 들여쓰기를 올바르게 쓸 수 있나요?
- [ ] **함수의 "정의"와 "호출"의 차이를 설명할 수 있나요?** → 정의는 레시피를 적는 것, 호출은 레시피대로 만드는 것
- [ ] **매개변수와 인자의 차이를 알고 있나요?** → 매개변수는 함수 정의 시 변수명, 인자는 호출 시 실제 값
- [ ] **`return`이 하는 일을 설명할 수 있나요?** → 함수의 결과를 호출한 곳으로 돌려보냄
- [ ] **기본값 매개변수를 사용할 수 있나요?** → `def f(x, y=0):` 형태로, 호출 시 y를 생략하면 0이 사용됨
- [ ] **반복되는 코드를 함수로 묶을 수 있나요?** → 비슷한 코드가 반복되면 함수로 추출하기
- [ ] **함수 안에서 다른 함수를 호출할 수 있나요?** → `generate_city()` 안에서 `create_building()` 호출하듯이

> 💪 체크가 5개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 도시에 도로 추가하기

`create_road(x1, z1, x2, z2)` 함수를 만들어 빌딩 사이에 도로를 깔아 보세요. `box()`를 이용하면 됩니다. 도로의 색상은 진한 회색, 중앙선은 노란색으로 해 보세요.

```python
from vpython import *

def create_road(x1, z1, x2, z2, width=0.6):
    """두 좌표 사이에 도로를 생성합니다."""
    mid_x = (x1 + x2) / 2
    mid_z = (z1 + z2) / 2
    length = ((x2 - x1)**2 + (z2 - z1)**2)**0.5

    # 도로 본체 (진한 회색)
    box(pos=vector(mid_x, 0.01, mid_z),
        size=vector(length, 0.02, width),
        color=vector(0.3, 0.3, 0.3))
    # 중앙선 (노란색)
    box(pos=vector(mid_x, 0.02, mid_z),
        size=vector(length, 0.01, 0.05),
        color=color.yellow)
```

이 함수를 앞서 만든 도시 코드에 추가해 보세요!

### 도전 2: create_building에 반환값 추가하기

현재 `create_building()` 함수는 빌딩을 만들기만 합니다. 만든 빌딩의 본체(box 물체)를 `return`으로 돌려주도록 수정하면, 나중에 빌딩을 움직이거나 색상을 바꿀 수 있습니다.

```python
from vpython import *

def create_building(x, z, height, building_color):
    """빌딩을 생성하고, 본체 물체를 반환합니다."""
    body = box(pos=vector(x, height / 2, z),
               size=vector(1, height, 1),
               color=building_color)
    return body    # 본체를 돌려준다!

# 반환값을 저장하면 나중에 조작 가능
my_building = create_building(0, 0, 5, color.cyan)
print(f"빌딩 높이: {my_building.size.y}")
```

### 도전 3: 함수를 조합한 미니 게임

지금까지 배운 함수 + 이전 장에서 배운 키보드 입력 + `while` 루프 + `dt`를 결합하여 미니 게임을 만들어 보세요. 예를 들어: 키보드로 캐릭터를 움직이면서, 함수로 생성된 장애물을 피하는 게임은 어떨까요?

---

## 🔗 다음 장으로

이번 장에서 우리는 프로그래밍에서 가장 중요한 도구인 **함수**를 배웠습니다.

**배운 것 정리**:
- `def`로 함수를 정의하고, 함수 이름으로 호출한다
- 매개변수로 함수에 재료를 전달하고, `return`으로 결과를 돌려받는다
- 기본값 매개변수로 자주 쓰는 값을 미리 설정할 수 있다
- 독스트링으로 함수에 설명서를 달 수 있다
- 반복되는 코드를 함수로 묶으면, 코드가 짧아지고 관리하기 쉬워진다
- 함수 안에서 다른 함수를 호출하여 복잡한 프로그램을 구조화할 수 있다

함수를 쓰니 코드가 훨씬 깔끔하고 강력해졌죠? 하지만 도시 생성기에서 아쉬운 점이 하나 있습니다. 프로그램이 실행된 뒤에는 사용자가 아무것도 바꿀 수 없다는 것입니다. "빌딩 높이를 슬라이더로 조절할 수 있다면?", "버튼을 누르면 새 도시가 생성된다면?" 이런 생각이 들지 않나요?

**다음 장 "위젯 — 사용자와 상호작용하기"** 에서는 슬라이더, 버튼, 메뉴 같은 **위젯(widget)** 을 배워서, 사용자가 프로그램과 대화할 수 있는 인터랙티브한 프로그램을 만듭니다. 여러분의 도시 생성기에 컨트롤 패널을 달아 볼 시간입니다!

> 🌟 **오늘의 한마디**: 함수는 프로그래머의 가장 강력한 무기입니다. 코드를 함수로 나누는 순간, 여러분은 단순히 "코드를 쓰는 사람"에서 "프로그램을 설계하는 사람"으로 한 단계 성장합니다. 오늘 여러분은 함수 하나로 도시를 만들었습니다. 다음엔 어떤 세상을 만들어 볼까요?
