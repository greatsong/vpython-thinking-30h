# Chapter 14: 위젯과 대시보드 — 슬라이더, 버튼, 그래프로 조종하기

**Part 5: 함수, 위젯, 그리고 종합 프로젝트**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **슬라이더, 버튼, 메뉴 등 VPython 위젯을 생성하고 이벤트를 연결**할 수 있다 — 사용자 입력으로 시뮬레이션을 제어
- **graph와 gcurve로 실시간 그래프를 그릴** 수 있다 — 물리량의 변화를 시각적으로 추적
- **위젯을 조합하여 인터랙티브 물리 대시보드를 만들** 수 있다 — 슬라이더로 중력 조절, 버튼으로 시작/정지, 그래프로 결과 확인

> 🖥️ **이번 시간에 만들 것**: 공의 자유낙하를 시뮬레이션하는 **물리 실험 대시보드**를 만듭니다. 슬라이더로 중력 가속도를 조절하고, 버튼으로 시뮬레이션을 시작/정지하며, 실시간 그래프로 속도와 위치의 변화를 관찰합니다. 마치 진짜 물리 실험실처럼요!

---

## 💡 왜 이걸 배우나요?

### 실험실을 코드로 만든다

지금까지 우리는 멋진 3D 시뮬레이션을 만들었습니다. 공이 떨어지고, 충돌하고, 키보드로 조종하는 프로그램도 만들었죠. 하지만 뭔가 아쉽지 않았나요? 중력의 세기를 바꾸려면 코드를 수정하고 다시 실행해야 했습니다. 공을 잠깐 멈추려면 프로그램 자체를 종료해야 했죠. 실행 중간에 조건을 바꿔볼 수 없었습니다.

**진짜 과학 실험실에서는 어떤가요?**

과학 시간에 실험을 떠올려 보세요. 전원 공급 장치의 손잡이를 돌리면 전압이 바뀌고, 스위치를 누르면 회로에 전류가 흐르기 시작하고, 오실로스코프 화면에는 전압 변화가 실시간 그래프로 그려집니다. 실험 조건을 자유롭게 바꿔가며 결과를 관찰할 수 있죠. 손잡이 하나를 돌리면 그 결과가 즉시 눈앞에 나타납니다.

**VPython 위젯은 여러분의 코드를 진짜 실험실로 바꿔줍니다.**

슬라이더를 드래그하면 중력이 바뀌고, 버튼을 클릭하면 시뮬레이션이 멈추고, 그래프에는 데이터가 실시간으로 찍힙니다. 코드를 전혀 건드리지 않고도, 마우스만으로 다양한 실험을 해볼 수 있습니다. "만약 중력이 두 배라면?" "달에서 이 공을 떨어뜨리면?" 이런 궁금증이 떠오르는 순간, 슬라이더 하나만 움직이면 답을 바로 확인할 수 있습니다.

이것이 바로 **인터랙티브 시뮬레이션**의 힘입니다. 실제로 과학자와 공학자들은 이런 방식으로 컴퓨터 실험을 수행합니다. 조건을 바꿔가며 결과를 관찰하고, 패턴을 발견하고, 법칙을 확인하죠. 오늘 여러분도 같은 도구를 손에 넣게 됩니다.

---

## 📚 핵심 개념

### 개념 1: VPython 위젯 시스템

**🎭 비유로 시작하기**

TV 리모컨을 생각해 보세요. 리모컨에는 다양한 버튼이 있습니다. 전원 버튼을 누르면 TV가 켜지고, 볼륨 버튼을 누르면 소리가 커지고, 채널 버튼을 누르면 방송이 바뀝니다. 버튼 하나하나에 **"이 버튼을 누르면 이런 일을 해라"**라는 기능이 연결되어 있죠.

VPython 위젯도 같은 원리입니다. 화면에 버튼, 슬라이더, 메뉴 같은 조작 도구를 만들고, 각각에 **"이걸 조작하면 이 함수를 실행해라"**라고 연결합니다.

**📖 정확한 정의**

VPython 위젯(widget)은 **사용자가 마우스로 조작할 수 있는 UI 요소**입니다. 위젯이 조작될 때 실행되는 함수를 **콜백 함수(callback function)**라고 하며, `bind` 매개변수로 연결합니다.

**💻 예시로 확인하기**

```python
from vpython import *

ball = sphere(color=color.red, radius=1)

# 슬라이더를 움직이면 공의 크기가 바뀐다
def change_size(s):
    ball.radius = s.value

scene.append_to_caption('\n공의 크기: ')
slider(min=0.5, max=3, value=1, bind=change_size)
```

이 코드를 실행하면 빨간 공 아래에 슬라이더가 나타납니다. 슬라이더를 드래그하면 공의 크기가 실시간으로 변합니다! `bind=change_size`가 "슬라이더를 움직이면 `change_size` 함수를 실행해라"라는 연결 고리입니다.

여기서 중요한 것은 `change_size` 함수의 매개변수 `s`입니다. 이 `s`는 슬라이더 위젯 자체를 가리킵니다. 그래서 `s.value`로 슬라이더의 현재 값에 접근할 수 있습니다. 모든 위젯 콜백 함수는 이렇게 **위젯 자신을 매개변수로 받는다**는 것을 기억하세요.

> 📖 **파이썬 문법: 콜백 함수 (Callback Function)**
>
> 콜백 함수란 **지금 당장 실행하는 것이 아니라, 나중에 특정 이벤트가 발생했을 때 실행되도록 등록해 두는 함수**입니다.
>
> ```python
> # 콜백 함수 정의 — 매개변수 s는 위젯 자신을 가리킨다
> def my_callback(s):
>     print(s.value)  # 위젯의 현재 값에 접근
>
> # 위젯에 콜백 함수를 연결 — bind에 함수 이름만 적는다 (괄호 없음!)
> slider(bind=my_callback)  # ✅ 올바름
> slider(bind=my_callback())  # ❌ 잘못됨 — 괄호를 붙이면 즉시 실행됨
> ```
>
> 핵심: `bind=`에는 **함수 이름만** 적습니다. 괄호 `()`를 붙이지 않습니다!

---

### 개념 2: VPython의 주요 위젯들

VPython은 다양한 위젯을 제공합니다. 하나씩 알아봅시다.

**슬라이더(slider) — 값을 연속적으로 조절**

```python
from vpython import *

scene.append_to_caption('밝기 조절: ')
def adjust(s):
    print('현재 값:', s.value)

slider(min=0, max=100, value=50, step=1, bind=adjust)
```

