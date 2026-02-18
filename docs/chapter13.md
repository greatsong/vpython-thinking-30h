# Ch.13 — 함수: 나만의 명령어

**Part 5: 설계와 완성** | 핵심: `def`, 매개변수

---

## 🎬 오늘의 장면

초록 나무 50그루가 울창한 숲을 이루고 있습니다.
나무마다 위치와 크기가 조금씩 다르고, 갈색 기둥 위에 초록 잎이 얹혀 있어요.

<div class="glowscript-demo" markdown>
<div class="demo-label">마우스로 돌려보세요! — 새로고침할 때마다 다른 숲</div>
<iframe src="../demos/ch13_scene.html"></iframe>
</div>

**이 숲은 코드 15줄로 만들었습니다.**

나무 한 그루를 만드는 코드가 3줄이면, 나무 50그루는... 150줄?
아닙니다. **함수** 덕분에 나무 한 그루를 만드는 코드를 한 번만 작성하고, 50번 **재사용**했습니다.

---

## 🔍 코드 읽기 챌린지

아래 코드를 **실행하지 말고** 읽어 보세요.

```python
GlowScript 3.2 VPython
def make_ball(x):
    sphere(pos=vector(x, 0, 0), color=color.red)

make_ball(-2)
make_ball(0)
make_ball(2)
```

??? question "화면에 무엇이 보일까요?"

    **빨간 공 3개**가 x = -2, 0, 2 위치에 나란히 나타납니다.

    - `def make_ball(x):` → `make_ball`이라는 **나만의 명령어**를 만든다
    - `x` → 호출할 때 넘겨주는 값(매개변수)
    - `make_ball(-2)` → x에 -2가 들어가서 `vector(-2, 0, 0)` 위치에 공이 생긴다

    **핵심**: `make_ball`을 3번 호출했지만, 공을 만드는 코드는 **한 번만** 작성했습니다!

그러면 이건 어떨까요?

```python
GlowScript 3.2 VPython
def make_ball(x, c):
    sphere(pos=vector(x, 0, 0), color=c)

make_ball(-2, color.red)
make_ball(0, color.blue)
make_ball(2, color.green)
```

??? question "이번에는 무엇이 달라졌나요?"

    매개변수가 **2개**로 늘었습니다 — `x`(위치)와 `c`(색상).

    - `make_ball(-2, color.red)` → x=-2, c=빨강
    - `make_ball(0, color.blue)` → x=0, c=파랑
    - `make_ball(2, color.green)` → x=2, c=초록

    **빨강, 파랑, 초록** 공이 나란히 나타납니다.
    매개변수를 추가하면 함수가 더 **유연**해집니다.

---

## 🛠️ 직접 만들어보기

### 실험 1: 첫 번째 함수 — 나무 한 그루

나무는 **갈색 기둥**(cylinder) + **초록 잎**(cone)으로 만들 수 있습니다.

```python
GlowScript 3.2 VPython
cylinder(pos=vector(0, 0, 0), axis=vector(0, 2, 0),
    radius=0.2, color=color.orange)
cone(pos=vector(0, 2, 0), axis=vector(0, 2, 0),
    radius=1, color=color.green)
```

기둥과 잎을 합치면 나무 한 그루! 그런데 나무를 5그루 만들려면 이 코드를 5번 복사해야 할까요?

**함수로 묶어 봅시다.**

```python
GlowScript 3.2 VPython
def make_tree(x, z):
    cylinder(pos=vector(x, 0, z), axis=vector(0, 2, 0),
        radius=0.2, color=color.orange)
    cone(pos=vector(x, 2, z), axis=vector(0, 2, 0),
        radius=1, color=color.green)

make_tree(0, 0)
```

나무 한 그루가 나타납니다. 이제 위치만 바꿔서 여러 그루를 만들어 보세요!

!!! tip "실험: 나무 3그루"

    `make_tree(0, 0)` 아래에 두 줄을 추가해 보세요:

    ```python
    make_tree(-3, 0)
    make_tree(3, 0)
    ```

    나무 3그루가 나란히 서 있나요?
    **코드를 복사하지 않고** 함수 호출만으로 나무를 늘렸습니다!

