# Chapter 8: 키보드와 마우스 — 내가 조종하는 3D 세계

**Part 3: 조건과 선택의 힘**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **키보드 이벤트를 감지하여 물체를 조종**할 수 있다 — 방향키로 3D 캐릭터를 움직이기
- **마우스 클릭으로 물체를 생성하거나 선택**할 수 있다 — 클릭한 위치에 물체 만들기
- **이벤트 기반 프로그래밍의 기본 개념을 이해**한다 — "무언가 일어나면 반응하라"

> 🎮 **이번 시간에 만들 것**: 방향키로 플레이어를 조종하고, 벽을 피해 출구에 도달하는 **3D 미로 탈출 미니 게임**을 만듭니다. 키보드와 마우스, 그리고 지금까지 배운 조건문과 애니메이션을 모두 결합한 여러분의 첫 번째 인터랙티브 게임입니다!

---

## 💡 왜 이걸 배우나요?

### 컴퓨터와 대화하다

지금까지 우리가 만든 프로그램은 한 방향이었습니다. 코드를 쓰고 → 실행하면 → 결과가 나옵니다. 공이 튀기고, 원이 회전하고, 색이 변했지만... 우리는 **구경꾼**이었습니다. 실행 버튼을 누른 뒤에는 손을 놓아야 했죠.

**이번 장부터 달라집니다.**

키보드를 누르면 캐릭터가 움직이고, 마우스를 클릭하면 물체가 생겨납니다. 프로그램이 실행되는 **도중에** 여러분이 개입할 수 있습니다. 이것이 바로 **인터랙티브(interactive) 프로그래밍** — 사용자와 프로그램이 실시간으로 대화하는 것입니다.

여러분이 매일 쓰는 게임, 앱, 웹사이트는 모두 이 원리로 작동합니다. 터치하면 반응하고, 키를 누르면 캐릭터가 점프합니다. 이번 장에서 여러분은 그 원리를 직접 만들어 봅니다.

### 🧠 이벤트 기반 사고 — 새로운 사고방식

지금까지의 프로그래밍은 **순차적**이었습니다. "1번을 하고, 2번을 하고, 3번을 하라." 하지만 이벤트 기반 프로그래밍은 다릅니다. **"만약 ~가 일어나면, ~를 하라."** 이것은 현실 세계와 훨씬 비슷합니다.

- 초인종이 울리면 → 문을 연다
- 전화가 오면 → 받는다
- 왼쪽 화살표를 누르면 → 캐릭터가 왼쪽으로 간다

이 **"~하면 ~한다"** 패턴이 바로 이벤트와 조건문의 결합입니다. 앞 장에서 배운 `if`문이 여기서 빛을 발합니다!

---

## 📚 핵심 개념

### 개념 1: keysdown() — 지금 어떤 키가 눌려 있나?

**🎭 비유로 시작하기**

피아노를 생각해 보세요. 피아노 위에 올려놓은 손가락이 여러 개일 수 있죠? `keysdown()`은 **"지금 이 순간 어떤 건반들이 눌려 있니?"** 라고 물어보는 것과 같습니다. 한 개일 수도 있고, 여러 개일 수도 있고, 아무것도 눌려 있지 않을 수도 있습니다.

**📖 정확한 정의**

`keysdown()`은 **현재 눌려 있는 키보드 키들의 목록(리스트)을 반환**하는 VPython 함수입니다. 이 함수를 `while True` 루프 안에서 반복 호출하면, 매 프레임마다 어떤 키가 눌려 있는지 확인할 수 있습니다.

**💻 예시로 확인하기**

```python
from vpython import *

player = sphere(color=color.cyan, radius=0.5)

while True:
    rate(30)
    keys = keysdown()       # 지금 눌린 키 목록을 가져온다
    if 'left' in keys:      # 'left'가 그 목록에 있으면
        player.pos.x -= 0.1  # 왼쪽으로 이동
    if 'right' in keys:
        player.pos.x += 0.1  # 오른쪽으로 이동
```

이 코드를 실행하면 하늘색 공이 나타나고, 방향키 왼쪽·오른쪽을 누르면 공이 움직입니다. 놀랍도록 간단하죠?

> 📖 **파이썬 문법: `in` 연산자**
>
> `in`은 **"~안에 ~가 있는가?"** 를 확인하는 연산자입니다. 결과는 `True` 또는 `False`입니다.
>
> - `'left' in keys` → keys 목록에 `'left'`가 있으면 `True`
> - `'a' in keys` → keys 목록에 `'a'`가 있으면 `True`
> - `'x' in ['a', 'b', 'c']` → `False` (목록에 `'x'`가 없으므로)
>
> `in`은 리스트뿐 아니라 문자열에서도 사용할 수 있습니다.
> - `'py' in 'python'` → `True`
> - `'java' in 'python'` → `False`
>
> `in`은 if문의 조건에 자연스럽게 쓰여서, 코드를 영어 문장처럼 읽히게 만들어 줍니다. `if 'left' in keys`는 "만약 'left'가 keys 안에 있다면"으로 읽힙니다.