- **min, max**: 슬라이더의 최솟값과 최댓값
- **value**: 초기값
- **step**: 한 칸의 크기 (생략 가능)
- **bind**: 값이 바뀔 때 호출할 함수

**버튼(button) — 클릭으로 동작 실행**

```python
from vpython import *

ball = sphere(color=color.red)

def change_color(b):
    if ball.color == color.red:
        ball.color = color.blue
    else:
        ball.color = color.red

button(text='색상 변경', bind=change_color)
```

- **text**: 버튼에 표시할 글자
- **bind**: 클릭 시 호출할 함수

**메뉴(menu) — 여러 선택지 중 하나 고르기**

```python
from vpython import *

ball = sphere(color=color.red)

def choose_color(m):
    val = m.selected
    if val == '빨강':
        ball.color = color.red
    elif val == '파랑':
        ball.color = color.blue
    elif val == '초록':
        ball.color = color.green

menu(choices=['빨강', '파랑', '초록'], bind=choose_color)
```

- **choices**: 선택지 목록 (리스트)
- **m.selected**: 사용자가 선택한 항목

**텍스트 표시(wtext) — 화면에 변하는 텍스트 표시**

```python
from vpython import *

scene.append_to_caption('\n현재 값: ')
display_text = wtext(text='0')

# 나중에 값을 업데이트할 때:
# display_text.text = '42'
```

- `wtext`는 캡션 영역에 텍스트를 표시하며, 나중에 `.text` 속성으로 내용을 변경할 수 있습니다

**캡션에 텍스트 배치하기**

```python
from vpython import *

# scene.append_to_caption()으로 위젯 사이에 텍스트나 줄바꿈을 넣을 수 있다
scene.append_to_caption('첫 번째 줄\n')
button(text='버튼1', bind=lambda b: None)
scene.append_to_caption('\n\n두 번째 줄\n')
button(text='버튼2', bind=lambda b: None)
```

`scene.append_to_caption()`은 3D 장면 아래의 캡션 영역에 텍스트를 추가합니다. `'\n'`으로 줄바꿈을 넣을 수 있습니다. 위젯들을 보기 좋게 배치하려면 이 함수를 위젯 사이사이에 넣어서 줄바꿈이나 설명 텍스트를 추가하면 됩니다. 위젯은 만들어진 순서대로 캡션 영역에 나란히 배치되므로, 레이아웃을 생각하면서 순서를 정하는 것이 중요합니다.

> 📖 **파이썬 문법: global 키워드**
>
> 함수 안에서 함수 바깥의 변수를 **읽는 것**은 자유롭게 할 수 있지만, **값을 바꾸려면** `global` 키워드가 필요합니다.
>
> ```python
> speed = 0  # 함수 바깥의 변수
>
> def update_speed(s):
>     global speed          # "바깥의 speed를 수정하겠다"고 선언
>     speed = s.value       # 이제 바깥 변수가 바뀜
>
> def read_speed():
>     print(speed)          # 읽기만 할 때는 global 불필요
> ```
>
> **왜 필요한가요?** 파이썬은 함수 안에서 `=`로 값을 할당하면 자동으로 "이건 지역 변수구나"라고 판단합니다. `global`을 쓰면 "아니, 바깥에 있는 그 변수를 말하는 거야"라고 알려주는 것입니다.

---

### 개념 3: graph와 gcurve — 실시간 그래프

**🎭 비유로 시작하기**

병원에서 심전도 모니터를 본 적 있나요? 화면에 심장 박동 그래프가 실시간으로 그려지죠. 데이터가 들어올 때마다 선이 한 칸씩 오른쪽으로 이어집니다.

VPython의 `graph`와 `gcurve`가 바로 그것입니다. 시뮬레이션이 진행될 때마다 데이터를 하나씩 찍으면, 실시간 그래프가 그려집니다.

**📖 정확한 정의**

- **graph**: 그래프 창을 생성합니다 (제목, 축 이름, 크기 등 설정)
- **gcurve**: 그래프 위에 그려지는 곡선입니다 (데이터를 하나씩 추가하여 선을 이어감)

**💻 예시로 확인하기**

```python
from vpython import *

# 그래프 창 만들기
my_graph = graph(title='사인 함수', xtitle='시간', ytitle='값',
                 width=600, height=300)

# 곡선 만들기 — 이 그래프 창에 그려진다
sine_curve = gcurve(color=color.blue)

# 데이터를 하나씩 추가하면 그래프가 그려진다
t = 0
while t < 20:
    rate(100)
    sine_curve.plot(t, sin(t))
    t += 0.05
```

실행하면 파란색 사인 곡선이 왼쪽에서 오른쪽으로 실시간으로 그려지는 것을 볼 수 있습니다. 마치 심전도 모니터처럼 데이터가 하나씩 추가되면서 선이 이어지죠. `plot(x, y)` 한 번 호출이 점 하나를 찍고, 이전 점과 선으로 연결합니다.

**graph의 주요 속성**

- **title**: 그래프 제목
- **xtitle, ytitle**: x축, y축 이름
- **width, height**: 그래프 크기 (픽셀)

**gcurve의 주요 속성과 메서드**

- **color**: 곡선의 색상
- **plot(x, y)**: 데이터 한 점을 추가하고 선으로 이어 그린다

한 그래프에 여러 곡선을 겹쳐 그릴 수도 있습니다.

```python
from vpython import *

my_graph = graph(title='사인과 코사인', xtitle='시간', ytitle='값',
                 width=600, height=300)
sine_curve = gcurve(color=color.blue, label='sin')
cosine_curve = gcurve(color=color.red, label='cos')

t = 0
while t < 20:
    rate(100)
    sine_curve.plot(t, sin(t))
    cosine_curve.plot(t, cos(t))
    t += 0.05
```

`label` 속성을 쓰면 어떤 곡선이 어떤 데이터인지 범례가 표시됩니다.

---

## 🔨 따라하기

자, 이제 직접 해 봅시다! 단계별로 **물리 실험 대시보드**를 만들어 가겠습니다.

### Step 1: 슬라이더로 중력 가속도 조절하기

먼저 가장 기본적인 위젯인 슬라이더부터 시작합니다. 슬라이더를 움직이면 중력 가속도 값이 바뀌는 것을 확인해 봅시다.

