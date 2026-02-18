# Ch.4 — 변수와 계산

**Part 2: 변화와 움직임** | 핵심: `변수`, `연산`, `.속성`

---

## 🎬 오늘의 장면

오늘의 최종 목표입니다. 변수와 연산만으로 이 탑을 만들어 봅니다!

<div class="glowscript-demo" markdown>
<div class="demo-label">오늘의 목표 — 변수로 만든 탑</div>
<iframe src="../demos/ch04_scene.html"></iframe>
</div>

빨간 공 하나가 화면에 떠 있습니다.

```python
GlowScript 3.2 VPython

sphere(pos=vector(0,0,0), radius=0.5, color=color.red)
```

이 공의 색을 파란색으로 바꾸고 싶습니다. 그런데... 어떻게 하죠?

공에게 "야, 너 파란색으로 바뀌어!" 하고 말하고 싶은데, **이름이 없습니다.** 이름이 없으면 부를 수가 없어요. 교실에서 선생님이 "거기 학생!" 하면 누가 돌아볼까요? 아무도 모릅니다. **이름을 불러야 반응합니다.**

오늘 배울 것은 바로 이것입니다. **물체에 이름을 붙이는 법**, 그리고 이름을 불러서 **조종하는 법**.

---

## 🔍 코드 읽기 챌린지

아래 코드를 읽고, 화면에 무엇이 보일지 상상해 보세요.

```python
GlowScript 3.2 VPython

x = 2
y = x + 1

sphere(pos=vector(x, 0, 0), radius=0.3, color=color.red)
sphere(pos=vector(y, 0, 0), radius=0.3, color=color.blue)
```

??? question "빨간 공은 어디에 있을까요?"
    `x = 2`이므로 `vector(2, 0, 0)` 위치입니다. x축으로 오른쪽 2 지점이에요.

??? question "파란 공은 어디에 있을까요?"
    `y = x + 1`에서 `x`는 2니까, `y = 2 + 1 = 3`입니다. `vector(3, 0, 0)` 위치에 파란 공이 보여요.

??? question "두 공 사이의 거리는?"
    빨간 공은 x=2, 파란 공은 x=3. 둘 사이 거리는 **1**입니다. `y - x`와 같죠!

하나 더 읽어 볼까요?

```python
GlowScript 3.2 VPython

a = 1
b = a * 2
c = b + a

sphere(pos=vector(a, 0, 0), radius=0.3, color=color.red)
sphere(pos=vector(b, 0, 0), radius=0.3, color=color.green)
sphere(pos=vector(c, 0, 0), radius=0.3, color=color.blue)
```

??? question "a, b, c 값은 각각 얼마일까요?"
    - `a = 1`
    - `b = a * 2 = 1 * 2 = 2`
    - `c = b + a = 2 + 1 = 3`

    빨간 공은 x=1, 초록 공은 x=2, 파란 공은 x=3에 나란히 서 있습니다.

---

## 🛠️ 직접 만들어보기

### 단계 1: 이름을 붙여서 조종하기

먼저, 공에 이름을 붙여 봅시다.

```python
GlowScript 3.2 VPython

ball = sphere(pos=vector(0,0,0), radius=0.5, color=color.red)
```

`ball`이 바로 **변수**입니다. 공에 "ball"이라는 이름표를 붙인 거예요. 이제 이 이름을 불러서 공의 속성을 바꿀 수 있습니다.

```python
GlowScript 3.2 VPython

ball = sphere(pos=vector(0,0,0), radius=0.5, color=color.red)

ball.color = color.blue
```

실행해 보세요. 빨간 공이 만들어진 뒤, 파란색으로 변합니다! `ball.color`는 "ball의 color"라는 뜻입니다. **점(`.`)은 "~의"라고 읽으면 됩니다.**

!!! tip "변수 = 이름표"
    `ball = sphere(...)` --- sphere에 "ball"이라는 이름표를 붙인다.
    `ball.color = color.blue` --- ball의 색을 파란색으로 바꾼다.

### 단계 2: 위치도 바꿔 보기

```python
GlowScript 3.2 VPython

ball = sphere(pos=vector(0,0,0), radius=0.5, color=color.red)

ball.pos = vector(3, 0, 0)
```

공이 원점에서 오른쪽으로 3만큼 이동했습니다! `ball.pos`는 "ball의 위치(position)"를 뜻해요.

위치의 x값만 꺼내 볼 수도 있습니다.

```python
GlowScript 3.2 VPython

ball = sphere(pos=vector(3, 2, 0), radius=0.5, color=color.red)

print(ball.pos.x)
print(ball.pos.y)
```

??? question "print 결과는?"
    `3`과 `2`가 출력됩니다. `ball.pos.x`는 "ball의 pos의 x"라는 뜻이에요.

