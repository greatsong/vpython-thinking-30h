# Ch.12 — 리스트: 물체를 모아서

**Part 4: 패턴과 구조** | 핵심: `list`, `append`, `for+list`

---

## 🎬 오늘의 장면

공 20개가 사방으로 움직이며 벽에 부딪히면 튕깁니다.
빨간 공, 파란 공, 노란 공... 모두 제각각 다른 속도로 돌아다녀요!

**이 장면을 개별 변수로 만들면?**

- 공 변수 20개: `ball1`, `ball2`, `ball3`, ... `ball20`
- 속도 변수 20개: `vel1`, `vel2`, `vel3`, ... `vel20`
- 벽 튕기기 코드 20번 복붙

**변수 40개, 복붙 20번.** 생각만 해도 끔찍하죠?

**리스트를 쓰면 코드 몇 줄이면 됩니다.**

<div class="glowscript-demo" markdown>
<div class="demo-label">공 20개가 벽에 튕기며 움직입니다!</div>
<iframe src="../demos/ch12_scene.html"></iframe>
</div>

---

## 🔍 코드 읽기 챌린지

아래 코드를 **실행하지 말고** 읽어 보세요.

```python
GlowScript 3.2 VPython
balls = []
balls.append(sphere(pos=vector(-2, 0, 0), color=color.red))
balls.append(sphere(pos=vector(0, 0, 0), color=color.blue))
balls.append(sphere(pos=vector(2, 0, 0), color=color.green))
```

<div class="code-result" markdown>
**실행 결과**: 빨간 공, 파란 공, 초록 공 3개가 나란히 나타납니다. 세 공 모두 `balls`라는 하나의 리스트 안에 들어 있습니다.
</div>

??? question "화면에 무엇이 보일까요?"

    **빨간 공, 파란 공, 초록 공** 3개가 나란히 나타납니다.

    - `balls = []` → 빈 리스트를 만든다
    - `balls.append(...)` → 리스트에 공을 하나씩 추가한다
    - 공 3개가 모두 `balls`라는 하나의 이름 안에 들어 있습니다!

그러면 이건 어떨까요?

```python
GlowScript 3.2 VPython
balls = []
balls.append(sphere(pos=vector(-2, 0, 0), color=color.red))
balls.append(sphere(pos=vector(0, 0, 0), color=color.blue))
balls.append(sphere(pos=vector(2, 0, 0), color=color.green))
print(balls[0].pos)
print(balls[2].color)
```

??? question "print가 출력하는 값은?"

    - `balls[0].pos` → `<-2, 0, 0>` (빨간 공의 위치)
    - `balls[2].color` → `<0, 1, 0>` (초록 공의 색)

    리스트에서 꺼낼 때는 `[번호]`를 씁니다.
    **번호는 0부터 시작**해요! 첫 번째가 0, 두 번째가 1, 세 번째가 2.

---

## 🛠️ 직접 만들어보기

### 실험 1: 리스트 만들고 접근하기

Ch.10에서 아이템 3개를 만들려면 변수 3개가 필요했죠? 리스트로 바꿔 봅시다.

```python
GlowScript 3.2 VPython
balls = []
balls.append(sphere(pos=vector(-3, 0, 0), color=color.red, radius=0.5))
balls.append(sphere(pos=vector(0, 0, 0), color=color.blue, radius=0.5))
balls.append(sphere(pos=vector(3, 0, 0), color=color.green, radius=0.5))
```

실행하면 공 3개가 나란히 나타납니다. 이제 리스트로 접근해 봅시다.

!!! tip "실험: 리스트 접근"

    아래 코드를 마지막에 추가해 보세요.

    ```python
    balls[0].color = color.yellow
    balls[1].radius = 1.0
    balls[2].pos = vector(3, 2, 0)
    ```

    - 첫 번째 공이 노란색으로 변했나요?
    - 두 번째 공이 커졌나요?
    - 세 번째 공이 위로 올라갔나요?

    `balls[번호]`로 접근하면 개별 공을 자유롭게 조종할 수 있습니다!

