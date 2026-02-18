# Ch.14 — 위젯과 대시보드

**Part 5: 설계와 완성** | 핵심: `slider`, `button`

---

## 🎬 오늘의 장면

빨간 공이 화면 가운데 떠 있습니다. 그 아래에 슬라이더가 하나 있어요.
슬라이더를 왼쪽으로 밀면 공이 작아지고, 오른쪽으로 밀면 커집니다.
옆에 있는 "리셋" 버튼을 누르면 공이 원래 크기로 돌아갑니다.

**코드를 수정하지 않고, 실행 중에 값을 바꿉니다.**

지금까지는 값을 바꾸려면 코드를 고치고 다시 실행해야 했죠?
슬라이더를 쓰면 **실행 중에** 값을 바꿀 수 있습니다!

<div class="glowscript-demo" markdown>
<div class="demo-label">슬라이더를 움직여 보세요!</div>
<iframe src="../demos/ch14_scene.html"></iframe>
</div>

---

## 🔍 코드 읽기 챌린지

아래 코드를 **실행하지 말고** 읽어 보세요.

```python
GlowScript 3.2 VPython
ball = sphere(color=color.red)

def adjust(evt):
    ball.radius = evt.value

slider(min=0.5, max=3, value=1, bind=adjust)
```

??? question "슬라이더를 오른쪽 끝까지 밀면 어떻게 될까요?"

    공의 반지름이 **3**이 됩니다. 처음보다 3배 커져요!

    - `slider(min=0.5, max=3)` → 값의 범위는 0.5~3
    - `bind=adjust` → 슬라이더를 움직일 때마다 `adjust` 함수가 호출됨
    - `evt.value` → 슬라이더의 현재 값
    - `ball.radius = evt.value` → 그 값을 공의 반지름에 대입

    **핵심**: 슬라이더가 바뀔 때마다 → 함수 호출 → 값 변경. 이 흐름을 **콜백(callback)**이라 합니다.

그러면 이건 어떨까요?

```python
GlowScript 3.2 VPython
ball = sphere(color=color.cyan)

def change_color(evt):
    ball.color = color.red

button(text='빨강으로!', bind=change_color)
```

??? question "버튼을 누르면 무엇이 변하나요?"

    하늘색 공이 **빨간색**으로 바뀝니다!

    - `button(text='빨강으로!')` → 화면에 "빨강으로!"라는 버튼이 생김
    - `bind=change_color` → 버튼을 누르면 `change_color` 함수 실행
    - `ball.color = color.red` → 공의 색을 빨강으로 변경

    버튼을 여러 번 눌러도 이미 빨간색이니 변화가 없어요.

---

## 🛠️ 직접 만들어보기

### 실험 1: 슬라이더로 크기 조절