### 단계 3: 연산으로 위치 계산하기

변수에 숫자를 저장하고, 연산으로 위치를 계산해 봅시다.

```python
GlowScript 3.2 VPython

gap = 2

ball1 = sphere(pos=vector(0, 0, 0), radius=0.4, color=color.red)
ball2 = sphere(pos=vector(gap, 0, 0), radius=0.4, color=color.green)
ball3 = sphere(pos=vector(gap * 2, 0, 0), radius=0.4, color=color.blue)
```

`gap = 2`로 정해 두면, 공들이 2 간격으로 배치됩니다. `gap`을 3으로 바꿔 보세요. 모든 간격이 한꺼번에 바뀝니다! 숫자를 하나하나 고칠 필요가 없어요.

!!! tip "변수를 쓰는 이유"
    숫자를 직접 쓰면 바꿀 때 여러 곳을 고쳐야 합니다. 변수를 쓰면 **한 곳만 고치면 전부 바뀝니다.**

### 단계 4: 계단 만들기

연산을 활용해서 계단 모양을 만들어 봅시다.

```python
GlowScript 3.2 VPython

step = 1.5

box1 = box(pos=vector(0, 0, 0), size=vector(1, 0.3, 1), color=color.cyan)
box2 = box(pos=vector(step, step * 0.5, 0), size=vector(1, 0.3, 1), color=color.cyan)
box3 = box(pos=vector(step * 2, step * 1, 0), size=vector(1, 0.3, 1), color=color.cyan)
```

`step` 값을 바꿔 보세요. 계단의 폭과 높이가 함께 바뀝니다. `*`는 곱하기, `+`는 더하기입니다.

---

## 🔄 역추적 챌린지

화면에 공 3개가 대각선으로 배치되어 있습니다.

- 빨간 공: `(1, 1, 0)`
- 초록 공: `(2, 2, 0)`
- 파란 공: `(3, 3, 0)`

<div class="scene-preview">
  <div class="obj" style="left: 25%; top: 65%; width: 24px; height: 24px; background: radial-gradient(circle at 35% 35%, #ff6b6b, #c0392b);"></div>
  <div class="obj" style="left: 45%; top: 45%; width: 24px; height: 24px; background: radial-gradient(circle at 35% 35%, #6bff6b, #27ae60);"></div>
  <div class="obj" style="left: 65%; top: 25%; width: 24px; height: 24px; background: radial-gradient(circle at 35% 35%, #6b9fff, #2980b9);"></div>
</div>

패턴이 보이나요? x와 y가 같은 값이고, 1씩 증가합니다.

??? question "변수 `n`을 사용해서 이 패턴을 코드로 작성해 보세요"
    ```python
    GlowScript 3.2 VPython

    n = 1

    sphere(pos=vector(n, n, 0), radius=0.3, color=color.red)
    sphere(pos=vector(n + 1, n + 1, 0), radius=0.3, color=color.green)
    sphere(pos=vector(n + 2, n + 2, 0), radius=0.3, color=color.blue)
    ```
    `n`을 0으로 바꾸면? 모든 공이 한 칸씩 원점 쪽으로 이동합니다!

이번엔 좀 더 어려운 문제입니다. 화면에 이런 장면이 보입니다.

- 작은 공: 위치 `(0, 0, 0)`, 반지름 `0.5`
- 중간 공: 위치 `(0, 1.5, 0)`, 반지름 `1.0`
- 큰 공: 위치 `(0, 4, 0)`, 반지름 `1.5`

<div class="scene-preview">
  <div class="obj" style="left: 45%; top: 15%; width: 65px; height: 65px; background: radial-gradient(circle at 35% 35%, #ffffff, #bdc3c7);"></div>
  <div class="obj" style="left: 43%; top: 45%; width: 45px; height: 45px; background: radial-gradient(circle at 35% 35%, #ffffff, #bdc3c7);"></div>
  <div class="obj" style="left: 44%; top: 68%; width: 28px; height: 28px; background: radial-gradient(circle at 35% 35%, #ffffff, #bdc3c7);"></div>
</div>

??? hint "힌트: 각 공의 y 위치를 잘 보세요"
    작은 공의 y는 0, 중간 공의 y는 1.5, 큰 공의 y는 4.0입니다. 각 공이 아래 공 **위에** 쌓여 있어요. y 위치 = 아래 공들의 반지름 합 + 자기 반지름입니다.