---

### 실험 2: for문으로 리스트에 공 추가하기

공 3개는 직접 적어도 괜찮지만, 10개라면? Ch.11에서 배운 `for`와 `range()`를 활용합시다.

```python
GlowScript 3.2 VPython
balls = []
for i in range(10):
    x = -5 + i * 1.2
    ball = sphere(pos=vector(x, 0, 0), radius=0.4, color=color.cyan)
    balls.append(ball)
```

공 10개가 일렬로 나타납니다! `for`문이 돌 때마다 공을 만들어서 리스트에 넣었어요.

!!! tip "실험: 개수 바꾸기"

    `range(10)` → `range(20)`으로 바꿔 보세요.

    코드는 한 글자만 바꿨는데 공이 20개로 늘어납니다!
    **개별 변수였다면 10줄을 더 써야 했을 거예요.**

---

### 실험 3: 모든 공 동시에 움직이기

리스트의 진짜 힘은 여기서 나옵니다. `for ball in balls`로 전부 동시에 움직여 봅시다.

```python
GlowScript 3.2 VPython
balls = []
for i in range(10):
    x = -5 + i * 1.2
    ball = sphere(pos=vector(x, 0, 0), radius=0.4, color=color.cyan)
    balls.append(ball)
```

!!! tip "아래 코드를 이어서 추가하세요"

    ```python
    while True:
        rate(60)
        for ball in balls:
            ball.pos.x += 0.02
    ```

    공 10개가 **한꺼번에** 오른쪽으로 움직입니다!

    `for ball in balls` — 리스트 안의 공을 하나씩 꺼내서 같은 동작을 시킵니다.
    10개든 100개든 이 3줄이면 전부 움직여요.

---

### 실험 4: 개별 속도 부여하기

모든 공이 같은 방향으로 움직이면 심심하죠? 각 공에 다른 속도를 줘 봅시다.

```python
GlowScript 3.2 VPython
from random import uniform
balls = []
vels = []
for i in range(10):
    x = -5 + i * 1.2
    ball = sphere(pos=vector(x, 0, 0), radius=0.4, color=color.cyan)
    balls.append(ball)
    vels.append(vector(uniform(-0.05, 0.05), uniform(-0.05, 0.05), 0))
```

!!! tip "아래 코드를 이어서 추가하세요"

    ```python
    while True:
        rate(60)
        for i in range(len(balls)):
            balls[i].pos += vels[i]
    ```

    공마다 다른 방향, 다른 속도로 움직입니다!

    핵심은 **리스트 2개를 같은 번호로 연결**한 것입니다.
    `balls[i]`의 속도가 `vels[i]` — 번호가 짝을 이룹니다.

---

### 실험 5: 벽 튕기기 추가

공이 화면 밖으로 사라지면 안 되겠죠? Ch.7에서 배운 `if`문으로 벽 튕기기를 추가합시다.

!!! tip "while 루프 안을 이렇게 바꿔 보세요"

    ```python
    while True:
        rate(60)
        for i in range(len(balls)):
            balls[i].pos += vels[i]
            if abs(balls[i].pos.x) > 5:
                vels[i].x = -vels[i].x
            if abs(balls[i].pos.y) > 3:
                vels[i].y = -vels[i].y
    ```

    공 10개가 벽에 부딪히며 튕깁니다!

    **개별 변수였다면?** 이 if문을 10번 복붙해야 했을 거예요.
    리스트 + for문 덕분에 **한 번만** 쓰면 전부 적용됩니다.

---

## 🔄 역추적 챌린지

이번에는 **거꾸로**. 결과를 보고 코드를 작성해 보세요.

**장면**: 빨간 공 5개가 세로로 나란히 떠 있습니다. 모두 오른쪽으로 함께 움직입니다.