```python
from vpython import *

# 중력 가속도 (기본값: 지구)
g = 9.8

# 3D 장면 설정
scene.title = '중력 가속도 조절기'
scene.background = color.white

# 바닥
box(pos=vector(0, -5, 0), size=vector(10, 0.2, 10),
    color=vector(0.5, 0.8, 0.5))

# 공
ball = sphere(pos=vector(0, 5, 0), radius=0.5,
              color=color.red, make_trail=True)

# 슬라이더 콜백 — 값이 바뀌면 g를 업데이트
def adjust_gravity(s):
    global g
    g = s.value
    gravity_display.text = '{:.1f}'.format(g)

# 위젯 배치
scene.append_to_caption('\n중력 가속도(m/s²): ')
gravity_slider = slider(min=1, max=30, value=9.8,
                        step=0.1, bind=adjust_gravity)
scene.append_to_caption(' ')
gravity_display = wtext(text='9.8')

# 시뮬레이션
velocity = 0
dt = 0.01

while True:
    rate(100)
    velocity = velocity - g * dt
    ball.pos.y = ball.pos.y + velocity * dt

    # 바닥에 닿으면 리셋
    if ball.pos.y < -4.5:
        ball.pos.y = 5
        velocity = 0
        ball.clear_trail()
```

실행해 보세요! 슬라이더를 왼쪽으로 끌면 공이 천천히 떨어지고(달 표면처럼), 오른쪽으로 끌면 빠르게 떨어집니다(목성처럼). **코드를 고치지 않고도 중력을 마음대로 바꿀 수 있습니다!**

코드의 흐름을 정리하면 이렇습니다. 먼저 `adjust_gravity` 콜백 함수가 정의됩니다. 이 함수는 슬라이더가 움직일 때마다 자동으로 호출되며, `global g`를 통해 바깥의 중력 변수 `g`를 업데이트합니다. 동시에 `wtext`를 이용해 현재 중력 값을 화면에 표시합니다. `while` 루프에서는 매 프레임마다 이 `g` 값을 사용하여 속도와 위치를 계산하므로, 슬라이더를 움직이는 순간 물리 시뮬레이션의 결과가 달라집니다.

---

### Step 2: 버튼으로 시작/정지 제어하기

이제 시뮬레이션을 시작하거나 멈출 수 있는 버튼을 추가합니다. 이 패턴은 거의 모든 인터랙티브 시뮬레이션에서 사용되므로 꼭 익혀 두세요.

```python
from vpython import *

g = 9.8
running = False  # 처음에는 정지 상태

scene.title = '자유낙하 실험'
scene.background = color.white

box(pos=vector(0, -5, 0), size=vector(10, 0.2, 10),
    color=vector(0.5, 0.8, 0.5))

ball = sphere(pos=vector(0, 5, 0), radius=0.5,
              color=color.red, make_trail=True)

# --- 콜백 함수들 ---
def adjust_gravity(s):
    global g
    g = s.value
    gravity_display.text = '{:.1f}'.format(g)

def toggle_run(b):
    global running
    running = not running
    if running:
        b.text = '⏸ 정지'
    else:
        b.text = '▶ 시작'

def reset_sim(b):
    global running, velocity
    running = False
    velocity = 0
    ball.pos.y = 5
    ball.clear_trail()
    run_button.text = '▶ 시작'

# --- 위젯 배치 ---
scene.append_to_caption('\n\n')
run_button = button(text='▶ 시작', bind=toggle_run)
scene.append_to_caption('  ')
button(text='↺ 리셋', bind=reset_sim)

scene.append_to_caption('\n\n중력 가속도(m/s²): ')
gravity_slider = slider(min=1, max=30, value=9.8,
                        step=0.1, bind=adjust_gravity)
scene.append_to_caption(' ')
gravity_display = wtext(text='9.8')

# --- 시뮬레이션 루프 ---
velocity = 0
dt = 0.01

while True:
    rate(100)
    if running:
        velocity = velocity - g * dt
        ball.pos.y = ball.pos.y + velocity * dt

        if ball.pos.y < -4.5:
            ball.pos.y = 5
            velocity = 0
            ball.clear_trail()
```

이제 버튼을 눌러야 공이 떨어지기 시작합니다. 다시 누르면 멈춥니다. 리셋 버튼을 누르면 공이 처음 위치로 돌아갑니다.

핵심은 `running` 변수입니다. 이 변수가 `True`일 때만 물리 계산이 실행됩니다. 버튼은 이 변수를 `True`/`False`로 토글(toggle, 전환)할 뿐입니다. `while True` 루프는 항상 돌아가고 있지만, `if running:` 조건 때문에 실제 물리 계산은 `running`이 `True`일 때만 수행됩니다.

이 **"시작/정지 토글"** 패턴은 거의 모든 인터랙티브 시뮬레이션에서 사용됩니다. `running` 변수 하나로 전체 시뮬레이션의 진행을 제어하는 것이죠. 간단하지만 매우 강력한 설계 패턴입니다.

또한 `toggle_run` 함수에서 버튼의 텍스트를 바꾸는 것도 주목하세요. `b.text = '⏸ 정지'`처럼 콜백 함수의 매개변수 `b`를 통해 버튼 자체의 속성을 변경할 수 있습니다. 사용자에게 현재 상태를 알려주는 좋은 방법입니다.

> 📖 **파이썬 문법: global과 여러 함수에서의 변수 공유**
>
> 여러 콜백 함수가 같은 변수를 수정해야 할 때, 각 함수마다 `global` 선언을 해야 합니다.
>
> ```python
> running = False
> velocity = 0
>
> def toggle_run(b):
>     global running       # running을 수정하므로 global 필요
>     running = not running
>
> def reset_sim(b):
>     global running, velocity  # 쉼표로 여러 변수를 한 번에 선언
>     running = False
>     velocity = 0
> ```
>
> **주의**: `ball.pos.y = 5`처럼 **객체의 속성을 변경**하는 것은 `global`이 필요 없습니다. `ball` 변수 자체를 재할당하는 것이 아니라, `ball`이 가리키는 객체의 속성을 바꾸는 것이기 때문입니다.

---

### Step 3: 실시간 그래프 추가하기

이제 시뮬레이션의 핵심인 실시간 그래프를 추가합니다. 공의 높이와 속도가 시간에 따라 어떻게 변하는지 눈으로 확인할 수 있습니다.