---

### 개념 2: scene.bind() — 이벤트가 일어나면 함수를 실행하라

**🎭 비유로 시작하기**

학교에서 화재 경보기가 울리면, 정해진 대피 절차가 자동으로 시작됩니다. 경보기(이벤트)와 대피 절차(함수)가 **연결(bind)** 되어 있는 것이죠. `scene.bind()`는 바로 이것입니다 — "이 이벤트가 발생하면, 이 함수를 실행해!"

**📖 정확한 정의**

`scene.bind('이벤트이름', 함수이름)`은 **특정 이벤트가 발생했을 때 지정한 함수를 자동으로 호출**하도록 등록하는 명령입니다. 이때 호출되는 함수를 **콜백 함수(callback function)** 라고 합니다.

**💻 예시로 확인하기**

```python
from vpython import *

# 클릭하면 실행될 함수를 먼저 정의
def on_click(evt):
    clicked_pos = scene.mouse.pos
    sphere(pos=clicked_pos, radius=0.3, color=color.yellow)

# '클릭' 이벤트에 on_click 함수를 연결
scene.bind('click', on_click)
```

이 코드를 실행하고 화면의 아무 곳이나 클릭해 보세요. 클릭할 때마다 노란 공이 생겨납니다! 마치 3D 그림을 그리는 것 같죠?

> 📖 **파이썬 문법: 콜백 함수 맛보기**
>
> **콜백 함수(callback function)** 란, 지금 바로 실행하는 것이 아니라 **"나중에 어떤 일이 일어나면 실행해 줘"** 하고 미리 등록해 두는 함수입니다.
>
> ```python
> # 일반 함수 호출 — 지금 바로 실행
> greet()
>
> # 콜백 등록 — 나중에 클릭하면 실행
> scene.bind('click', on_click)  # 괄호 없이 함수 이름만!
> ```
>
> 주의할 점이 있습니다. `scene.bind('click', on_click)`에서 `on_click` 뒤에 괄호 `()`가 **없습니다**. 괄호를 붙이면 "지금 바로 실행하라"는 뜻이 되어 버립니다. 우리가 원하는 것은 "나중에 실행할 함수로 등록하라"이므로 괄호 없이 이름만 전달합니다.
>
> 콜백 함수는 **이벤트 객체(evt)** 를 매개변수로 받습니다. 이 객체에는 이벤트에 대한 정보(클릭 위치 등)가 담겨 있습니다.

---

### 개념 3: scene.mouse — 마우스의 현재 상태

**🎭 비유로 시작하기**

놀이공원에서 사격 게임을 할 때, 총구가 어디를 가리키고 있는지 항상 확인하죠? `scene.mouse`는 바로 그 "조준점"입니다 — 마우스가 3D 장면의 어디를 가리키고 있는지 알려줍니다.

**📖 정확한 정의**

`scene.mouse`는 마우스의 현재 상태를 담고 있는 객체입니다. 가장 많이 쓰는 속성은 다음과 같습니다.

- **`scene.mouse.pos`** — 마우스가 가리키는 3D 좌표 (vector)
- **`scene.mouse.pick`** — 마우스가 가리키는 물체 (없으면 `None`)

**💻 예시로 확인하기**

```python
from vpython import *

target = sphere(color=color.red, radius=0.5)

def on_click(evt):
    hit = scene.mouse.pick   # 클릭한 곳에 물체가 있는가?
    if hit == target:
        target.color = color.green  # 맞혔으면 초록으로!

scene.bind('click', on_click)
```

빨간 공을 클릭하면 초록색으로 바뀝니다. 빈 공간을 클릭하면 아무 일도 안 일어납니다. `scene.mouse.pick`이 클릭한 위치에 있는 물체를 알려주기 때문입니다.

---

## 🔨 따라하기

자, 이제 **3D 미로 탈출 게임**을 만들어 봅시다! 단계별로 하나씩 기능을 추가하며, 최종적으로 완성된 게임을 만듭니다.

### Step 1: 키보드로 플레이어 조종하기 🕹️

먼저 가장 기본적인 것부터 — 방향키로 움직이는 플레이어를 만듭니다.

```python
from vpython import *

# === 장면 설정 ===
scene.title = "🕹️ Step 1: 키보드로 움직여 보세요!"
scene.background = vector(0.1, 0.1, 0.2)  # 어두운 배경

# === 바닥 ===
ground = box(pos=vector(0, -0.5, 0), size=vector(20, 0.1, 20),
             color=vector(0.2, 0.5, 0.2))  # 초록 잔디

# === 플레이어 ===
player = sphere(pos=vector(0, 0, 0), radius=0.4,
                color=color.cyan, make_trail=True)

# === 이동 속도 ===
speed = 0.15

# === 메인 루프 ===
while True:
    rate(30)
    keys = keysdown()

    if 'left' in keys:
        player.pos.x -= speed
    if 'right' in keys:
        player.pos.x += speed
    if 'up' in keys:
        player.pos.z -= speed    # z가 줄면 화면 안쪽(앞)
    if 'down' in keys:
        player.pos.z += speed    # z가 늘면 화면 바깥쪽(뒤)
```