<div class="scene-preview">
  <div class="obj" style="left: 40%; top: 10%; width: 30px; height: 30px; background: radial-gradient(circle at 35% 35%, #ff6b6b, #c0392b);"></div>
  <div class="obj" style="left: 40%; top: 28%; width: 30px; height: 30px; background: radial-gradient(circle at 35% 35%, #ff6b6b, #c0392b);"></div>
  <div class="obj" style="left: 40%; top: 46%; width: 30px; height: 30px; background: radial-gradient(circle at 35% 35%, #ff6b6b, #c0392b);"></div>
  <div class="obj" style="left: 40%; top: 64%; width: 30px; height: 30px; background: radial-gradient(circle at 35% 35%, #ff6b6b, #c0392b);"></div>
  <div class="obj" style="left: 40%; top: 82%; width: 30px; height: 30px; background: radial-gradient(circle at 35% 35%, #ff6b6b, #c0392b);"></div>
</div>

**생각의 순서**:

1. 공 몇 개? → 5개
2. 어떻게 만들지? → 리스트 + for문
3. 위치 패턴은? → x는 같고 y만 다르다 (세로)
4. 움직임은? → 전부 오른쪽 → `for ball in balls`

??? hint "힌트"

    - 빈 리스트 `balls = []`로 시작
    - `for i in range(5)` → y 위치를 `i`로 계산
    - `while True` 안에서 `for ball in balls`로 x 이동

??? success "정답 예시"

    ```python
    GlowScript 3.2 VPython
    balls = []
    for i in range(5):
        y = -2 + i
        ball = sphere(pos=vector(0, y, 0), radius=0.3, color=color.red)
        balls.append(ball)
    ```

    이어서:

    ```python
    while True:
        rate(60)
        for ball in balls:
            ball.pos.x += 0.02
    ```

    위치와 속도의 정확한 숫자는 달라도 괜찮아요!
    핵심은 "리스트로 만들고, for문으로 함께 움직인다"는 **구조**입니다.

---

## 📖 알고 넘어가기

실험하면서 자연스럽게 배운 것을 정리합시다. 외울 필요 없어요!

!!! note "리스트 — 물체를 모아 담는 상자"

    ```python
    balls = []
    balls.append(sphere(...))
    balls.append(sphere(...))
    ```

    - `[]` — 빈 리스트를 만든다
    - `.append(x)` — 리스트 끝에 x를 추가한다
    - `balls[0]` — 첫 번째 항목 (번호는 0부터!)
    - `balls[1]` — 두 번째 항목
    - `len(balls)` — 리스트 안에 몇 개 있는지

!!! note "for + 리스트 — 전체를 한꺼번에"

    **방법 1**: 이름으로 하나씩 꺼내기

    ```python
    for ball in balls:
        ball.pos.x += 0.01
    ```

    **방법 2**: 번호로 접근하기 (속도 리스트와 짝지을 때)

    ```python
    for i in range(len(balls)):
        balls[i].pos += vels[i]
    ```

    방법 1은 간단할 때, 방법 2는 다른 리스트와 연결할 때 씁니다.

---

## 🐛 버그 사냥

아래 코드에는 각각 버그가 하나씩 있어요. 찾아서 고쳐 보세요!

!!! bug "버그 1"

    ```python
    GlowScript 3.2 VPython
    balls = []
    for i in range(5):
        ball = sphere(pos=vector(i, 0, 0), color=color.red)
    print(len(balls))
    ```

    `print`의 결과가 `0`입니다. 공은 5개가 보이는데 왜 0일까요?

??? success "정답"

    `balls.append(ball)`을 빼먹었습니다!

    ```python
    GlowScript 3.2 VPython
    balls = []
    for i in range(5):
        ball = sphere(pos=vector(i, 0, 0), color=color.red)
        balls.append(ball)
    print(len(balls))
    ```

    공을 만들기만 하고 리스트에 넣지 않으면, 리스트는 텅 빈 상태입니다.
    `append`를 잊지 마세요!