```python
from vpython import *

g = 9.8
running = False

scene.title = '자유낙하 + 실시간 그래프'
scene.background = color.white

box(pos=vector(0, -5, 0), size=vector(10, 0.2, 10),
    color=vector(0.5, 0.8, 0.5))

ball = sphere(pos=vector(0, 5, 0), radius=0.5,
              color=color.red, make_trail=True)

# --- 그래프 설정 ---
position_graph = graph(title='높이-시간 그래프',
                       xtitle='시간(s)', ytitle='높이(m)',
                       width=500, height=200)
pos_curve = gcurve(color=color.blue, label='높이')

velocity_graph = graph(title='속도-시간 그래프',
                       xtitle='시간(s)', ytitle='속도(m/s)',
                       width=500, height=200)
vel_curve = gcurve(color=color.red, label='속도')

# --- 콜백 함수들 ---
def adjust_gravity(s):
    global g
    g = s.value
    gravity_display.text = '{:.1f}'.format(g)

def toggle_run(b):
    global running
    running = not running
    if running:
        b.text = '⏸ 정지'
    else:
        b.text = '▶ 시작'

def reset_sim(b):
    global running, velocity, t
    running = False
    velocity = 0
    t = 0
    ball.pos.y = 5
    ball.clear_trail()
    run_button.text = '▶ 시작'
    pos_curve.delete()
    vel_curve.delete()

# --- 위젯 배치 ---
scene.append_to_caption('\n\n')
run_button = button(text='▶ 시작', bind=toggle_run)
scene.append_to_caption('  ')
button(text='↺ 리셋', bind=reset_sim)

scene.append_to_caption('\n\n중력 가속도(m/s²): ')
gravity_slider = slider(min=1, max=30, value=9.8,
                        step=0.1, bind=adjust_gravity)
scene.append_to_caption(' ')
gravity_display = wtext(text='9.8')

# --- 시뮬레이션 루프 ---
velocity = 0
t = 0
dt = 0.01

while True:
    rate(100)
    if running:
        velocity = velocity - g * dt
        ball.pos.y = ball.pos.y + velocity * dt
        t = t + dt

        # 그래프에 데이터 추가
        pos_curve.plot(t, ball.pos.y)
        vel_curve.plot(t, velocity)

        # 바닥에 닿으면 리셋
        if ball.pos.y < -4.5:
            ball.pos.y = 5
            velocity = 0
            ball.clear_trail()
```

실행하고 시작 버튼을 누르면, 3D 장면에서 공이 떨어지는 동시에 아래쪽 그래프에 높이와 속도가 실시간으로 그려집니다. 높이 그래프는 포물선 모양(2차 함수!)이고, 속도 그래프는 직선(1차 함수!)입니다. **수학 시간에 배운 그래프가 실시간으로 만들어지는 것**을 눈으로 확인해 보세요!

여기서 `pos_curve.delete()`와 `vel_curve.delete()`는 그래프의 모든 데이터를 지우는 메서드입니다. 리셋 버튼을 누르면 그래프도 깨끗하게 초기화되어야 하니까요. 곡선 객체 자체는 그대로 남아 있으므로, 다시 시작하면 새 데이터를 처음부터 그릴 수 있습니다.

또한 주목할 점은 **그래프 두 개를 각각 별도의 `graph` 객체로 만들었다**는 것입니다. 높이 그래프와 속도 그래프를 따로 만들면 각각 독립적인 y축 범위를 가지므로 데이터를 더 명확하게 볼 수 있습니다. 하나의 그래프에 두 곡선을 겹치면 스케일이 달라서 읽기 어려울 수 있거든요.

---

### Step 4: 물리 실험 대시보드 완성하기

마지막으로 모든 요소를 합쳐서 완성된 대시보드를 만듭니다. 여기에 **초기 높이 슬라이더**, **시간/속도 표시**, **행성 선택 메뉴**를 추가합니다.

```python
from vpython import *

# === 물리 실험 대시보드: 자유낙하 시뮬레이터 ===

# --- 전역 변수 ---
g = 9.8
running = False
velocity = 0
t = 0
dt = 0.01
initial_height = 10

# --- 3D 장면 설정 ---
scene.title = '<b>자유낙하 물리 실험 대시보드</b>'
scene.background = vector(0.95, 0.95, 1.0)
scene.width = 500
scene.height = 400

# 바닥
ground = box(pos=vector(0, -0.1, 0), size=vector(12, 0.2, 8),
             color=vector(0.4, 0.75, 0.4))

# 공
ball = sphere(pos=vector(0, initial_height, 0), radius=0.4,
              color=color.red, make_trail=True,
              trail_color=color.orange)

# 높이 표시 기둥 (눈금 역할)
for h in range(0, 15, 2):
    cylinder(pos=vector(-5, h, 0), axis=vector(0.5, 0, 0),
             radius=0.03, color=color.gray(0.7))
    label(pos=vector(-5.8, h, 0), text=str(h)+'m',
          height=10, box=False, color=color.gray(0.5))

# --- 그래프 설정 ---
position_graph = graph(title='<b>높이</b>-시간 그래프',
                       xtitle='시간(s)', ytitle='높이(m)',
                       width=500, height=180)
pos_curve = gcurve(color=color.blue, label='높이(m)')

velocity_graph = graph(title='<b>속도</b>-시간 그래프',
                       xtitle='시간(s)', ytitle='속도(m/s)',
                       width=500, height=180)
vel_curve = gcurve(color=color.red, label='속도(m/s)')

# --- 콜백 함수들 ---
def adjust_gravity(s):
    global g
    g = s.value
    g_display.text = '{:.1f} m/s²'.format(g)

def adjust_height(s):
    global initial_height
    initial_height = s.value
    height_display.text = '{:.0f} m'.format(initial_height)
    if not running:
        ball.pos.y = initial_height
        ball.clear_trail()

def toggle_run(b):
    global running
    running = not running
    if running:
        b.text = '⏸ 정지'
    else:
        b.text = '▶ 시작'

def reset_sim(b):
    global running, velocity, t
    running = False
    velocity = 0
    t = 0
    ball.pos.y = initial_height
    ball.clear_trail()
    run_button.text = '▶ 시작'
    pos_curve.delete()
    vel_curve.delete()
    time_display.text = '0.00 s'
    speed_display.text = '0.0 m/s'

def choose_planet(m):
    global g
    planet = m.selected
    if planet == '지구 (9.8)':
        g = 9.8
    elif planet == '달 (1.6)':
        g = 1.6
    elif planet == '화성 (3.7)':
        g = 3.7
    elif planet == '목성 (24.8)':
        g = 24.8
    gravity_slider.value = g
    g_display.text = '{:.1f} m/s²'.format(g)

# --- 위젯 배치 ---
scene.append_to_caption('\n')
run_button = button(text='▶ 시작', bind=toggle_run)
scene.append_to_caption('  ')
button(text='↺ 리셋', bind=reset_sim)
scene.append_to_caption('    ')
menu(choices=['지구 (9.8)', '달 (1.6)', '화성 (3.7)', '목성 (24.8)'],
     bind=choose_planet)

scene.append_to_caption('\n\n중력 가속도: ')
gravity_slider = slider(min=0.5, max=30, value=9.8,
                        step=0.1, bind=adjust_gravity)
scene.append_to_caption(' ')
g_display = wtext(text='9.8 m/s²')

scene.append_to_caption('\n초기 높이: ')
height_slider = slider(min=2, max=20, value=10,
                       step=1, bind=adjust_height)
scene.append_to_caption(' ')
height_display = wtext(text='10 m')

scene.append_to_caption('\n\n')
scene.append_to_caption('경과 시간: ')
time_display = wtext(text='0.00 s')
scene.append_to_caption('    속도: ')
speed_display = wtext(text='0.0 m/s')

# --- 시뮬레이션 루프 ---
while True:
    rate(100)
    if running:
        velocity = velocity - g * dt
        ball.pos.y = ball.pos.y + velocity * dt
        t = t + dt

        # 그래프에 데이터 추가
        pos_curve.plot(t, ball.pos.y)
        vel_curve.plot(t, velocity)

        # 실시간 수치 표시
        time_display.text = '{:.2f} s'.format(t)
        speed_display.text = '{:.1f} m/s'.format(abs(velocity))

        # 바닥에 닿으면 정지
        if ball.pos.y < 0.4:
            ball.pos.y = 0.4
            running = False
            run_button.text = '▶ 시작'
```