---

### 실험 2: 매개변수 추가 — 크기가 다른 나무

모든 나무가 같은 크기면 밋밋하죠. **높이**를 매개변수로 추가해 봅시다.

```python
GlowScript 3.2 VPython
def make_tree(x, z, h):
    cylinder(pos=vector(x, 0, z), axis=vector(0, h, 0),
        radius=0.2, color=color.orange)
    cone(pos=vector(x, h, z), axis=vector(0, h, 0),
        radius=1, color=color.green)

make_tree(-3, 0, 1)
make_tree(0, 0, 2)
make_tree(3, 0, 3)
```

왼쪽부터 작은 나무, 중간 나무, 큰 나무!

!!! tip "실험: 매개변수 하나 더"

    잎의 색도 매개변수로 만들어 보세요.

    `def make_tree(x, z, h, c):` 로 바꾸고,
    `cone`의 `color=color.green`을 `color=c`로 바꾸면 됩니다.

    ```python
    make_tree(-3, 0, 1, color.green)
    make_tree(0, 0, 2, color.orange)
    make_tree(3, 0, 3, color.red)
    ```

    초록, 주황, 빨강 — 가을 나무가 완성됩니다!

---

### 실험 3: 점진적 확장 — 나무 줄에서 숲으로

**1단계: 나무 한 줄 (1D)**

for 반복문과 함수를 함께 쓰면 나무 한 줄을 만들 수 있습니다.

```python
GlowScript 3.2 VPython
def make_tree(x, z, h):
    cylinder(pos=vector(x, 0, z), axis=vector(0, h, 0),
        radius=0.2, color=color.orange)
    cone(pos=vector(x, h, z), axis=vector(0, h, 0),
        radius=1, color=color.green)

for i in range(5):
    make_tree(i * 3, 0, 2)
```

나무 5그루가 x 방향으로 한 줄! `i * 3`은 나무 사이 간격입니다.

**2단계: 숲 (2D)**

for문을 하나 더 추가하면?

```python
GlowScript 3.2 VPython
def make_tree(x, z, h):
    cylinder(pos=vector(x, 0, z), axis=vector(0, h, 0),
        radius=0.2, color=color.orange)
    cone(pos=vector(x, h, z), axis=vector(0, h, 0),
        radius=1, color=color.green)

for i in range(5):
    for j in range(5):
        make_tree(i * 3, j * 3, 2)
```

5 x 5 = 나무 **25그루**! 숲이 완성되었습니다.

함수 없이 이걸 만들려면? 나무 한 그루에 2줄 x 25그루 = **50줄**.
함수를 쓰면? 함수 정의 4줄 + for문 3줄 = **7줄**.

---

## 🔄 역추적 챌린지

**장면**: 빨간 공, 파란 공, 초록 공이 y축 방향으로 세로로 나란히 있습니다. 세 공의 크기는 아래가 크고 위로 갈수록 작아집니다.

<div class="scene-preview">
  <div class="obj" style="left: 43%; top: 58%; width: 60px; height: 60px; background: radial-gradient(circle at 35% 35%, #ff6b6b, #c0392b);"></div>
  <div class="obj" style="left: 45%; top: 33%; width: 44px; height: 44px; background: radial-gradient(circle at 35% 35%, #74b9ff, #2980b9);"></div>
  <div class="obj" style="left: 47%; top: 14%; width: 30px; height: 30px; background: radial-gradient(circle at 35% 35%, #55efc4, #00b894);"></div>
</div>

**조건**: `make_ball`이라는 함수를 만들어서 사용하세요.

**생각의 순서**:

1. 함수에 필요한 매개변수는? → 위치(y), 크기(r), 색(c)
2. 함수 안에는 어떤 코드? → sphere 하나
3. 호출은 몇 번? → 3번

??? hint "힌트"

    ```python
    def make_ball(y, r, c):
        sphere(pos=vector(0, ???, 0), radius=???, color=???)
    ```

    매개변수를 sphere의 속성에 연결하세요.