**실행 결과**: 하늘색 공이 나타나고, 방향키를 누르면 4방향으로 움직입니다. `make_trail=True` 덕분에 이동 경로가 선으로 남습니다.

**코드 분석**:

- `keysdown()`은 매 프레임마다 호출됩니다 — `while True` + `rate(30)` 안에서
- **`if`를 네 번** 사용한 것에 주목하세요 — `elif`가 아니라 `if`입니다! 왜일까요? 대각선 이동(왼쪽+위)을 위해 **동시에 두 키**를 처리해야 하기 때문입니다. `elif`를 쓰면 하나만 처리됩니다
- z축 방향이 직관과 반대일 수 있습니다: z가 감소하면 화면 안쪽(앞)으로 갑니다

> 💡 **해 보세요**: `speed` 값을 `0.05`로 바꾸거나 `0.3`으로 바꿔 보세요. 조종감이 어떻게 달라지나요?

---

### Step 2: 마우스 클릭으로 벽 만들기 🧱

이제 마우스 클릭으로 미로의 벽을 직접 배치해 봅시다.

```python
from vpython import *

# === 장면 설정 ===
scene.title = "🧱 Step 2: 클릭으로 벽을 세우세요!"
scene.background = vector(0.1, 0.1, 0.2)

# === 바닥 ===
ground = box(pos=vector(0, -0.5, 0), size=vector(20, 0.1, 20),
             color=vector(0.2, 0.5, 0.2))

# === 플레이어 ===
player = sphere(pos=vector(0, 0, 0), radius=0.4,
                color=color.cyan, make_trail=True)

# === 벽 목록 ===
walls = []

# === 마우스 클릭 시 벽 생성 ===
def on_click(evt):
    click_pos = scene.mouse.pos
    # 클릭 위치에 벽(상자) 생성 — y는 0으로 고정
    new_wall = box(pos=vector(click_pos.x, 0, click_pos.z),
                   size=vector(1, 1, 1),
                   color=vector(0.8, 0.4, 0.1))  # 갈색 벽
    walls.append(new_wall)

scene.bind('click', on_click)

# === 이동 ===
speed = 0.15

while True:
    rate(30)
    keys = keysdown()

    if 'left' in keys:
        player.pos.x -= speed
    if 'right' in keys:
        player.pos.x += speed
    if 'up' in keys:
        player.pos.z -= speed
    if 'down' in keys:
        player.pos.z += speed
```

**실행 결과**: 방향키로 플레이어를 움직일 수 있고, 화면을 클릭하면 갈색 벽이 생깁니다. 직접 미로를 디자인할 수 있습니다!

**새로 등장한 패턴**:

- `walls = []` — 빈 리스트를 만들어 벽들을 저장합니다
- `walls.append(new_wall)` — 새 벽을 리스트에 추가합니다
- `vector(click_pos.x, 0, click_pos.z)` — 클릭 위치의 x, z는 가져오되 y는 0으로 고정하여 바닥 위에 생성합니다

> 💡 **해 보세요**: 벽의 색상을 `color=vector(0.8, 0.4, 0.1)` 대신 랜덤하게 만들어 보세요. 힌트: `color=vector(random(), random(), random())`을 사용하면 됩니다. (`random`은 VPython에서 사용 가능합니다.)

---

### Step 3: 미로 탈출 게임 완성하기 🏆

이제 모든 것을 합칩니다 — 키보드 조종 + 벽 충돌 감지 + 출구 도달 판정!