축하합니다! 이것이 완성된 **물리 실험 대시보드**입니다. 코드가 길어 보이지만, 하나씩 뜯어보면 앞서 배운 패턴들이 반복되고 있을 뿐입니다.

만들어진 대시보드의 기능을 정리합니다.

- **시작/정지 버튼**: 시뮬레이션을 제어
- **리셋 버튼**: 모든 것을 초기 상태로 되돌림
- **행성 메뉴**: 지구, 달, 화성, 목성 중력을 한 번에 선택
- **중력 슬라이더**: 중력 가속도를 세밀하게 조절
- **초기 높이 슬라이더**: 공의 시작 높이를 변경
- **실시간 수치 표시**: 경과 시간과 현재 속도
- **실시간 그래프**: 높이-시간, 속도-시간 그래프

**이제 실험을 해 보세요!** 다양한 실험 시나리오를 시도해 볼 수 있습니다.

- **지구 vs 달**: 행성 메뉴에서 '지구'를 선택하고 실험한 뒤, 리셋하고 '달'을 선택해 보세요. 같은 높이에서 떨어뜨렸을 때 속도 그래프의 기울기가 완전히 다릅니다!
- **높이 변경**: 초기 높이를 2m에서 20m까지 바꿔가며 바닥에 도달하는 시간을 비교해 보세요. 높이가 4배가 되면 시간은 2배가 됩니다. 왜 그럴까요?
- **중력 극단값**: 중력을 0.5까지 낮추면 거의 무중력 상태를 볼 수 있고, 30까지 올리면 엄청난 속도로 떨어집니다.

이것이 바로 **시뮬레이션을 통한 과학 탐구**입니다! 실제 실험실에서는 중력을 바꿀 수 없지만, 컴퓨터 시뮬레이션에서는 자유롭게 바꿀 수 있다는 것이 큰 장점입니다.

---

## 📝 전체 코드

이 장의 최종 작품인 **물리 실험 대시보드**의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 자유낙하 물리 실험 대시보드 ===
# --- WHY: 위젯, 이벤트, 그래프를 종합하여 인터랙티브 실험 환경 구현 ---

# --- 전역 변수 ---
g = 9.8
running = False
velocity = 0
t = 0
dt = 0.01
initial_height = 10

# --- 3D 장면 설정 ---
scene.title = '<b>자유낙하 물리 실험 대시보드</b>'
scene.background = vector(0.95, 0.95, 1.0)
scene.width = 500
scene.height = 400

# 바닥
ground = box(pos=vector(0, -0.1, 0), size=vector(12, 0.2, 8),
             color=vector(0.4, 0.75, 0.4))

# 공
ball = sphere(pos=vector(0, initial_height, 0), radius=0.4,
              color=color.red, make_trail=True,
              trail_color=color.orange)

# 높이 눈금
for h in range(0, 15, 2):
    cylinder(pos=vector(-5, h, 0), axis=vector(0.5, 0, 0),
             radius=0.03, color=color.gray(0.7))
    label(pos=vector(-5.8, h, 0), text=str(h)+'m',
          height=10, box=False, color=color.gray(0.5))

# --- 그래프 설정 ---
position_graph = graph(title='<b>높이</b>-시간 그래프',
                       xtitle='시간(s)', ytitle='높이(m)',
                       width=500, height=180)
pos_curve = gcurve(color=color.blue, label='높이(m)')

velocity_graph = graph(title='<b>속도</b>-시간 그래프',
                       xtitle='시간(s)', ytitle='속도(m/s)',
                       width=500, height=180)
vel_curve = gcurve(color=color.red, label='속도(m/s)')

# --- 콜백 함수들 ---
def adjust_gravity(s):
    global g
    g = s.value
    g_display.text = '{:.1f} m/s²'.format(g)

def adjust_height(s):
    global initial_height
    initial_height = s.value
    height_display.text = '{:.0f} m'.format(initial_height)
    if not running:
        ball.pos.y = initial_height
        ball.clear_trail()

def toggle_run(b):
    global running
    running = not running
    if running:
        b.text = '⏸ 정지'
    else:
        b.text = '▶ 시작'

def reset_sim(b):
    global running, velocity, t
    running = False
    velocity = 0
    t = 0
    ball.pos.y = initial_height
    ball.clear_trail()
    run_button.text = '▶ 시작'
    pos_curve.delete()
    vel_curve.delete()
    time_display.text = '0.00 s'
    speed_display.text = '0.0 m/s'

def choose_planet(m):
    global g
    planet = m.selected
    if planet == '지구 (9.8)':
        g = 9.8
    elif planet == '달 (1.6)':
        g = 1.6
    elif planet == '화성 (3.7)':
        g = 3.7
    elif planet == '목성 (24.8)':
        g = 24.8
    gravity_slider.value = g
    g_display.text = '{:.1f} m/s²'.format(g)