??? success "정답 예시"

    ```python
    GlowScript 3.2 VPython
    def make_ball(y, r, c):
        sphere(pos=vector(0, y, 0), radius=r, color=c)

    make_ball(0, 1.2, color.red)
    make_ball(2, 0.8, color.blue)
    make_ball(3.5, 0.5, color.green)
    ```

    y값과 radius의 정확한 숫자는 달라도 괜찮아요!
    핵심은 **함수를 정의하고 매개변수로 변화를 주는 구조**입니다.

---

## 📖 알고 넘어가기

!!! note "def — 함수 정의하기"

    ```python
    def 함수이름(매개변수1, 매개변수2):
        실행할 코드
        실행할 코드
    ```

    - **def** — "define"의 줄임말. "이런 함수를 정의하겠다!"
    - **매개변수** — 함수에 전달하는 값. 호출할 때 채워 넣는다
    - **들여쓰기** — 함수에 속하는 코드는 반드시 4칸(또는 탭) 들여쓴다
    - 정의만으로는 아무 일도 안 일어남. **호출**해야 실행된다

!!! note "함수의 장점"

    - **재사용**: 같은 코드를 반복 작성할 필요 없음
    - **수정 용이**: 나무 모양을 바꾸고 싶으면 함수 하나만 고치면 전체 숲이 바뀜
    - **가독성**: `make_tree(3, 5, 2)`만 봐도 "아, 나무를 만드는구나" 알 수 있음

??? question "return은 뭔가요?"

    함수가 **값을 돌려주는** 키워드입니다.

    ```python
    def double(n):
        return n * 2
    ```

    `double(5)` → 10을 돌려줍니다.

    이 교재에서는 3D 물체를 만드는 함수를 주로 쓰기 때문에
    return 없이도 충분합니다. 하지만 알아두면 유용해요!

---

## 🐛 버그 사냥

아래 코드에는 각각 버그가 하나씩 있어요. 찾아서 고쳐 보세요!

!!! bug "버그 1"

    ```python
    GlowScript 3.2 VPython
    def make_ball(x, c)
        sphere(pos=vector(x, 0, 0), color=c)

    make_ball(0, color.red)
    ```

??? success "정답"

    `def make_ball(x, c)` → `def make_ball(x, c):` — 콜론(`:`)이 빠졌습니다!

    `def` 줄 끝에는 반드시 콜론이 있어야 해요. if문, for문과 같은 규칙입니다.

!!! bug "버그 2"

    ```python
    GlowScript 3.2 VPython
    def make_ball(x, c):
    sphere(pos=vector(x, 0, 0), color=c)

    make_ball(0, color.red)
    ```

??? success "정답"

    `sphere(...)` 줄이 **들여쓰기**되지 않았습니다!

    ```python
    def make_ball(x, c):
        sphere(pos=vector(x, 0, 0), color=c)
    ```

    함수 안의 코드는 반드시 들여쓰기해야 합니다. 안 하면 파이썬은 이 줄이 함수 밖이라고 생각해요.

!!! bug "버그 3"

    ```python
    GlowScript 3.2 VPython
    def make_ball(x, c):
        sphere(pos=vector(x, 0, 0), color=c)

    make_ball(0)
    ```

??? success "정답"

    `make_ball(0)` → 매개변수가 **1개** 부족합니다!

    함수를 `(x, c)` 두 개로 정의했으니, 호출할 때도 두 개를 넘겨야 해요:

    ```python
    make_ball(0, color.red)
    ```

    매개변수 개수가 맞지 않으면 에러가 납니다.

---

## 💡 상상 챌린지

**미션: 함수를 만들어서 마을을 건설하세요!**

`make_house(x, z)`라는 함수를 만들어서 집을 여러 채 짓는 겁니다.

집 한 채 = 상자(box) + 지붕(cone 또는 pyramid)

아이디어:

- **기본 마을** — 집 3채를 나란히
- **마을 + 숲** — `make_house`와 `make_tree`를 함께 사용
- **격자 마을** — for문 2개로 5 x 5 격자에 집 배치

**규칙**: `def`를 최소 1번 사용, 함수 호출 최소 3번. 나머지는 자유!