```python
from vpython import *

# === 장면 설정 ===
scene.title = "🏆 3D 미로 탈출! 방향키로 이동, 노란 출구에 도달하세요!"
scene.background = vector(0.05, 0.05, 0.15)
scene.center = vector(0, 0, 0)

# === 바닥 ===
ground = box(pos=vector(0, -0.55, 0), size=vector(14, 0.1, 14),
             color=vector(0.15, 0.4, 0.15))

# === 미로 벽 데이터: (x좌표, z좌표, 가로길이, 세로길이) ===
wall_data = [
    # 외곽 벽
    (0, -6, 14, 0.3),   # 아래쪽 벽
    (0, 6, 14, 0.3),    # 위쪽 벽
    (-6.85, 0, 0.3, 12),  # 왼쪽 벽
    (6.85, 0, 0.3, 12),   # 오른쪽 벽
    # 내부 미로 벽
    (-3, -3, 4, 0.3),
    (-3, -1.5, 0.3, 3),
    (0, -2, 0.3, 4),
    (2, -4, 0.3, 4),
    (2, 0, 4, 0.3),
    (-1, 2, 6, 0.3),
    (4, 3, 0.3, 4),
    (-4, 4, 4, 0.3),
]

# === 벽 생성 ===
walls = []
for wx, wz, wlen, wdep in wall_data:
    w = box(pos=vector(wx, 0, wz),
            size=vector(wlen, 1, wdep),
            color=vector(0.6, 0.3, 0.1))
    walls.append(w)

# === 플레이어 (시작: 왼쪽 아래) ===
player = sphere(pos=vector(-5, 0, -5), radius=0.35,
                color=color.cyan, emissive=True)

# === 출구 (오른쪽 위) ===
goal = box(pos=vector(5, 0, 5), size=vector(1, 0.3, 1),
           color=color.yellow, emissive=True)
goal_label = label(pos=vector(5, 1.2, 5), text='출구 ⭐',
                   height=14, color=color.yellow, box=False)

# === 충돌 감지 함수 ===
def check_collision(new_pos):
    pr = player.radius
    for w in walls:
        # 벽의 경계 계산
        wx_min = w.pos.x - w.size.x / 2
        wx_max = w.pos.x + w.size.x / 2
        wz_min = w.pos.z - w.size.z / 2
        wz_max = w.pos.z + w.size.z / 2
        # 플레이어 중심이 벽 범위 + 반지름 안에 있으면 충돌
        if (wx_min - pr < new_pos.x < wx_max + pr and
            wz_min - pr < new_pos.z < wz_max + pr):
            return True   # 충돌!
    return False  # 충돌 없음

# === 골인 확인 함수 ===
def check_goal():
    dist = mag(player.pos - goal.pos)  # 두 점 사이 거리
    if dist < 1.0:
        return True
    return False

# === 게임 상태 ===
speed = 0.12
game_clear = False

# === 메인 루프 ===
while True:
    rate(30)

    if game_clear:
        continue   # 클리어 후에는 아무것도 안 함

    keys = keysdown()

    # 새 위치 계산 (아직 이동하지 않음)
    new_x = player.pos.x
    new_z = player.pos.z

    if 'left' in keys:
        new_x -= speed
    if 'right' in keys:
        new_x += speed
    if 'up' in keys:
        new_z -= speed
    if 'down' in keys:
        new_z += speed

    # 충돌이 없을 때만 이동
    new_pos = vector(new_x, 0, new_z)
    if not check_collision(new_pos):
        player.pos.x = new_x
        player.pos.z = new_z

    # 골인 체크
    if check_goal():
        game_clear = True
        scene.title = "🎉 탈출 성공! 축하합니다!"
        player.color = color.yellow
        # 축하 이펙트: 구슬들이 솟아오름
        for i in range(20):
            sphere(pos=vector(player.pos.x + 2 * (random() - 0.5),
                              random() * 3,
                              player.pos.z + 2 * (random() - 0.5)),
                   radius=0.1,
                   color=vector(random(), random(), random()),
                   emissive=True)
```

**실행 결과**: 갈색 벽으로 이루어진 미로가 나타납니다. 왼쪽 아래의 하늘색 플레이어를 방향키로 조종하여, 오른쪽 위의 노란색 출구에 도달하면 승리합니다! 벽에 부딪히면 이동이 차단됩니다.

**핵심 구조 분석**:

- **충돌 감지**: `check_collision()` 함수는 새 위치가 벽과 겹치는지 미리 확인합니다. `if not check_collision(new_pos):`로 **충돌이 없을 때만** 이동을 허용합니다
- **"먼저 계산, 나중에 적용" 패턴**: 바로 `player.pos.x -= speed`로 이동하지 않고, `new_x`에 먼저 계산한 뒤 충돌 체크 후에 적용합니다. 이것은 게임 개발에서 매우 중요한 패턴입니다
- **골인 판정**: `mag()` 함수로 플레이어와 출구 사이의 거리를 구하고, 1.0 이내면 도착으로 판정합니다

> 📖 **파이썬 문법: 이벤트 바인딩과 콜백 패턴 정리**
>
> VPython에서 사용자 입력을 처리하는 두 가지 방법을 비교합니다.
>
> **방법 1: 폴링(polling) — keysdown()**
> ```python
> while True:
>     rate(30)
>     keys = keysdown()        # 매 프레임마다 "지금 뭐 눌렸어?" 확인
>     if 'left' in keys:
>         player.pos.x -= 0.1
> ```
> 특징: 루프 안에서 매번 확인합니다. 연속적인 동작(이동, 회전)에 적합합니다.
>
> **방법 2: 이벤트 바인딩 — scene.bind()**
> ```python
> def on_click(evt):           # 클릭이 일어나면 자동 호출
>     sphere(pos=scene.mouse.pos)
>
> scene.bind('click', on_click)
> ```
> 특징: 이벤트가 발생할 때만 함수가 호출됩니다. 단발성 동작(물체 생성, 색상 변경)에 적합합니다.
>
> 두 방법을 함께 쓸 수도 있습니다! Step 2에서 키보드는 폴링으로, 마우스는 이벤트 바인딩으로 처리한 것처럼요.