# --- 위젯 배치 ---
scene.append_to_caption('\n')
run_button = button(text='▶ 시작', bind=toggle_run)
scene.append_to_caption('  ')
button(text='↺ 리셋', bind=reset_sim)
scene.append_to_caption('    ')
menu(choices=['지구 (9.8)', '달 (1.6)', '화성 (3.7)', '목성 (24.8)'],
     bind=choose_planet)

scene.append_to_caption('\n\n중력 가속도: ')
gravity_slider = slider(min=0.5, max=30, value=9.8,
                        step=0.1, bind=adjust_gravity)
scene.append_to_caption(' ')
g_display = wtext(text='9.8 m/s²')

scene.append_to_caption('\n초기 높이: ')
height_slider = slider(min=2, max=20, value=10,
                       step=1, bind=adjust_height)
scene.append_to_caption(' ')
height_display = wtext(text='10 m')

scene.append_to_caption('\n\n')
scene.append_to_caption('경과 시간: ')
time_display = wtext(text='0.00 s')
scene.append_to_caption('    속도: ')
speed_display = wtext(text='0.0 m/s')

# --- 시뮬레이션 루프 ---
while True:
    rate(100)
    if running:
        velocity = velocity - g * dt
        ball.pos.y = ball.pos.y + velocity * dt
        t = t + dt

        # 그래프에 데이터 추가
        pos_curve.plot(t, ball.pos.y)
        vel_curve.plot(t, velocity)

        # 실시간 수치 표시
        time_display.text = '{:.2f} s'.format(t)
        speed_display.text = '{:.1f} m/s'.format(abs(velocity))

        # 바닥에 닿으면 정지
        if ball.pos.y < 0.4:
            ball.pos.y = 0.4
            running = False
            run_button.text = '▶ 시작'
```

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 위젯과 그래프를 다루는 **컴퓨팅 사고력의 근육**을 키워 봅시다. 위젯 문제는 "이 위젯을 조작하면 어떤 함수가 호출되고, 그 함수가 무엇을 바꾸는지"를 추적하는 능력이 핵심입니다.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하고 슬라이더를 오른쪽 끝(값 5)으로 드래그하면 어떤 일이 벌어질까요? **실행하지 말고** 머릿속으로 먼저 그려 보세요!

```python
from vpython import *

boxes = []
for i in range(5):
    b = box(pos=vector(i * 2 - 4, 0, 0),
            size=vector(1, 1, 1),
            color=color.cyan)
    boxes.append(b)

def change_count(s):
    n = int(s.value)
    for i in range(5):
        if i < n:
            boxes[i].visible = True
        else:
            boxes[i].visible = False

scene.append_to_caption('\n보이는 상자 수: ')
slider(min=0, max=5, value=5, step=1, bind=change_count)
```

**생각해 볼 것**:
- 처음에 상자는 몇 개가 보이나요?
- 슬라이더의 초기값은 얼마인가요?
- 슬라이더를 0으로 옮기면 어떻게 되나요?
- 슬라이더를 3으로 옮기면 어떤 상자들이 보이나요?
- `visible = False`는 물체를 삭제하나요, 숨기나요?

<details>
<summary>🔑 정답 확인하기</summary>

처음에는 하늘색 상자 5개가 일렬로 보입니다 (슬라이더 초기값이 5이므로).

슬라이더를 5로 유지하면 모든 상자가 보입니다. 슬라이더를 0으로 옮기면 모든 상자가 사라집니다. 슬라이더를 3으로 옮기면 왼쪽 3개만 보이고 오른쪽 2개는 사라집니다.

핵심 포인트:
- **`visible = False`는 삭제가 아니라 숨기기**입니다. 다시 `True`로 바꾸면 나타납니다.
- `int(s.value)`로 슬라이더 값을 정수로 변환합니다. 슬라이더 값은 기본적으로 실수(float)이기 때문입니다.
- `for` 루프에서 `i < n` 조건으로 앞에서부터 n개만 보이도록 합니다.

이 패턴은 "슬라이더로 몇 개를 보여줄지 제어하기"라는 매우 유용한 기법입니다!

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래와 같은 프로그램을 만드는 코드를 작성해 보세요.

**프로그램 설명**:
- 화면에 **흰색 구**가 하나 있습니다
- **'빨강', '초록', '파랑'** 세 가지 선택지가 있는 **메뉴(menu)**가 있습니다
- 메뉴에서 색상을 선택하면 구의 색상이 해당 색으로 바뀝니다
- 구 아래에 **슬라이더**가 있어서 구의 **반지름을 0.5에서 3까지** 조절할 수 있습니다
- 슬라이더 옆에 현재 반지름 값이 **wtext**로 표시됩니다

**힌트**:
- 위젯은 총 3개 필요합니다: menu, slider, wtext
- 콜백 함수는 2개 필요합니다: 메뉴용 하나, 슬라이더용 하나
- `m.selected`로 메뉴의 선택 값을 가져옵니다

<details>
<summary>💡 힌트 더 보기</summary>

프로그램의 구조를 분해하면 이렇습니다.

- **물체**: `sphere()` 1개 — 변수에 저장해야 나중에 색과 크기를 바꿀 수 있음
- **메뉴 콜백**: `m.selected` 값에 따라 `ball.color`를 변경
- **슬라이더 콜백**: `s.value`로 `ball.radius`를 변경하고, `wtext`의 텍스트도 업데이트

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

ball = sphere(color=color.white, radius=1)

# 메뉴로 색상 변경
def pick_color(m):
    if m.selected == '빨강':
        ball.color = color.red
    elif m.selected == '초록':
        ball.color = color.green
    elif m.selected == '파랑':
        ball.color = color.blue

scene.append_to_caption('\n색상 선택: ')
menu(choices=['빨강', '초록', '파랑'], bind=pick_color)

# 슬라이더로 크기 변경
def change_radius(s):
    ball.radius = s.value
    radius_display.text = '{:.1f}'.format(s.value)

scene.append_to_caption('\n\n반지름: ')
slider(min=0.5, max=3, value=1, step=0.1, bind=change_radius)
scene.append_to_caption(' ')
radius_display = wtext(text='1.0')
```

핵심 포인트: 결과물(동작)을 보고 "어떤 위젯이 필요한지, 어떤 콜백이 필요한지"를 분해하는 것이 핵심입니다. 이것이 **분해(Decomposition)**와 **패턴 인식(Pattern Recognition)** — 컴퓨팅 사고력의 두 가지 핵심 요소입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐⭐)