!!! bug "버그 2"

    ```python
    GlowScript 3.2 VPython
    balls = []
    for i in range(3):
        ball = sphere(pos=vector(i, 0, 0), color=color.blue)
        balls.append(ball)
    print(balls[3].pos)
    ```

    실행하면 에러가 납니다. 왜일까요?

??? success "정답"

    `balls[3]`은 네 번째 항목인데, 공은 3개뿐입니다!

    - `balls[0]` → 첫 번째 (O)
    - `balls[1]` → 두 번째 (O)
    - `balls[2]` → 세 번째 (O)
    - `balls[3]` → 네 번째? 없습니다! (X)

    번호는 0부터 시작하니까, 3개짜리 리스트의 마지막은 `balls[2]`입니다.

!!! bug "버그 3"

    ```python
    GlowScript 3.2 VPython
    balls = []
    for i in range(5):
        ball = sphere(pos=vector(i, 0, 0), radius=0.3, color=color.green)
        balls.append(ball)
    while True:
        rate(60)
        ball.pos.x += 0.02
    ```

    공 5개 중 **하나만** 움직입니다. 전부 움직이게 하려면?

??? success "정답"

    `for ball in balls:`가 빠졌습니다!

    ```python
    while True:
        rate(60)
        for ball in balls:
            ball.pos.x += 0.02
    ```

    `for` 없이 `ball.pos.x += 0.02`만 쓰면, `ball`은 마지막으로 만든 공 하나만 가리킵니다.
    **리스트 전체를 움직이려면 반드시 `for`문으로 순회해야 합니다.**

---

## 💡 상상 챌린지

리스트 + for문으로 무엇을 만들 수 있을까요?

**미션: 공 5개 이상을 리스트로 만들어서 동시에 움직이는 장면을 만들어 보세요!**

아이디어:

- **폭죽** — 공들이 중앙에서 사방으로 퍼져 나감
- **비 내리기** — 공들이 위에서 아래로 떨어짐
- **회전 고리** — 공들이 원형으로 배치되어 함께 회전
- **파도** — 공들이 일렬로 서서 파도처럼 출렁임

**규칙**: 리스트 사용 필수, 공 5개 이상, while 루프로 움직임. 나머지는 자유!

??? success "예시: 폭죽"

    ```python
    GlowScript 3.2 VPython
    from random import uniform
    balls = []
    vels = []
    for i in range(15):
        ball = sphere(pos=vector(0, 0, 0), radius=0.2, color=color.yellow)
        balls.append(ball)
        vels.append(vector(uniform(-0.1, 0.1), uniform(0.02, 0.1), 0))
    ```

    이어서:

    ```python
    while True:
        rate(60)
        for i in range(len(balls)):
            balls[i].pos += vels[i]
    ```

    노란 공 15개가 중앙에서 폭죽처럼 퍼져 나갑니다!
    여러분만의 장면을 만들어 보세요. 정답은 없습니다!

---

## 📝 오늘의 완성 코드

처음에 보여드렸던 **공 20개 벽 튕기기** 장면입니다.

```python
GlowScript 3.2 VPython
# === WHAT: 공 20개가 랜덤 속도로 벽에 튕기는 장면 ===
# === WHY: 리스트로 많은 물체를 한꺼번에 관리하는 힘을 보여줌 ===

from random import uniform

balls = []
vels = []
for i in range(20):
    x = uniform(-4, 4)
    y = uniform(-2, 2)
    c = vector(uniform(0.3, 1), uniform(0.3, 1), uniform(0.3, 1))
    ball = sphere(pos=vector(x, y, 0), radius=0.3, color=c)
    balls.append(ball)
    vels.append(vector(uniform(-0.08, 0.08), uniform(-0.08, 0.08), 0))
```