---

## 📝 전체 코드

이 장에서 만든 최종 작품 — **3D 미로 탈출 게임**의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 3D 미로 탈출 게임 ===
# --- WHY: 키보드 입력 + 충돌 감지 + 조건문을 결합한 인터랙티브 프로그램 ---

# === 장면 설정 ===
scene.title = "🏆 3D 미로 탈출! 방향키로 이동, 노란 출구에 도달하세요!"
scene.background = vector(0.05, 0.05, 0.15)
scene.center = vector(0, 0, 0)

# === 바닥 ===
ground = box(pos=vector(0, -0.55, 0), size=vector(14, 0.1, 14),
             color=vector(0.15, 0.4, 0.15))

# === 미로 벽 데이터: (x좌표, z좌표, 가로길이, 세로길이) ===
wall_data = [
    # 외곽 벽
    (0, -6, 14, 0.3),
    (0, 6, 14, 0.3),
    (-6.85, 0, 0.3, 12),
    (6.85, 0, 0.3, 12),
    # 내부 미로 벽
    (-3, -3, 4, 0.3),
    (-3, -1.5, 0.3, 3),
    (0, -2, 0.3, 4),
    (2, -4, 0.3, 4),
    (2, 0, 4, 0.3),
    (-1, 2, 6, 0.3),
    (4, 3, 0.3, 4),
    (-4, 4, 4, 0.3),
]

# === 벽 생성 ===
walls = []
for wx, wz, wlen, wdep in wall_data:
    w = box(pos=vector(wx, 0, wz),
            size=vector(wlen, 1, wdep),
            color=vector(0.6, 0.3, 0.1))
    walls.append(w)

# === 플레이어 (시작: 왼쪽 아래) ===
player = sphere(pos=vector(-5, 0, -5), radius=0.35,
                color=color.cyan, emissive=True)

# === 출구 (오른쪽 위) ===
goal = box(pos=vector(5, 0, 5), size=vector(1, 0.3, 1),
           color=color.yellow, emissive=True)
goal_label = label(pos=vector(5, 1.2, 5), text='출구 ⭐',
                   height=14, color=color.yellow, box=False)

# === 충돌 감지 함수 ===
def check_collision(new_pos):
    pr = player.radius
    for w in walls:
        wx_min = w.pos.x - w.size.x / 2
        wx_max = w.pos.x + w.size.x / 2
        wz_min = w.pos.z - w.size.z / 2
        wz_max = w.pos.z + w.size.z / 2
        if (wx_min - pr < new_pos.x < wx_max + pr and
            wz_min - pr < new_pos.z < wz_max + pr):
            return True
    return False

# === 골인 확인 함수 ===
def check_goal():
    dist = mag(player.pos - goal.pos)
    if dist < 1.0:
        return True
    return False

# === 마우스 클릭으로 힌트 표시 ===
def on_click(evt):
    clicked_pos = scene.mouse.pos
    # 클릭한 위치에 작은 표시를 남김 (길 찾기 힌트용)
    sphere(pos=vector(clicked_pos.x, 0.5, clicked_pos.z),
           radius=0.08, color=color.white, emissive=True)

scene.bind('click', on_click)

# === 게임 상태 ===
speed = 0.12
game_clear = False

# === 메인 루프 ===
while True:
    rate(30)

    if game_clear:
        continue

    keys = keysdown()

    # 새 위치 계산 (아직 이동하지 않음)
    new_x = player.pos.x
    new_z = player.pos.z

    if 'left' in keys:
        new_x -= speed
    if 'right' in keys:
        new_x += speed
    if 'up' in keys:
        new_z -= speed
    if 'down' in keys:
        new_z += speed

    # 충돌이 없을 때만 이동
    new_pos = vector(new_x, 0, new_z)
    if not check_collision(new_pos):
        player.pos.x = new_x
        player.pos.z = new_z

    # 골인 체크
    if check_goal():
        game_clear = True
        scene.title = "🎉 탈출 성공! 축하합니다!"
        player.color = color.yellow
        for i in range(20):
            sphere(pos=vector(player.pos.x + 2 * (random() - 0.5),
                              random() * 3,
                              player.pos.z + 2 * (random() - 0.5)),
                   radius=0.1,
                   color=vector(random(), random(), random()),
                   emissive=True)
```

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 키보드와 마우스, 조건문과 이벤트를 결합하여 **컴퓨팅 사고력의 근육**을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐⭐)

> **문제**: 아래 코드를 실행하면 어떤 일이 일어날까요? **실행하지 말고** 머릿속으로 시뮬레이션해 보세요!

```python
from vpython import *

ball = sphere(pos=vector(0, 0, 0), color=color.red, radius=0.5)
speed = 0.2