[glowscript.org](https://glowscript.org)에서 새 프로그램을 만들고 아래 코드를 입력하세요.

```python
GlowScript 3.2 VPython
ball = sphere(color=color.orange)

def adjust(evt):
    ball.radius = evt.value

slider(min=0.2, max=5, value=1, bind=adjust)
```

슬라이더를 좌우로 움직여 보세요. 공의 크기가 실시간으로 변합니다!

!!! tip "실험: value 바꿔 보기"

    `value=1`을 `value=3`으로 바꿔 보세요.

    프로그램을 실행하면 **처음부터 공이 크게** 나타납니다.
    `value`는 슬라이더의 **시작값**이에요.

---

### 실험 2: 슬라이더로 위치 조절

크기 대신 **위치**를 바꿔 볼까요?

```python
GlowScript 3.2 VPython
ball = sphere(color=color.green)

def move(evt):
    ball.pos.x = evt.value

slider(min=-5, max=5, value=0, bind=move)
```

슬라이더를 밀면 공이 **좌우로** 이동합니다!

- `ball.pos.x = evt.value` → 공의 x 좌표를 슬라이더 값으로 설정
- `min=-5, max=5` → 왼쪽 끝이 -5, 오른쪽 끝이 5

!!! tip "실험: y 좌표도 조절하기"

    슬라이더를 하나 더 추가해서 y 좌표도 조절해 보세요.

    ```python
    def move_y(evt):
        ball.pos.y = evt.value

    slider(min=-5, max=5, value=0, bind=move_y)
    ```

    이제 슬라이더 2개로 공을 상하좌우 모두 움직일 수 있습니다!

---

### 실험 3: 버튼으로 리셋

슬라이더로 공을 이리저리 움직인 뒤, 버튼 하나로 원래 위치로 돌려봅시다.

```python
GlowScript 3.2 VPython
ball = sphere(color=color.yellow)

def move(evt):
    ball.pos.x = evt.value

def reset(evt):
    ball.pos = vector(0, 0, 0)

slider(min=-5, max=5, value=0, bind=move)
button(text='원래 위치로', bind=reset)
```

슬라이더로 공을 옮긴 뒤 "원래 위치로" 버튼을 눌러 보세요!

!!! tip "관찰 포인트"

    버튼을 눌러도 슬라이더는 가운데로 안 돌아갑니다.
    슬라이더 위치와 공의 실제 위치가 **어긋나게** 되죠.

    이런 문제를 어떻게 해결할 수 있을까요? 나중에 생각해 봅시다!

---

### 실험 4: 슬라이더 + 버튼 조합

이번에는 슬라이더로 색의 강도를 조절하고, 버튼으로 색을 전환해 봅시다.

```python
GlowScript 3.2 VPython
ball = sphere(radius=2, color=color.red)
mode = 'red'

def toggle(evt):
    global mode
    if mode == 'red':
        mode = 'blue'
    else:
        mode = 'red'

def brightness(evt):
    v = evt.value
    if mode == 'red':
        ball.color = vector(v, 0, 0)
    else:
        ball.color = vector(0, 0, v)

button(text='색 전환', bind=toggle)
slider(min=0.1, max=1, value=1, bind=brightness)
```

- **버튼**을 누르면 빨강 모드 ↔ 파랑 모드 전환
- **슬라이더**를 움직이면 현재 모드의 밝기가 변함

!!! tip "실험: 모드 추가"

    `mode = 'green'`을 추가해서 3가지 색을 순환하도록 바꿔 보세요!

---

## 🔄 역추적 챌린지

이번에는 **거꾸로**. 원하는 결과를 보고 코드를 작성해 보세요.

**장면**: 파란 상자(box)가 있습니다. 슬라이더로 상자의 **높이(height)**를 1~10 사이에서 조절할 수 있습니다.

**생각의 순서**:

1. 물체는? → 상자(box)
2. 바꿀 속성은? → 높이(height) → `box`의 `size.y`
3. 위젯은? → slider, 범위 1~10
4. 콜백 함수는? → `evt.value`를 `size.y`에 대입

??? hint "힌트"

    - 상자 만들기: `b = box(color=color.blue)`
    - 높이 바꾸기: `b.size.y = evt.value`
    - 슬라이더: `slider(min=1, max=10, value=1, bind=함수이름)`

??? success "정답 예시"

    ```python
    GlowScript 3.2 VPython
    b = box(color=color.blue)

    def resize(evt):
        b.size.y = evt.value

    slider(min=1, max=10, value=1, bind=resize)
    ```

    슬라이더를 오른쪽으로 밀면 상자가 점점 **높아집니다**!
    `size.y`가 높이를 결정하기 때문이에요.

---

## 📖 알고 넘어가기

실험하면서 자연스럽게 배운 것을 정리합시다. 외울 필요 없어요!

!!! note "slider() — 값을 밀어서 조절"

    ```python
    slider(min=최솟값, max=최댓값, value=시작값, bind=함수이름)
    ```

    - **min / max** — 슬라이더 범위
    - **value** — 처음 시작할 때의 값
    - **bind** — 슬라이더를 움직일 때마다 호출되는 함수

    콜백 함수는 `evt`를 받고, `evt.value`로 현재 값을 읽습니다.

!!! note "button() — 클릭 한 번으로 실행"

    ```python
    button(text='버튼에 보일 글자', bind=함수이름)
    ```

    - **text** — 버튼 위에 표시되는 글자
    - **bind** — 버튼을 누를 때 호출되는 함수

    버튼의 콜백 함수도 `evt`를 받지만, 보통 `evt`를 쓸 일은 없습니다.

!!! note "콜백 함수 — 위젯과 코드를 연결하는 다리"

    ```python
    def 함수이름(evt):
        # evt.value → 슬라이더의 현재 값
        # 여기서 물체의 속성을 바꿈
    ```

    위젯이 작동할 때 **자동으로** 호출되는 함수를 **콜백 함수**라 합니다.
    Ch.13에서 배운 함수와 같지만, **우리가 직접 호출하지 않고 위젯이 호출**한다는 차이가 있어요.

---

## 🐛 버그 사냥

아래 코드에는 각각 버그가 하나씩 있어요. 찾아서 고쳐 보세요!

!!! bug "버그 1"

    ```python
    GlowScript 3.2 VPython
    ball = sphere(color=color.red)

    def adjust(evt):
        ball.radius = evt.value

    slider(min=1, max=5, value=1, bind=adjust())
    ```

??? success "정답"

    `bind=adjust()` → `bind=adjust`

    괄호를 붙이면 함수를 **즉시 실행**해 버립니다.
    `bind`에는 함수의 **이름**만 전달해야 해요. 괄호 없이!

!!! bug "버그 2"

    ```python
    GlowScript 3.2 VPython
    ball = sphere(color=color.blue)

    def grow():
        ball.radius = ball.radius + 0.5

    button(text='크게', bind=grow)
    ```

??? success "정답"

    `def grow():` → `def grow(evt):`

    콜백 함수는 반드시 **매개변수 `evt`를 받아야** 합니다.
    버튼이 함수를 호출할 때 이벤트 정보를 넘기는데, 받을 곳이 없으면 에러가 나요.

!!! bug "버그 3"

    ```python
    GlowScript 3.2 VPython
    ball = sphere(color=color.green)

    def adjust(evt):
        radius = evt.value

    slider(min=0.5, max=3, value=1, bind=adjust)
    ```

??? success "정답"

    `radius = evt.value` → `ball.radius = evt.value`

    `radius`라는 새 변수를 만든 것이지, **공의 반지름을 바꾼 게 아닙니다!**
    공의 속성을 바꾸려면 반드시 `ball.radius`처럼 **물체 이름.속성**으로 접근해야 해요.

---

## 💡 상상 챌린지

**미션: 위젯으로 조종 가능한 장면을 만들어 보세요!**

아이디어:

- **신호등** — 버튼 3개(빨강/노랑/초록)를 누르면 해당 불이 켜짐
- **태양계 속도 조절** — 슬라이더로 행성 공전 속도를 조절
- **색 혼합기** — 슬라이더 3개(R, G, B)로 공의 색을 자유롭게 조합
- **크기 비교기** — 슬라이더 2개로 공 2개의 크기를 각각 조절

**규칙**: 위젯 2개 이상 사용, 물체 1개 이상. 나머지는 자유!

??? success "예시: RGB 색 혼합기"

    ```python
    GlowScript 3.2 VPython
    ball = sphere(radius=2)
    r_val = 1
    g_val = 1
    b_val = 1

    def set_r(evt):
        global r_val
        r_val = evt.value
        ball.color = vector(r_val, g_val, b_val)

    def set_g(evt):
        global g_val
        g_val = evt.value
        ball.color = vector(r_val, g_val, b_val)
    ```

    슬라이더 3개로 R, G, B 값을 조절하면 공의 색이 실시간으로 바뀝니다!
    `set_b` 함수와 슬라이더 3개를 추가해서 완성해 보세요.

---

## 📝 오늘의 완성 코드

슬라이더 2개와 버튼 1개로 공을 조종하는 **미니 대시보드**입니다.

```python
GlowScript 3.2 VPython
# === WHAT: 슬라이더+버튼 미니 대시보드 ===
# === WHY: 위젯 조합으로 실시간 조종 체험 ===

ball = sphere(color=color.red)

def change_size(evt):
    ball.radius = evt.value

def change_x(evt):
    ball.pos.x = evt.value

def reset(evt):
    ball.radius = 1
    ball.pos = vector(0, 0, 0)
    ball.color = color.red

slider(min=0.2, max=4, value=1, bind=change_size)
slider(min=-5, max=5, value=0, bind=change_x)
button(text='리셋', bind=reset)
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 슬라이더와 버튼으로 공을 조종해 보세요!</div>
<iframe src="../demos/ch14_final.html"></iframe>
</div>

---

## ✅ 3줄 정리

1. **`slider()`로 값을 부드럽게 조절한다** — min, max, value로 범위를 정하고 bind로 함수를 연결
2. **`button()`으로 동작을 실행한다** — 클릭 한 번에 원하는 코드가 실행됨
3. **콜백 함수가 위젯과 물체를 연결한다** — 위젯이 바뀔 때 자동으로 호출되는 함수를 만들면 된다

---

## 🚀 더 탐험하기

### 탐험 1: 메뉴(드롭다운)

슬라이더와 버튼 외에 **메뉴**도 있습니다.

```python
GlowScript 3.2 VPython
ball = sphere()

def pick(evt):
    choice = evt.selected
    if choice == '빨강':
        ball.color = color.red
    elif choice == '파랑':
        ball.color = color.blue
    elif choice == '초록':
        ball.color = color.green

menu(choices=['빨강', '파랑', '초록'], bind=pick)
```

드롭다운에서 색을 선택하면 공의 색이 바뀝니다. `evt.selected`로 선택된 항목을 읽어요.

### 탐험 2: 풀 대시보드

슬라이더, 버튼, 메뉴를 모두 조합해 보세요!

- 슬라이더 → 공의 크기
- 메뉴 → 공의 색
- 버튼 → 전체 리셋

**도전**: 슬라이더를 하나 더 추가해서 공의 y 좌표도 조절하고, 버튼을 하나 더 만들어서 공을 랜덤 위치로 보내 보세요. (Ch.5에서 배운 `random()`을 기억하시나요?)

### 탐험 3: 애니메이션 + 위젯

Ch.6에서 배운 애니메이션과 위젯을 결합해 보세요.

```python
GlowScript 3.2 VPython
ball = sphere(color=color.cyan)
speed = 1

def set_speed(evt):
    global speed
    speed = evt.value

slider(min=0, max=10, value=1, bind=set_speed)

while True:
    rate(60)
    ball.pos.x = ball.pos.x + 0.02 * speed
    if ball.pos.x > 5:
        ball.pos.x = -5
```

슬라이더로 공의 **이동 속도**를 실시간으로 조절할 수 있습니다! 0으로 밀면 멈추고, 10으로 밀면 빠르게 달려요.

---

> **다음 시간**: Ch.15는 **최종 프로젝트** 시간입니다! 지금까지 배운 모든 것을 총동원해서 나만의 3D 작품을 완성해요!