??? success "정답 코드"
    ```python
    GlowScript 3.2 VPython

    r1 = 0.5
    r2 = 1.0
    r3 = 1.5

    sphere(pos=vector(0, 0, 0), radius=r1, color=color.white)
    sphere(pos=vector(0, r1 + r2, 0), radius=r2, color=color.white)
    sphere(pos=vector(0, r1 + r2 * 2 + r3, 0), radius=r3, color=color.white)
    ```
    눈사람처럼 보이지 않나요? `r1`, `r2`, `r3` 값을 바꿔 보세요!

---

## 📖 알고 넘어가기

### 변수란?

변수는 **값에 붙이는 이름표**입니다.

```
x = 5
```

이 코드는 "5라는 값에 `x`라는 이름표를 붙여라"라는 뜻입니다. 이후에 `x`라고 쓰면 5를 의미합니다.

!!! tip "변수에 담을 수 있는 것들"
    - **숫자**: `x = 5`, `gap = 2.5`
    - **물체**: `ball = sphere(...)`, `wall = box(...)`
    - **벡터**: `center = vector(0, 3, 0)`
    - **색**: `my_color = color.red`

### 연산자 4가지

- `+` 더하기: `3 + 2` → `5`
- `-` 빼기: `3 - 2` → `1`
- `*` 곱하기: `3 * 2` → `6`
- `/` 나누기: `6 / 2` → `3`

연산 결과를 변수에 저장할 수도 있습니다.

```
total = 3 + 2
half = total / 2
```

`total`은 5, `half`는 2.5가 됩니다.

### 점(.)으로 속성 접근

물체에 이름을 붙이면, **점(`.`)을 써서 속성에 접근**할 수 있습니다.

- `ball.pos` --- ball의 위치
- `ball.color` --- ball의 색
- `ball.radius` --- ball의 반지름
- `ball.pos.x` --- ball의 위치 중 x 좌표

**읽기**(값 꺼내기)와 **쓰기**(값 바꾸기) 모두 가능합니다.

```
ball.color = color.green
print(ball.pos.x)
```

---

## 🐛 버그 사냥

아래 코드들에는 버그가 숨어 있습니다. 찾아서 고쳐 보세요!

### 버그 1

```python
GlowScript 3.2 VPython

ball = sphere(pos=vector(0,0,0), raduis=0.5, color=color.red)
ball.color = color.blue
```

!!! bug "힌트"
    철자를 꼼꼼히 보세요. `raduis`가 맞나요?

??? success "정답"
    `raduis` → `radius`로 고쳐야 합니다. 오타는 프로그래밍에서 가장 흔한 버그예요!

### 버그 2

```python
GlowScript 3.2 VPython

sphere(pos=vector(0,0,0), radius=0.5, color=color.red)
ball.color = color.blue
```

!!! bug "힌트"
    `ball`이라는 이름을 쓰고 있는데, 어디서 이름을 붙였나요?

??? success "정답"
    첫 줄에서 `ball = sphere(...)`로 이름을 붙여야 합니다. 이름 없이 만든 물체는 나중에 부를 수 없어요!
    ```python
    GlowScript 3.2 VPython

    ball = sphere(pos=vector(0,0,0), radius=0.5, color=color.red)
    ball.color = color.blue
    ```

### 버그 3

```python
GlowScript 3.2 VPython

x = 3
y = X + 1
sphere(pos=vector(y, 0, 0), radius=0.5, color=color.red)
```

!!! bug "힌트"
    변수 이름의 대소문자를 확인해 보세요.

??? success "정답"
    `X`를 `x`로 바꿔야 합니다. Python에서 `x`와 `X`는 **완전히 다른 이름**입니다!

### 버그 4

```python
GlowScript 3.2 VPython

ball = sphere(pos=vector(0,0,0), radius=0.5, color=color.red)
ball.pos.x = ball.pos.x + 2
ball.pos.y == 3
```

!!! bug "힌트"
    마지막 줄의 `==`는 무엇일까요?

??? success "정답"
    `==`는 "같은지 비교"이고, `=`는 "값을 넣기"입니다. `ball.pos.y == 3`은 비교만 할 뿐 값을 바꾸지 않습니다. `ball.pos.y = 3`으로 고쳐야 해요.

---

## 💡 상상 챌린지

### 미션: 좌우 대칭 장면 만들기

변수와 연산을 활용해서, **원점을 기준으로 좌우 대칭인 장면**을 만들어 보세요.

아이디어: 왼쪽에 공을 하나 놓고, 같은 거리만큼 오른쪽에도 공을 놓으면 대칭이 됩니다.

```python
GlowScript 3.2 VPython

d = 3
ball_left = sphere(pos=vector(-d, 0, 0), radius=0.5, color=color.red)
ball_right = sphere(pos=vector(d, 0, 0), radius=0.5, color=color.blue)
```

`-d`와 `d`를 사용하면 자동으로 대칭이 되죠! `d` 값만 바꾸면 대칭 거리가 바뀝니다.