!!! tip "아래 코드를 이어서 입력하세요"

    ```python
    # === WHAT: 모든 공을 움직이고 벽에 튕기기 ===
    # === WHY: for+리스트로 20개를 3줄로 제어 ===
    while True:
        rate(60)
        for i in range(len(balls)):
            balls[i].pos += vels[i]
            if abs(balls[i].pos.x) > 5:
                vels[i].x = -vels[i].x
            if abs(balls[i].pos.y) > 3:
                vels[i].y = -vels[i].y
    ```

    개별 변수였다면 변수 40개 + 코드 수백 줄이었을 것입니다.
    리스트 덕분에 **20개든 200개든** 같은 코드로 동작합니다!

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 20공 벽 튕기기</div>
<iframe src="../demos/ch12_final.html"></iframe>
</div>

---

## ✅ 3줄 정리

!!! abstract "오늘 배운 것"

    1. **`balls = []`로 빈 리스트를 만들고, `.append()`로 물체를 추가한다** — 이름 하나로 여러 물체를 관리
    2. **`for ball in balls:`로 전체를 한꺼번에 움직인다** — 10개든 100개든 코드는 같다
    3. **리스트 2개(`balls`, `vels`)를 번호로 짝짓는다** — `balls[i]`의 속도가 `vels[i]`

---

## 🚀 더 탐험하기

### 탐험 1: 공끼리 충돌 감지

Ch.9에서 배운 `mag()`를 활용해 봅시다. 리스트 안의 공끼리 부딪히면 색이 바뀌게 만들어 보세요.

```python
GlowScript 3.2 VPython
from random import uniform
balls = []
vels = []
for i in range(8):
    x = uniform(-4, 4)
    y = uniform(-2, 2)
    ball = sphere(pos=vector(x, y, 0), radius=0.4, color=color.cyan)
    balls.append(ball)
    vels.append(vector(uniform(-0.05, 0.05), uniform(-0.05, 0.05), 0))
```

!!! tip "아래 코드를 이어서 추가하세요"

    ```python
    while True:
        rate(60)
        for i in range(len(balls)):
            balls[i].pos += vels[i]
            if abs(balls[i].pos.x) > 5:
                vels[i].x = -vels[i].x
            if abs(balls[i].pos.y) > 3:
                vels[i].y = -vels[i].y
            balls[i].color = color.cyan
    ```

    그리고 충돌 감지를 추가합니다.

    ```python
        for j in range(i + 1, len(balls)):
            dist = mag(balls[i].pos - balls[j].pos)
            if dist < 0.8:
                balls[i].color = color.red
                balls[j].color = color.red
    ```

    두 공 사이 거리가 `0.8`(반지름 합) 이하면 빨간색으로 변합니다!
    이것이 **이중 for문** — 모든 쌍을 검사하는 패턴입니다.

### 탐험 2: 리스트로 별자리 만들기

공을 별자리 모양으로 배치하고, 선(`curve`)으로 연결해 보세요.

```python
GlowScript 3.2 VPython
stars = []
positions = [vector(-2, 3, 0), vector(0, 4, 0), vector(2, 3, 0)]
for p in positions:
    star = sphere(pos=p, radius=0.15, color=color.yellow, emissive=True)
    stars.append(star)
```

!!! tip "선으로 연결하기"

    ```python
    line = curve(color=color.white, radius=0.02)
    for star in stars:
        line.append(star.pos)
    ```

    `curve`에 `for star in stars`로 위치를 추가하면 별을 잇는 선이 그려집니다.
    `positions` 리스트에 좌표를 더 추가해서 나만의 별자리를 만들어 보세요!

### 탐험 3: range(20)을 range(200)으로

완성 코드의 `range(20)`을 `range(200)`으로 바꿔 보세요.

공 200개가 한꺼번에 움직이며 튕깁니다!
코드를 한 글자만 바꿨을 뿐인데, 200개가 동시에 동작합니다.
이것이 리스트의 힘입니다.

---

> **다음 시간**: Ch.13에서는 함수를 배웁니다. `make_tree(x, y)`처럼 나만의 명령어를 만들어서 나무 한 그루를 숲으로 확장해 봅시다!