while True:
    rate(30)
    keys = keysdown()

    if 'left' in keys:
        ball.pos.x -= speed
        ball.color = color.blue
    if 'right' in keys:
        ball.pos.x += speed
        ball.color = color.red
    if 'up' in keys:
        ball.pos.y += speed
    if 'down' in keys:
        ball.pos.y -= speed

    if ball.pos.y > 3:
        ball.radius = 1.0
    elif ball.pos.y < -3:
        ball.radius = 0.2
    else:
        ball.radius = 0.5
```

**생각해 볼 것**:
- 왼쪽 키를 누르면 공은 어디로 이동하며, 색은 무엇으로 변하나요?
- 오른쪽 키를 누르면 어떻게 되나요?
- 위쪽 키를 계속 누르면 어떤 변화가 생기나요? (위치와 크기 모두 생각하세요)
- 왼쪽 키와 위쪽 키를 **동시에** 누르면 어떻게 되나요?
- 아무 키도 누르지 않으면 어떤 상태인가요?

<details>
<summary>🔑 정답 확인하기</summary>

- **왼쪽 키**: 공이 왼쪽으로 이동하면서 **파란색**으로 변합니다
- **오른쪽 키**: 공이 오른쪽으로 이동하면서 **빨간색**으로 변합니다
- **위쪽 키를 계속 누르면**: 공이 위로 올라갑니다. y가 3을 넘으면 공의 크기가 **2배(radius=1.0)** 로 커집니다!
- **아래 키를 계속 누르면**: 공이 아래로 내려갑니다. y가 -3 아래로 가면 공이 **작아집니다(radius=0.2)**
- **왼쪽+위쪽 동시**: 왼쪽 위 대각선으로 이동하면서 파란색이 됩니다. `if`가 `elif`가 아니라 각각 독립된 `if`이기 때문에 두 조건이 모두 실행됩니다!
- **아무 키 없음**: `keysdown()`은 빈 리스트를 반환하고, 모든 `if`가 거짓이므로 아무 변화 없이 현 상태 유지

핵심 포인트: **`if`와 `elif`의 차이**를 다시 확인하세요. 네 개의 `if`는 모두 독립적으로 검사되므로, 동시 입력이 가능합니다. 만약 `elif`를 사용했다면 한 번에 한 방향만 이동할 수 있었을 것입니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래 설명대로 동작하는 프로그램을 만드는 코드를 작성해 보세요.

**동작 설명**:

- 화면에 **초록색 상자**가 하나 있습니다 (가운데에, 크기 1x1x1)
- 키보드 **'r' 키**를 누르면 상자가 **빨간색**으로 변합니다
- 키보드 **'g' 키**를 누르면 상자가 **초록색**으로 변합니다
- 키보드 **'b' 키**를 누르면 상자가 **파란색**으로 변합니다
- **마우스로 화면을 클릭**하면 클릭한 위치에 **흰색 작은 구**가 생겨납니다 (radius=0.2)

**힌트**:
- 키보드 처리는 `keysdown()` + `while True` 루프 안에서
- 마우스 처리는 `scene.bind('click', ...)` + 콜백 함수로
- 두 가지 방법을 **동시에** 사용해야 합니다

<details>
<summary>💡 힌트 더 보기</summary>

- `if 'r' in keys:` 형태로 알파벳 키도 감지할 수 있습니다
- 콜백 함수에서 `scene.mouse.pos`로 클릭 위치를 얻습니다
- 키보드 부분과 마우스 부분은 서로 독립적으로 작동합니다

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

# 초록색 상자
my_box = box(pos=vector(0, 0, 0), size=vector(1, 1, 1),
             color=color.green)

# 마우스 클릭 시 흰색 구 생성
def on_click(evt):
    clicked_pos = scene.mouse.pos
    sphere(pos=vector(clicked_pos.x, clicked_pos.y, clicked_pos.z),
           radius=0.2, color=color.white)

scene.bind('click', on_click)

# 키보드로 색 변경
while True:
    rate(30)
    keys = keysdown()

    if 'r' in keys:
        my_box.color = color.red
    if 'g' in keys:
        my_box.color = color.green
    if 'b' in keys:
        my_box.color = color.blue
```

핵심 포인트: **폴링(keysdown)과 이벤트 바인딩(scene.bind)을 동시에 사용**할 수 있다는 것을 확인했습니다. 키보드의 연속 입력은 루프에서 처리하고, 마우스 클릭의 단발 입력은 콜백으로 처리하는 것이 자연스러운 패턴입니다.

</details>

---

### 💡 상상 → 코드 창작 (⭐⭐⭐)

> **문제**: 키보드와 마우스를 활용하여 **"3D 드로잉 프로그램"** 을 만들어 보세요!

**기본 요구 사항**:

- 키보드 방향키로 **커서(작은 구)를 3D 공간에서 이동**
- 특정 키(예: 스페이스바)를 누르면 **커서 위치에 물체를 생성**
- 마우스 클릭으로도 물체를 생성할 수 있으면 좋습니다
- **3가지 이상의 색상 전환** 기능 (예: 숫자 키 1, 2, 3으로)