이것을 확장해 보세요.

??? hint "확장 아이디어"
    - 공 사이에 기둥(cylinder)을 세워 보세요
    - 위아래로도 대칭을 만들어 보세요 (`-h`와 `h` 사용)
    - 공 대신 상자나 원뿔로 바꿔 보세요

??? success "확장 예시: 대칭 구조물"
    ```python
    GlowScript 3.2 VPython

    d = 3
    h = 2

    sphere(pos=vector(-d, h, 0), radius=0.4, color=color.red)
    sphere(pos=vector(d, h, 0), radius=0.4, color=color.red)
    cylinder(pos=vector(-d, 0, 0), axis=vector(0, h, 0), radius=0.1)
    cylinder(pos=vector(d, 0, 0), axis=vector(0, h, 0), radius=0.1)
    box(pos=vector(0, h + 0.5, 0), size=vector(d * 2, 0.3, 1), color=color.cyan)
    ```
    두 기둥 위에 지붕이 얹혀진 모양입니다! `d`와 `h`를 바꿔 보세요.

---

## 📝 오늘의 완성 코드

이번 챕터에서 배운 모든 것을 합쳐서, **변수와 연산으로 만드는 탑**을 완성해 봅시다.

```python
GlowScript 3.2 VPython

# 📝 기본 설정
scene.background = vector(0.9, 0.95, 1)  # 하늘색 배경

# 📝 크기 변수 — 이 값들만 바꾸면 탑 전체가 변합니다
w = 2          # 탑의 폭
h = 0.4        # 층의 높이
gap = 0.05     # 층 사이 간격

# 📝 1층: 가장 넓은 바닥
floor1 = box(pos=vector(0, 0, 0), size=vector(w, h, w), color=color.orange)

# 📝 2층: 폭을 3/4로 줄임
floor2 = box(pos=vector(0, h + gap, 0), size=vector(w * 0.75, h, w * 0.75), color=color.yellow)

# 📝 3층: 폭을 절반으로 줄임
floor3 = box(pos=vector(0, (h + gap) * 2, 0), size=vector(w * 0.5, h, w * 0.5), color=color.green)

# 📝 꼭대기 장식: 작은 공
top = sphere(pos=vector(0, (h + gap) * 3, 0), radius=w * 0.15, color=color.red)
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 변수로 만든 탑</div>
<iframe src="../demos/ch04_final.html"></iframe>
</div>

이 코드에서 **`w`를 3으로 바꿔 보세요**. 탑 전체가 커집니다! `h`를 0.8로 바꾸면 층이 두꺼워집니다. 변수 덕분에 숫자 하나만 고치면 전체 비율이 유지됩니다.

!!! tip "변수를 쓰면 좋은 점"
    - 한 곳만 고치면 전부 바뀐다
    - 코드가 읽기 쉬워진다 (`w * 0.75`는 "폭의 75%"라는 뜻)
    - 실험이 쉽다 (값을 바꿔가며 결과를 확인)

---

## ✅ 3줄 정리

!!! tip "오늘 배운 것"
    1. **변수**는 값에 이름표를 붙이는 것. `ball = sphere(...)`로 물체에 이름을 붙이면 나중에 조종할 수 있다.
    2. **연산자** `+`, `-`, `*`, `/`로 위치와 크기를 계산할 수 있다. 변수를 쓰면 한 곳만 고쳐도 전체가 바뀐다.
    3. **점(`.`)**으로 속성에 접근한다. `ball.color`, `ball.pos`, `ball.pos.x`처럼 읽고 쓸 수 있다.

---

## 🚀 더 탐험하기

여유가 있다면 도전해 보세요!

??? question "도전 1: 피라미드 만들기"
    상자 5개를 쌓아 피라미드를 만들어 보세요. 아래층은 넓고, 위로 갈수록 좁아집니다. 변수 `w`(폭)와 `shrink`(줄어드는 비율)를 써 보세요.

??? question "도전 2: 변수로 색 만들기"
    `r`, `g`, `b` 세 변수를 만들어서 `color=vector(r, g, b)`로 색을 지정해 보세요. `r`만 바꾸면 어떤 색이 될까요?

??? question "도전 3: 거리 계산"
    두 공을 만들고, 각각의 `pos.x`를 변수에 저장하세요. 두 공 사이 거리를 `distance = x2 - x1`으로 계산한 뒤, 그 거리만큼 긴 cylinder를 두 공 사이에 놓아 보세요.

---

> **다음 시간**: Ch.5에서는 `random()`을 배웁니다. 같은 코드인데 실행할 때마다 다른 결과가 나오는 마법! 매번 다른 위치, 색, 크기를 만들어 봅시다.