> **문제**: 아래 조건을 만족하는 **나만의 인터랙티브 장면**을 만들어 보세요.

**필수 조건**:
- **위젯 2개 이상** 사용 (slider, button, menu 중 선택)
- **그래프 1개 이상** 사용 (graph + gcurve)
- `while True`와 `rate()` 루프 안에서 **무언가가 움직이거나 변해야** 함

**아이디어가 안 떠오른다면**:
- 슬라이더로 진자의 줄 길이를 바꾸며 진동 주기를 그래프로 관찰하기
- 버튼을 누르면 공이 발사되고, 슬라이더로 발사 각도를 조절하고, 비행 궤적을 그래프로 그리기
- 두 개의 슬라이더로 x속도와 y속도를 제어하며 움직이는 공의 궤적을 그래프로 추적하기

**규칙**:
- `from vpython import *`로 시작할 것
- 모든 위젯에 콜백 함수를 연결할 것
- 정답은 없습니다! 자유롭게 만들어 보세요

<details>
<summary>🔑 예시 답안: 포물선 운동 실험기</summary>

```python
from vpython import *

# 포물선 운동 실험기
g = 9.8
running = False
v0 = 10
angle_deg = 45

scene.title = '포물선 운동 실험'
scene.background = color.white

ground = box(pos=vector(5, -0.1, 0), size=vector(20, 0.2, 4),
             color=vector(0.5, 0.8, 0.5))

ball = sphere(pos=vector(-4, 0, 0), radius=0.3,
              color=color.red, make_trail=True)

# 그래프
trajectory_graph = graph(title='궤적 (높이 vs 거리)',
                         xtitle='거리(m)', ytitle='높이(m)',
                         width=500, height=250)
traj_curve = gcurve(color=color.blue, label='궤적')

# 콜백 함수
def set_speed(s):
    global v0
    v0 = s.value
    speed_text.text = '{:.0f} m/s'.format(v0)

def set_angle(s):
    global angle_deg
    angle_deg = s.value
    angle_text.text = '{:.0f}도'.format(angle_deg)

def fire(b):
    global running, vx, vy
    running = True
    angle_rad = angle_deg * pi / 180
    vx = v0 * cos(angle_rad)
    vy = v0 * sin(angle_rad)
    ball.pos = vector(-4, 0, 0)
    ball.clear_trail()
    traj_curve.delete()

# 위젯
scene.append_to_caption('\n')
button(text='발사!', bind=fire)

scene.append_to_caption('\n\n초기 속도: ')
slider(min=5, max=25, value=10, step=1, bind=set_speed)
scene.append_to_caption(' ')
speed_text = wtext(text='10 m/s')

scene.append_to_caption('\n발사 각도: ')
slider(min=10, max=80, value=45, step=1, bind=set_angle)
scene.append_to_caption(' ')
angle_text = wtext(text='45도')

# 시뮬레이션
vx = 0
vy = 0
dt = 0.01

while True:
    rate(200)
    if running:
        vy = vy - g * dt
        ball.pos.x = ball.pos.x + vx * dt
        ball.pos.y = ball.pos.y + vy * dt

        traj_curve.plot(ball.pos.x + 4, ball.pos.y)

        if ball.pos.y < 0 and vy < 0:
            running = False
```

이것은 하나의 예시입니다. 속도와 각도를 바꿔가며 어떤 조합이 가장 멀리 날아가는지 실험해 보세요!

</details>

---

## ⚠️ 자주 하는 실수

위젯과 그래프를 처음 다루면 누구나 겪는 실수와 해결법입니다.

**실수 1: bind에 함수를 호출해 버림 (괄호를 붙임)**

```python
# ❌ 함수를 호출해 버림 — 즉시 실행되고, 이후 위젯이 작동하지 않음
slider(bind=my_function())
```

```python
# ✅ 함수 이름만 전달 — 위젯이 조작될 때 자동 호출됨
slider(bind=my_function)
```

> `bind=`에는 함수 **이름만** 적습니다. 괄호 `()`를 붙이면 함수가 그 자리에서 바로 실행되어 버리고, 위젯에는 아무것도 연결되지 않습니다. 가장 흔한 실수이니 꼭 기억하세요!

**실수 2: global을 빠뜨려서 변수가 바뀌지 않음**

```python
g = 9.8

# ❌ global 없이 값을 변경 — 바깥 g는 그대로이고 지역 변수만 만들어짐
def adjust_gravity(s):
    g = s.value  # 이건 새로운 지역 변수 g
```

```python
g = 9.8

# ✅ global 선언 후 변경 — 바깥 g가 실제로 바뀜
def adjust_gravity(s):
    global g
    g = s.value
```

> 콜백 함수 안에서 바깥 변수의 값을 바꾸려면 반드시 `global`을 선언하세요. 없으면 같은 이름의 새 지역 변수가 만들어질 뿐, 원래 변수에는 아무 영향이 없습니다.

**실수 3: gcurve.plot()을 루프 밖에서 한 번만 호출함**

```python
# ❌ while 루프 밖에서 호출 — 점이 하나만 찍힘
pos_curve.plot(0, 10)
while True:
    rate(100)
    # ... 물리 계산 ...
```

```python
# ✅ while 루프 안에서 매번 호출 — 실시간 그래프가 그려짐
while True:
    rate(100)
    # ... 물리 계산 ...
    pos_curve.plot(t, ball.pos.y)  # 매 프레임마다 데이터 추가
```

> `gcurve.plot()`은 호출할 때마다 데이터 한 점이 추가됩니다. 실시간 그래프를 원한다면 **`while` 루프 안에서 매 프레임마다 호출**해야 합니다.

**실수 4: graph를 여러 개 만들 때 gcurve가 엉뚱한 그래프에 그려짐**

```python
# ❌ graph를 만든 직후에 gcurve를 만들지 않으면 마지막 graph에 그려질 수 있음
graph1 = graph(title='높이')
graph2 = graph(title='속도')
height_curve = gcurve(color=color.blue)  # 이건 graph2에 그려짐!
```

```python
# ✅ graph를 만든 직후에 해당 gcurve를 만든다
graph1 = graph(title='높이')
height_curve = gcurve(graph=graph1, color=color.blue)  # graph1에 그려짐

graph2 = graph(title='속도')
speed_curve = gcurve(graph=graph2, color=color.red)    # graph2에 그려짐
```