??? success "예시: 기본 마을"

    ```python
    GlowScript 3.2 VPython
    def make_house(x, z):
        box(pos=vector(x, 0.5, z),
            size=vector(1, 1, 1), color=color.white)
        cone(pos=vector(x, 1, z), axis=vector(0, 0.8, 0),
            radius=0.8, color=color.red)

    make_house(-3, 0)
    make_house(0, 0)
    make_house(3, 0)
    ```

    하얀 벽 + 빨간 지붕 집이 3채!
    여기에 `make_tree` 함수도 추가하면 마을 옆에 나무도 심을 수 있어요.

---

## 📝 오늘의 완성 코드

처음에 보여드렸던 **숲** 장면입니다.

```python
GlowScript 3.2 VPython
# === WHAT: 랜덤 크기 나무 50그루로 숲 만들기 ===
# === WHY: 함수 + for문으로 복잡한 장면을 간결하게 ===

from random import uniform

def make_tree(x, z, h):
    cylinder(pos=vector(x, 0, z), axis=vector(0, h, 0),
        radius=0.15, color=vector(0.5, 0.3, 0.1))
    cone(pos=vector(x, h, z), axis=vector(0, h, 0),
        radius=0.7, color=vector(0, 0.5+uniform(0,0.3), 0))

for i in range(50):
    tx = uniform(-15, 15)
    tz = uniform(-15, 15)
    th = uniform(1, 3)
    make_tree(tx, tz, th)
```

함수 정의 4줄 + 호출부 5줄 = 총 **15줄**로 나무 50그루!
함수가 없었다면 **200줄** 이상이 필요했을 겁니다.

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 50그루 숲 (새로고침마다 다른 숲!)</div>
<iframe src="../demos/ch13_scene.html"></iframe>
</div>

---

## ✅ 3줄 정리

1. **`def`로 나만의 명령어를 만든다** — 반복되는 코드를 함수로 묶으면 한 줄로 호출
2. **매개변수로 변화를 준다** — 위치, 크기, 색 등을 바꿔가며 다양한 결과를 만든다
3. **함수 + for문 = 강력한 조합** — 나무 1그루를 만드는 함수로 숲 전체를 만들 수 있다

---

## 🚀 더 탐험하기

### 탐험 1: 산 모양 지형

나무의 높이를 중앙이 높고 가장자리가 낮게 만들어 보세요.

```python
GlowScript 3.2 VPython
from random import uniform

def make_tree(x, z, h):
    cylinder(pos=vector(x, 0, z), axis=vector(0, h, 0),
        radius=0.15, color=vector(0.5, 0.3, 0.1))
    cone(pos=vector(x, h, z), axis=vector(0, h, 0),
        radius=0.7, color=color.green)

for i in range(7):
    for j in range(7):
        x = (i - 3) * 3
        z = (j - 3) * 3
        dist = (x**2 + z**2)**0.5
        h = max(0.5, 4 - dist * 0.3)
        make_tree(x, z, h)
```

중앙의 나무는 크고, 바깥쪽 나무는 작습니다 — 언덕 위의 숲!

### 탐험 2: 함수 2개 조합

`make_tree`와 `make_rock`(돌멩이) 함수를 모두 만들어서 자연 풍경을 완성해 보세요.

```python
GlowScript 3.2 VPython
def make_rock(x, z):
    sphere(pos=vector(x, 0.2, z), radius=0.3,
        color=vector(0.5, 0.5, 0.5))
```

이 함수를 `make_tree`와 함께 사용하면, 나무 사이사이에 돌이 놓인 숲길을 만들 수 있습니다!

### 탐험 3: 도시 만들기

`make_building(x, z, floors)` 함수를 만들어 보세요. `floors` 매개변수로 건물 층수(높이)를 조절합니다.

- 1층짜리 작은 집부터 10층짜리 빌딩까지
- for문으로 도시 블록을 만들어 보세요
- 높이가 다양하면 더 실감나는 도시가 됩니다!

---

> **다음 시간**: Ch.14에서는 슬라이더와 버튼을 배웁니다. 나무 높이를 슬라이더로 실시간 조절하고, 버튼 하나로 숲을 리셋하는 대시보드를 만들어 봅시다!