**확장 아이디어**:

- 'c' 키를 누르면 구, 'v' 키를 누르면 상자 등 **물체 종류 전환**
- `make_trail=True`로 커서 이동 경로를 선으로 남기기
- '+', '-' 키로 생성되는 물체의 크기 조절

<details>
<summary>🔑 예시 답안: 기본 3D 드로잉 프로그램</summary>

```python
from vpython import *

scene.title = "🎨 3D 드로잉! 방향키=이동, space=그리기, 1/2/3=색 변경"
scene.background = vector(0.9, 0.9, 0.95)

# 커서
cursor = sphere(pos=vector(0, 0, 0), radius=0.2,
                color=color.red, opacity=0.5)

# 현재 색상
current_color = color.red

# 이동 속도
speed = 0.15

# 마우스 클릭으로 물체 생성
def on_click(evt):
    clicked_pos = scene.mouse.pos
    sphere(pos=vector(clicked_pos.x, clicked_pos.y, clicked_pos.z),
           radius=0.15, color=current_color, emissive=True)

scene.bind('click', on_click)

while True:
    rate(30)
    keys = keysdown()

    # 이동
    if 'left' in keys:
        cursor.pos.x -= speed
    if 'right' in keys:
        cursor.pos.x += speed
    if 'up' in keys:
        cursor.pos.y += speed
    if 'down' in keys:
        cursor.pos.y -= speed

    # 색상 변경
    if '1' in keys:
        current_color = color.red
        cursor.color = color.red
    if '2' in keys:
        current_color = color.green
        cursor.color = color.green
    if '3' in keys:
        current_color = color.blue
        cursor.color = color.blue

    # 스페이스바로 그리기
    if ' ' in keys:
        sphere(pos=vector(cursor.pos.x, cursor.pos.y, cursor.pos.z),
               radius=0.15, color=current_color, emissive=True)
```

이것은 기본 버전입니다. 여기에 물체 종류 변경, 크기 조절, 지우기 기능 등을 추가해 보세요!

</details>

---

## ⚠️ 자주 하는 실수

키보드·마우스 프로그래밍에서 자주 빠지는 함정들을 정리합니다.

**실수 1: `keysdown()`을 루프 바깥에서 한 번만 호출**

```python
# ❌ 한 번만 확인하면 키 입력이 안 됩니다!
from vpython import *

player = sphere()
keys = keysdown()  # 프로그램 시작할 때 한 번만 확인

while True:
    rate(30)
    if 'left' in keys:
        player.pos.x -= 0.1
```

```python
# ✅ 루프 안에서 매번 확인해야 합니다!
from vpython import *

player = sphere()

while True:
    rate(30)
    keys = keysdown()  # 매 프레임마다 확인!
    if 'left' in keys:
        player.pos.x -= 0.1
```

> `keysdown()`은 "지금 이 순간" 눌린 키를 반환합니다. 루프 안에서 매번 호출해야 실시간 입력이 됩니다.

**실수 2: 방향키에 `elif`를 사용하여 대각선 이동 불가**

```python
# ❌ elif를 쓰면 한 번에 한 방향만 이동합니다
if 'left' in keys:
    player.pos.x -= speed
elif 'up' in keys:      # 왼쪽이 참이면 여기는 검사 안 함!
    player.pos.z -= speed
```

```python
# ✅ 각각 if를 써야 동시 입력이 됩니다
if 'left' in keys:
    player.pos.x -= speed
if 'up' in keys:         # 왼쪽과 독립적으로 검사!
    player.pos.z -= speed
```

> 동시에 여러 키를 누를 수 있으므로, 각 방향은 **독립적인 `if`** 로 처리해야 합니다.

**실수 3: 콜백 함수를 등록할 때 괄호를 붙임**

```python
# ❌ 괄호를 붙이면 함수가 바로 실행되어 버립니다!
scene.bind('click', on_click())  # on_click()의 반환값이 등록됨
```

```python
# ✅ 괄호 없이 함수 이름만 전달합니다!
scene.bind('click', on_click)    # on_click 함수 자체가 등록됨
```

> 콜백 등록 시 함수 이름 뒤에 괄호를 붙이면 안 됩니다! `on_click`은 "이 함수를 기억해 둬"이고, `on_click()`은 "이 함수를 지금 당장 실행해"입니다.

**실수 4: 충돌 감지 없이 바로 이동**

```python
# ❌ 벽을 뚫고 지나갑니다
if 'left' in keys:
    player.pos.x -= speed  # 벽이 있어도 무시하고 이동
```

```python
# ✅ 먼저 계산하고, 충돌 확인 후에 이동
new_x = player.pos.x - speed
if not check_collision(vector(new_x, 0, player.pos.z)):
    player.pos.x = new_x  # 안전할 때만 이동
```