> 여러 그래프를 사용할 때는 `gcurve(graph=그래프변수)` 형식으로 어떤 그래프에 그릴지 명시하는 것이 안전합니다. 또는 그래프를 만든 **직후에** 해당 곡선을 만드세요.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **slider, button, menu의 차이를 설명할 수 있나요?** → slider는 연속적인 값 조절, button은 클릭 동작, menu는 여러 선택지 중 하나 고르기
- [ ] **bind의 역할을 설명할 수 있나요?** → 위젯이 조작될 때 실행할 콜백 함수를 연결하는 것
- [ ] **global 키워드가 언제 필요한지 알고 있나요?** → 함수 안에서 함수 바깥 변수의 값을 변경할 때
- [ ] **graph와 gcurve로 실시간 그래프를 그릴 수 있나요?** → graph로 창을 만들고, while 루프 안에서 gcurve.plot()으로 데이터를 추가
- [ ] **wtext로 실시간 수치를 표시할 수 있나요?** → wtext를 만들고 .text 속성을 갱신
- [ ] **scene.append_to_caption()의 용도를 알고 있나요?** → 3D 장면 아래 캡션 영역에 텍스트나 줄바꿈을 추가

> 💪 체크가 4개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 바운스 추가하기

대시보드의 공이 바닥에 닿으면 정지하는 대신, **반발 계수(restitution)** 슬라이더를 추가하여 공이 튀어오르게 만들어 보세요.

```python
from vpython import *

# 반발 계수: 0이면 완전 비탄성, 1이면 완전 탄성
restitution = 0.8
g = 9.8
running = False
velocity = 0
t = 0
dt = 0.01

scene.background = color.white
ground = box(pos=vector(0, -0.1, 0), size=vector(10, 0.2, 6),
             color=vector(0.5, 0.8, 0.5))
ball = sphere(pos=vector(0, 8, 0), radius=0.4,
              color=color.red, make_trail=True)

bounce_graph = graph(title='바운스 높이', xtitle='시간(s)',
                     ytitle='높이(m)', width=500, height=200)
h_curve = gcurve(color=color.blue)

def set_restitution(s):
    global restitution
    restitution = s.value
    r_text.text = '{:.2f}'.format(restitution)

def toggle(b):
    global running
    running = not running
    b.text = '정지' if running else '시작'

def reset(b):
    global running, velocity, t
    running = False
    velocity = 0
    t = 0
    ball.pos.y = 8
    ball.clear_trail()
    h_curve.delete()

scene.append_to_caption('\n')
button(text='시작', bind=toggle)
scene.append_to_caption('  ')
button(text='리셋', bind=reset)
scene.append_to_caption('\n\n반발 계수: ')
slider(min=0, max=1, value=0.8, step=0.01, bind=set_restitution)
scene.append_to_caption(' ')
r_text = wtext(text='0.80')

while True:
    rate(100)
    if running:
        velocity = velocity - g * dt
        ball.pos.y = ball.pos.y + velocity * dt
        t = t + dt
        h_curve.plot(t, ball.pos.y)

        if ball.pos.y < 0.4:
            ball.pos.y = 0.4
            velocity = -velocity * restitution
```

> 반발 계수를 1로 놓으면 영원히 같은 높이로 튀고, 0으로 놓으면 바닥에 착 달라붙습니다. 0.8 정도로 놓으면 현실적인 바운스를 관찰할 수 있습니다. 그래프에서 높이가 점점 줄어드는 패턴을 확인해 보세요!

### 도전 2: 두 공 비교 실험

같은 대시보드에 공을 두 개 만들어서, 하나는 지구 중력, 다른 하나는 달 중력으로 동시에 떨어뜨려 보세요. 두 공의 높이를 같은 그래프에 겹쳐 그리면 차이를 한눈에 볼 수 있습니다!

### 도전 3: winput으로 정확한 값 입력받기

슬라이더 대신 **`winput`** 위젯을 사용하여 사용자가 정확한 숫자를 직접 입력할 수 있게 해 보세요.

```python
from vpython import *

ball = sphere(color=color.red)

def set_exact_radius(w):
    val = w.number
    if val > 0:
        ball.radius = val

scene.append_to_caption('\n반지름 입력: ')
winput(bind=set_exact_radius, type='numeric')
```

`winput`의 `type='numeric'`으로 설정하면 숫자만 입력받을 수 있고, `.number` 속성으로 입력된 숫자 값에 접근합니다.

---

## 🔗 다음 장으로

이번 장에서 우리는 VPython의 위젯 시스템을 정복했습니다.

**배운 것 정리**:
- **위젯**: slider(연속 값 조절), button(클릭 동작), menu(선택), wtext(텍스트 표시)
- **콜백 함수**: 위젯 이벤트에 연결하는 함수 (`bind=함수이름`, 괄호 붙이지 않기!)
- **global 키워드**: 콜백 함수 안에서 바깥 변수를 수정할 때 필수 (객체 속성 변경 시에는 불필요)
- **graph + gcurve**: 실시간 그래프 생성, `plot(x, y)`로 데이터 한 점씩 추가
- **물리 대시보드**: 위젯 + 3D 시뮬레이션 + 그래프를 결합한 인터랙티브 실험 환경

여러분은 이제 **코드를 실행한 뒤에도 동작을 바꿀 수 있는** 인터랙티브 프로그램을 만들 수 있습니다. 이것은 정적인 프로그램에서 동적인 애플리케이션으로의 큰 도약입니다! 지금까지 배운 것을 돌아보면, 1장에서 공 하나를 만들던 것에서 시작하여, 이제는 슬라이더와 버튼과 그래프가 어우러진 대시보드를 만들 수 있게 되었습니다. 정말 대단한 성장이 아닌가요?

**다음 장 "종합 프로젝트 — 나만의 물리 시뮬레이션 완성하기"** 에서는 지금까지 배운 모든 것을 총동원하여 하나의 완성된 프로젝트를 만듭니다. 변수, 조건문, 반복문, 함수, 충돌, 키보드, 위젯, 그래프... 14장에 걸쳐 배운 모든 도구가 하나로 합쳐지는 순간입니다!

> 🌟 **오늘의 한마디**: 여러분은 오늘 진짜 실험실을 코드로 만들었습니다. 슬라이더를 드래그하고, 버튼을 누르고, 그래프가 실시간으로 그려지는 것을 보았죠. "생각을 코드로, 코드를 3차원으로" — 그리고 이제는 **코드를 실험실로**! 과학자처럼 조건을 바꿔가며 탐구하는 힘을 여러분은 이미 갖고 있습니다.