> 게임에서는 **"계산 → 검증 → 적용"** 패턴이 필수입니다. 이동할 위치를 먼저 계산하고, 그곳이 안전한지 확인한 후에 실제로 이동하세요.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다.

- [ ] **`keysdown()`이 무엇을 반환하는지 설명할 수 있나요?** → 현재 눌려 있는 키들의 목록(리스트)
- [ ] **방향키 4개로 물체를 상하좌우로 움직일 수 있나요?** → `if 'left' in keys:` 패턴
- [ ] **`scene.bind('click', 함수이름)`이 무엇을 하는지 아나요?** → 클릭이 발생하면 해당 함수를 자동 호출
- [ ] **`scene.mouse.pos`와 `scene.mouse.pick`의 차이를 아나요?** → pos는 마우스 위치, pick은 가리키는 물체
- [ ] **방향키 처리에 `if`를 쓰는 이유를 설명할 수 있나요?** → 동시 입력(대각선 이동)을 위해 각각 독립 검사
- [ ] **콜백 함수를 등록할 때 괄호를 안 붙이는 이유를 아나요?** → 함수를 실행하지 않고 이름만 전달하기 위해
- [ ] **"계산 → 검증 → 적용" 패턴이 왜 필요한지 아나요?** → 충돌 등 조건을 먼저 확인하고 이동해야 벽을 뚫지 않음

> 💪 체크가 5개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 미로 확장하기 🏗️

`wall_data` 리스트에 벽 데이터를 추가하여 더 복잡한 미로를 만들어 보세요. 벽이 많아질수록 게임이 어려워집니다!

```python
# wall_data에 새 벽 추가 — (x좌표, z좌표, 가로, 세로) 형태
wall_data.append((1, 1, 3, 0.3))  # 가로 벽
wall_data.append((-2, 3, 0.3, 2))  # 세로 벽
```

### 도전 2: 타이머 추가하기 ⏱️

게임에 시간 제한을 추가해 보세요. 30초 안에 탈출하지 못하면 게임 오버!

```python
from vpython import *
import time

start_time = time.time()
time_limit = 30  # 30초 제한

while True:
    rate(30)
    elapsed = time.time() - start_time
    remaining = time_limit - elapsed
    scene.title = f"남은 시간: {remaining:.1f}초"

    if remaining <= 0:
        scene.title = "⏰ 시간 초과! 게임 오버!"
        break

    # ... 나머지 게임 로직 ...
```

### 도전 3: 아이템 수집 게임 💎

미로 안에 보석(작은 구)을 여러 개 배치하고, 플레이어가 지나가면 수집되는 기능을 추가해 보세요.

```python
# 보석 생성
gems = []
gem_positions = [vector(-3, 0, 0), vector(2, 0, -3), vector(0, 0, 4)]
for gp in gem_positions:
    g = sphere(pos=gp, radius=0.2, color=color.magenta, emissive=True)
    gems.append(g)

score = 0

# 메인 루프 안에서 수집 체크
for g in gems:
    if g.visible and mag(player.pos - g.pos) < 0.6:
        g.visible = False
        score += 1
        scene.title = f"보석: {score}/{len(gems)}"
```

---

## 🔗 다음 장으로

이번 장에서 우리는 **프로그램과 대화하는 법**을 배웠습니다.

**배운 것 정리**:

- `keysdown()` — 매 프레임마다 눌린 키를 확인하는 폴링 방식
- `scene.bind('이벤트', 함수)` — 이벤트 발생 시 함수를 호출하는 바인딩 방식
- `scene.mouse.pos` / `scene.mouse.pick` — 마우스 위치와 대상 물체 얻기
- `in` 연산자 — 목록 안에 특정 요소가 있는지 확인
- **"계산 → 검증 → 적용"** — 게임 개발의 핵심 패턴
- **콜백 함수** — 나중에 호출될 함수를 미리 등록하는 패턴

이제 여러분은 키보드와 마우스로 3D 세계를 조종할 수 있게 되었습니다. 단순한 구경꾼에서 **3D 세계의 조종사**가 된 것입니다!

하지만 지금까지는 하나의 물체를 하나의 변수로 다뤘습니다. 벽이 12개면 변수도 12개? 별이 100개면? 1000개면? 이런 반복을 효율적으로 처리하는 방법이 필요합니다.

**다음 장 "리스트의 마법 — 수백 개의 물체를 다루다"** 에서는 리스트와 반복문을 결합하여 수백 개의 물체를 한꺼번에 생성하고 제어하는 방법을 배웁니다. 별이 쏟아지는 밤하늘을 만들어 볼 거예요! 🌌

> 🌟 **오늘의 한마디**: 여러분은 오늘 키보드와 마우스로 3D 세계를 조종하는 게임을 만들었습니다. 게임 개발자가 하는 일의 핵심을 직접 체험한 것입니다. "내가 만든 게임을 내가 플레이한다" — 이것보다 신나는 프로그래밍이 또 있을까요?
