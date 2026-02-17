# Chapter 15: 최종 프로젝트 — 나만의 3D 시뮬레이션 만들기

**Part 5: 함수, 위젯, 그리고 종합 프로젝트**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **1~14장에서 배운 모든 개념을 종합**하여 자유 프로젝트를 기획할 수 있다
- **F=ma 등 물리 법칙을 코드로 구현**하는 패턴을 자유자재로 사용할 수 있다
- **기획 → 핵심 기능 → 위젯 추가 → 발표**의 4단계를 거쳐 완성된 작품을 만들 수 있다

> 🖥️ **이번 시간에 만들 것**: 여러분만의 3D 시뮬레이션 프로젝트입니다. 태양계, 3D 게임, 물리 실험실, 분자 구조, 건축 시뮬레이터 — 5가지 스타터 코드 중 하나를 골라 시작하거나, 완전히 새로운 주제를 직접 정해도 좋습니다!

---

## 💡 드디어 최종 프로젝트!

### 여기까지 온 여러분에게

14장에 걸쳐 여러분은 정말 많은 것을 배웠습니다. 처음 Chapter 1에서 `sphere()`를 실행하고 화면에 하얀 공이 나타났을 때의 놀라움을 기억하시나요?

그때의 여러분과 지금의 여러분은 완전히 다릅니다.

**여러분이 이제 할 수 있는 것들**

- **변수와 벡터** — 3D 공간에서 위치, 속도, 힘을 자유롭게 다룬다
- **조건문(if/elif/else)** — 충돌 감지, 경계 확인, 게임 로직을 구현한다
- **반복문(for/while)** — 수십 개의 물체를 한 번에 만들고, 애니메이션을 돌린다
- **리스트** — 물체들을 묶어서 관리하고, 하나하나 순회하며 업데이트한다
- **함수** — 반복되는 코드를 깔끔하게 정리하고, 재사용한다
- **위젯과 그래프** — 슬라이더, 버튼, 실시간 그래프로 인터랙티브한 경험을 만든다
- **dt 시뮬레이션** — 시간을 쪼개서 물리를 한 걸음씩 시뮬레이션한다
- **키보드와 마우스** — 사용자 입력을 받아 3D 세계와 상호작용한다

이 모든 것을 하나의 프로젝트에 녹여낼 시간입니다!

### 최종 프로젝트의 목표

최종 프로젝트의 목표는 "완벽한 프로그램"을 만드는 것이 **아닙니다**. 목표는 이것입니다.

- **"내가 상상한 것을 코드로 만들 수 있다"**는 경험을 하는 것
- 문제를 분해하고, 핵심을 뽑아내고, 단계적으로 구현하는 **컴퓨팅 사고력**을 발휘하는 것
- 완성되지 않아도 괜찮습니다 — 과정 자체가 배움입니다

---

## 📚 물리 시뮬레이션 기본 패턴 (F=ma 가이드)

많은 3D 시뮬레이션의 핵심에는 뉴턴의 운동 법칙이 있습니다. 이것을 코드로 옮기는 패턴을 완벽하게 정리해 봅시다.

### 핵심 공식 3줄

물리 시뮬레이션은 매 프레임마다 이 세 줄을 반복합니다.

```python
from vpython import *

# === 물리 시뮬레이션 기본 패턴 ===

ball = sphere(pos=vector(0, 10, 0), radius=0.5, color=color.red, make_trail=True)
mass = 1.0
velocity = vector(3, 0, 0)
gravity = vector(0, -9.8, 0)
dt = 0.01

while True:
    rate(100)

    # 1단계: 힘(Force) 계산
    force = mass * gravity

    # 2단계: 가속도 → 속도 업데이트 (F = ma → a = F/m)
    velocity = velocity + (force / mass) * dt

    # 3단계: 속도 → 위치 업데이트
    ball.pos = ball.pos + velocity * dt

    # 바닥에 닿으면 튕기기
    if ball.pos.y < 0:
        ball.pos.y = 0
        velocity.y = -velocity.y * 0.9  # 에너지 10% 손실
```

> 이 패턴만 기억하면 어떤 물리 시뮬레이션이든 만들 수 있습니다. 힘(force)만 바꾸면 됩니다!

### 다양한 힘 적용하기

**중력 (일정한 힘)**

```python
force = mass * vector(0, -9.8, 0)
```

**만유인력 (두 물체 사이)**

```python
r = planet.pos - sun.pos          # 태양 → 행성 방향 벡터
distance = mag(r)                  # 거리(크기)
direction = norm(r)                # 방향(단위벡터)
force = -G * sun_mass * planet_mass / distance**2 * direction
```

**탄성력 (스프링)**

```python
stretch = mag(ball.pos - anchor) - natural_length
direction = norm(ball.pos - anchor)
force = -k * stretch * direction   # k = 스프링 상수
```

**공기 저항**

```python
force_drag = -0.5 * drag_coefficient * mag(velocity) * velocity
```

> 핵심 패턴은 항상 같습니다. **힘 계산 → 속도 업데이트 → 위치 업데이트**. 이 세 줄이 물리 시뮬레이션의 전부입니다!

---

## 🎨 프로젝트 아이디어 5선

아래 5가지 프로젝트 중 하나를 골라 시작하세요. 각각 바로 실행 가능한 스타터 코드가 포함되어 있습니다. 이 코드를 기반으로 기능을 추가하고 발전시키면 됩니다.

---

### 프로젝트 1: 태양계 시뮬레이션

**핵심 개념**: 만유인력, 궤도 운동, 리스트 관리

**사용 기술**: while 루프, 벡터 연산, make_trail, 리스트

```python
from vpython import *

# 장면 설정
scene.background = color.black
scene.caption = "태양계 시뮬레이션 — 만유인력으로 궤도가 만들어진다!"

G = 6.67e-11
scale = 1e-9  # 거리 축소 비율

# 태양
sun = sphere(pos=vector(0, 0, 0), radius=0.5,
             color=color.yellow, emissive=True)
sun.mass = 1.989e30

# 행성 데이터: [이름, 거리(m), 질량(kg), 색상, 초기속도(m/s)]
planet_data = [
    ["수성", 57.9e9, 3.3e23, color.orange, 47400],
    ["금성", 108.2e9, 4.87e24, vector(0.9, 0.7, 0.2), 35000],
    ["지구", 149.6e9, 5.97e24, color.cyan, 29800],
    ["화성", 227.9e9, 6.42e23, color.red, 24100],
]

planets = []
for name, dist, mass, col, speed in planet_data:
    p = sphere(pos=vector(dist * scale, 0, 0), radius=0.15,
               color=col, make_trail=True, trail_radius=0.02)
    p.mass = mass
    p.velocity = vector(0, 0, speed)
    p.real_pos = vector(dist, 0, 0)
    planets.append(p)

dt = 3600  # 1시간 단위

while True:
    rate(200)
    for p in planets:
        # 만유인력 계산
        r = p.real_pos - vector(0, 0, 0)
        distance = mag(r)
        force = -G * sun.mass * p.mass / distance**2 * norm(r)

        # 속도 → 위치 업데이트
        p.velocity = p.velocity + (force / p.mass) * dt
        p.real_pos = p.real_pos + p.velocity * dt
        p.pos = p.real_pos * scale  # 화면에 축소 표시
```

**확장 아이디어**

- 달(위성)을 지구 주위에 추가하기
- 슬라이더로 시간 속도(dt) 조절하기
- 행성 이름을 label로 표시하기
- 목성, 토성 등 외행성 추가하기

---

### 프로젝트 2: 3D 피하기 게임

**핵심 개념**: 키보드 입력, 충돌 감지, 점수 시스템

**사용 기술**: scene.bind(키보드), if문(충돌), while 루프, 리스트, label

```python
from vpython import *

from random import uniform

scene.background = vector(0.1, 0.1, 0.2)
scene.caption = "방향키로 이동! 떨어지는 빨간 공을 피하세요!"

# 바닥
ground = box(pos=vector(0, -5, 0), size=vector(20, 0.5, 20),
             color=color.green)

# 플레이어
player = box(pos=vector(0, -4, 0), size=vector(1, 1, 1),
             color=color.cyan)
speed = 0.3

# 점수
score = 0
score_label = label(pos=vector(0, 7, 0), text="점수: 0",
                    height=20, box=False, color=color.white)

# 장애물 리스트
obstacles = []

# 키보드 입력 처리
keys_pressed = set()

def keydown(evt):
    keys_pressed.add(evt.key)

def keyup(evt):
    keys_pressed.discard(evt.key)

scene.bind('keydown', keydown)
scene.bind('keyup', keyup)

frame_count = 0
game_over = False

while not game_over:
    rate(60)
    frame_count = frame_count + 1

    # 키보드로 이동
    if 'left' in keys_pressed and player.pos.x > -9:
        player.pos.x = player.pos.x - speed
    if 'right' in keys_pressed and player.pos.x < 9:
        player.pos.x = player.pos.x + speed
    if 'up' in keys_pressed and player.pos.z > -9:
        player.pos.z = player.pos.z - speed
    if 'down' in keys_pressed and player.pos.z < 9:
        player.pos.z = player.pos.z + speed

    # 30프레임마다 장애물 생성
    if frame_count % 30 == 0:
        obs = sphere(pos=vector(uniform(-9, 9), 10, uniform(-9, 9)),
                     radius=0.4, color=color.red)
        obs.velocity = vector(0, -0.1, 0)
        obstacles.append(obs)

    # 장애물 이동 + 충돌 검사
    for obs in obstacles:
        obs.pos = obs.pos + obs.velocity
        dist = mag(obs.pos - player.pos)
        if dist < 1.0:
            score_label.text = "게임 오버! 최종 점수: " + str(score)
            game_over = True
        if obs.pos.y < -6:
            obs.visible = False
            score = score + 1
            score_label.text = "점수: " + str(score)
```

**확장 아이디어**

- 난이도 조절 슬라이더 추가 (장애물 속도, 생성 빈도)
- 아이템(초록 공) — 먹으면 보너스 점수
- 생명 시스템 (3번 맞으면 게임 오버)
- 그래프로 시간별 점수 추이 표시

---

### 프로젝트 3: 물리 실험 대시보드

**핵심 개념**: 위젯으로 실험 조건 변경, 실시간 그래프

**사용 기술**: slider, button, wtext, graph, gcurve

```python
from vpython import *

scene.title = "물리 실험실 — 포물선 운동"
scene.background = vector(0.95, 0.95, 1.0)

# 바닥과 발사대
ground = box(pos=vector(25, -0.5, 0), size=vector(60, 1, 10),
             color=color.green)
launcher = box(pos=vector(0, 0.5, 0), size=vector(2, 1, 1),
               color=color.gray(0.5))

# 그래프 설정
graph_display = graph(title="높이 vs 거리", xtitle="거리 (m)",
                      ytitle="높이 (m)", width=400, height=200)
trajectory = gcurve(graph=graph_display, color=color.blue)

# 위젯: 발사 각도
scene.append_to_caption("\n발사 각도: ")
angle_slider = slider(min=10, max=80, value=45, step=1,
                      bind=lambda s: angle_text.update(str(s.value) + "도"))
angle_text = wtext(text="45도")

# 위젯: 발사 속도
scene.append_to_caption("\n발사 속도: ")
speed_slider = slider(min=5, max=30, value=15, step=1,
                      bind=lambda s: speed_text.update(str(s.value) + " m/s"))
speed_text = wtext(text="15 m/s")

# 결과 표시
scene.append_to_caption("\n")
result_text = wtext(text="발사 버튼을 누르세요!")

ball = None

def launch():
    global ball
    # 이전 공 제거
    if ball is not None:
        ball.visible = False
        ball.make_trail = False
    trajectory.delete()

    # 발사 조건
    angle_rad = angle_slider.value * 3.14159 / 180
    v0 = speed_slider.value
    vx = v0 * cos(angle_rad)
    vy = v0 * sin(angle_rad)

    ball = sphere(pos=vector(0, 1, 0), radius=0.3,
                  color=color.red, make_trail=True)
    velocity = vector(vx, vy, 0)
    gravity = vector(0, -9.8, 0)
    dt = 0.01
    max_dist = 0

    while ball.pos.y >= 0:
        rate(200)
        velocity = velocity + gravity * dt
        ball.pos = ball.pos + velocity * dt
        trajectory.plot(ball.pos.x, ball.pos.y)
        if ball.pos.x > max_dist:
            max_dist = ball.pos.x

    result_text.text = "도달 거리: " + str(round(max_dist, 1)) + " m"

scene.append_to_caption("\n")
button(text="발사!", bind=lambda b: launch())
```

**확장 아이디어**

- 공기 저항 ON/OFF 체크박스 추가
- 여러 번 발사 결과를 그래프에 겹쳐 비교하기
- 중력 값을 슬라이더로 조절 (달, 화성, 목성)
- 속도-시간 그래프도 동시에 표시

---

### 프로젝트 4: 분자 구조 시각화

**핵심 개념**: 3D 구조 배치, 함수로 코드 정리, 마우스 상호작용

**사용 기술**: sphere, cylinder(결합), 함수, 리스트, label, 색상

```python
from vpython import *

scene.background = vector(0.05, 0.05, 0.15)
scene.title = "분자 구조 시각화 — 물(H2O)과 메테인(CH4)"

def make_atom(position, radius, atom_color, name=""):
    """원자 하나를 만드는 함수"""
    atom = sphere(pos=position, radius=radius, color=atom_color)
    if name:
        label(pos=position + vector(0, radius + 0.2, 0),
              text=name, height=12, box=False, color=color.white)
    return atom

def make_bond(atom1, atom2):
    """두 원자 사이에 결합(원기둥)을 만드는 함수"""
    direction = atom2.pos - atom1.pos
    bond = cylinder(pos=atom1.pos, axis=direction,
                    radius=0.05, color=color.gray(0.7))
    return bond

# === 물 분자 (H2O) ===
scene.append_to_caption("왼쪽: 물(H2O)  /  오른쪽: 메테인(CH4)\n")

water_center = vector(-4, 0, 0)
angle_h2o = 104.5 * 3.14159 / 360  # 결합각 104.5도의 절반

oxygen = make_atom(water_center, 0.4, color.red, "O")
hydrogen1 = make_atom(water_center + vector(-sin(angle_h2o), cos(angle_h2o), 0) * 1.2,
                      0.25, color.white, "H")
hydrogen2 = make_atom(water_center + vector(sin(angle_h2o), cos(angle_h2o), 0) * 1.2,
                      0.25, color.white, "H")
make_bond(oxygen, hydrogen1)
make_bond(oxygen, hydrogen2)

# === 메테인 분자 (CH4) — 정사면체 구조 ===
ch4_center = vector(4, 0, 0)
carbon = make_atom(ch4_center, 0.35, vector(0.3, 0.3, 0.3), "C")

# 정사면체 꼭짓점 4개
tet_positions = [
    vector(1, 1, 1),
    vector(1, -1, -1),
    vector(-1, 1, -1),
    vector(-1, -1, 1),
]

hydrogens = []
for tp in tet_positions:
    h_pos = ch4_center + norm(tp) * 1.3
    h = make_atom(h_pos, 0.25, color.white, "H")
    make_bond(carbon, h)
    hydrogens.append(h)

# 전체 구조를 천천히 회전
t = 0
dt = 0.01
while True:
    rate(30)
    t = t + dt
    # 여기에 회전 애니메이션을 추가할 수 있습니다
```

**확장 아이디어**

- 메뉴(menu 위젯)로 분자 선택 (H2O, CH4, CO2, NH3 등)
- 원자를 클릭하면 원소 정보 표시
- 분자를 마우스 드래그로 회전시키기
- 이산화탄소(CO2)의 직선형 구조 추가

---

### 프로젝트 5: 건축 시뮬레이터

**핵심 개념**: 마우스 클릭으로 블록 배치, 3D 그리드

**사용 기술**: scene.bind(마우스), 리스트, 함수, menu 위젯, 색상 선택

```python
from vpython import *

scene.title = "3D 건축 시뮬레이터"
scene.background = vector(0.6, 0.8, 1.0)
scene.caption = "마우스 클릭으로 블록을 배치하세요!\n"

# 바닥 그리드
ground = box(pos=vector(5, -0.5, 5), size=vector(12, 0.2, 12),
             color=vector(0.4, 0.7, 0.3))

# 그리드 표시
for i in range(11):
    curve(pos=[vector(i, 0, 0), vector(i, 0, 10)],
          color=vector(0.3, 0.5, 0.2))
    curve(pos=[vector(0, 0, i), vector(10, 0, i)],
          color=vector(0.3, 0.5, 0.2))

# 배치된 블록 저장
blocks = []
current_color = color.red

# 색상 선택
def set_color(m):
    global current_color
    color_map = {
        "빨강": color.red, "파랑": color.blue,
        "노랑": color.yellow, "초록": color.green,
        "흰색": color.white, "나무색": vector(0.6, 0.4, 0.2),
    }
    current_color = color_map.get(m.selected, color.red)

menu(choices=["빨강", "파랑", "노랑", "초록", "흰색", "나무색"],
     bind=set_color)

scene.append_to_caption("  블록 색상 선택\n")
info_text = wtext(text="배치된 블록: 0개")

# 되돌리기 버튼
def undo(b):
    if len(blocks) > 0:
        last_block = blocks.pop()
        last_block.visible = False
        info_text.text = "배치된 블록: " + str(len(blocks)) + "개"

button(text="되돌리기", bind=undo)

def place_block(evt):
    # 클릭한 위치를 그리드에 맞춤 (정수 좌표)
    hit = scene.mouse.pos
    gx = round(hit.x)
    gz = round(hit.z)

    # 해당 (gx, gz) 위치에서 가장 높은 블록 위에 쌓기
    max_y = 0
    for b in blocks:
        if round(b.pos.x) == gx and round(b.pos.z) == gz:
            if b.pos.y + 1 > max_y:
                max_y = b.pos.y + 1

    if 0 <= gx <= 10 and 0 <= gz <= 10:
        new_block = box(pos=vector(gx, max_y + 0.5, gz),
                        size=vector(0.95, 0.95, 0.95),
                        color=current_color)
        blocks.append(new_block)
        info_text.text = "배치된 블록: " + str(len(blocks)) + "개"

scene.bind('click', place_block)
```

**확장 아이디어**

- 블록 종류 추가 (상자, 원기둥, 피라미드 등)
- 저장/불러오기 기능 (리스트를 파일로)
- 블록 삭제 모드 (Shift+클릭으로 제거)
- 카메라 위치 저장 버튼

---

## 📋 프로젝트 기획서 작성하기

프로젝트를 시작하기 전에, 아래 항목을 채워 보세요. 종이에 써도 좋고, 컴퓨터에 메모해도 좋습니다.

**1. 프로젝트 이름**

- 예: "미니 태양계", "우주 피하기 게임", "나만의 물리 실험실"

**2. 한 줄 설명**

- 이 프로젝트는 무엇을 하는 프로그램인가요?
- 예: "만유인력으로 행성이 태양 주위를 도는 시뮬레이션"

**3. 사용할 핵심 개념 (3가지 이상 체크)**

- [ ] 변수와 벡터
- [ ] 조건문 (if/elif/else)
- [ ] for 반복문
- [ ] while 반복문 + dt
- [ ] 리스트
- [ ] 함수 (def)
- [ ] 위젯 (슬라이더, 버튼 등)
- [ ] 그래프 (graph, gcurve)
- [ ] 충돌 감지
- [ ] 키보드/마우스 입력
- [ ] 물리 법칙 (F=ma)

**4. 필수 기능 (반드시 구현할 것) — 3가지**

- 기능 1: ________________
- 기능 2: ________________
- 기능 3: ________________

**5. 추가 기능 (시간이 남으면 구현할 것) — 2가지**

- 추가 1: ________________
- 추가 2: ________________

**6. 예상 물체 목록**

- 어떤 3D 물체를 사용할 것인가요? (sphere, box, cylinder, arrow 등)
- 각각 몇 개가 필요한가요?

> 기획서를 먼저 작성하면, 코드를 쓸 때 길을 잃지 않습니다. 프로 개발자도 항상 기획부터 합니다!

---

## 🔨 개발 4단계 가이드

### 1단계: 장면 만들기 (30분)

가장 먼저 화면에 뭔가 보이게 하세요. 배경색, 바닥, 주요 물체를 배치합니다.

```python
from vpython import *

# 1단계: 장면 설정
scene.title = "나의 프로젝트"
scene.background = vector(0.1, 0.1, 0.2)

# 주요 물체 배치
ground = box(pos=vector(0, -1, 0), size=vector(20, 0.5, 20),
             color=color.green)
player = sphere(pos=vector(0, 0, 0), radius=0.5, color=color.cyan)
```

> 첫 30분 안에 "실행하면 뭔가 보이는" 상태를 만드세요. 이것이 가장 중요합니다!

### 2단계: 핵심 기능 구현 (60분)

기획서의 "필수 기능 3가지" 중 가장 중요한 것부터 구현합니다.

- 물리 시뮬레이션이면 → F=ma 패턴 적용
- 게임이면 → 키보드 입력 + 충돌 감지
- 시각화면 → 데이터를 물체로 변환하는 로직

```python
# 2단계: 핵심 로직 (예: 물리 시뮬레이션)
velocity = vector(0, 0, 0)
dt = 0.01

while True:
    rate(100)

    # 여기에 핵심 물리/게임 로직 구현
    force = calculate_force(player)         # 함수로 분리!
    velocity = velocity + (force / mass) * dt
    player.pos = player.pos + velocity * dt
```

> 완벽하지 않아도 됩니다. "대략 작동하는" 상태를 먼저 만들고, 나중에 다듬으세요.

### 3단계: 위젯과 그래프 추가 (30분)

핵심 기능이 작동하면, 사용자 인터페이스를 추가합니다.

```python
# 3단계: 위젯 추가
scene.append_to_caption("\n속도 조절: ")
speed_slider = slider(min=1, max=20, value=10,
                      bind=lambda s: None)

scene.append_to_caption("\n")
button(text="초기화", bind=lambda b: reset())

# 그래프
energy_graph = graph(title="에너지 변화", width=400, height=200)
ke_curve = gcurve(graph=energy_graph, color=color.red, label="운동에너지")
pe_curve = gcurve(graph=energy_graph, color=color.blue, label="위치에너지")
```

### 4단계: 다듬기와 발표 준비 (30분)

- 코드에 **주석**을 달아 설명 추가
- **label**로 화면에 정보 표시
- 버그가 있으면 수정
- 발표할 때 보여줄 **시나리오** 준비

```python
# 4단계: 정보 표시
info = label(pos=vector(0, 8, 0),
             text="나의 물리 시뮬레이션\n방향키로 조작하세요",
             height=16, box=False, color=color.white)
```

> 발표 팁: "이 프로그램은 ___를 시뮬레이션합니다. 핵심 원리는 ___이고, ___를 조절하면 결과가 이렇게 바뀝니다."

---

## 🧠 최종 사고력 챌린지 (⭐⭐⭐)

이 교재 전체를 관통하는 세 가지 사고 훈련을 마지막으로 한 번 더 해 봅시다.

### 🔍 코드 → 결과 예측

아래 코드를 **실행하지 말고** 머릿속으로 결과를 예측해 보세요.

```python
from vpython import *

objects = []
for i in range(5):
    for j in range(5):
        if (i + j) % 2 == 0:
            obj = sphere(pos=vector(i, j, 0), radius=0.3, color=color.red)
        else:
            obj = box(pos=vector(i, j, 0), size=vector(0.5, 0.5, 0.5), color=color.blue)
        objects.append(obj)
```

**질문**: 화면에 어떤 패턴이 나타날까요? 빨간 공과 파란 상자는 각각 몇 개일까요?

<details>
<summary>🔑 정답</summary>

체스판 패턴이 나타납니다! 5x5 격자에서 `(i+j)`가 짝수인 칸에는 빨간 공, 홀수인 칸에는 파란 상자가 놓입니다. 빨간 공 13개, 파란 상자 12개입니다. (0,0)부터 시작하므로 짝수 합인 칸이 하나 더 많습니다.

</details>

### 🔄 결과 → 코드 역추적

다음 설명을 읽고, 이것을 만드는 코드를 직접 작성해 보세요.

> **목표**: 10개의 공이 원형으로 배치되어 있고, while 루프 안에서 모든 공이 시계 방향으로 천천히 회전한다. 각 공의 색상은 무지개 순서로 다르다.

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

from math import pi

scene.background = color.black
balls = []
n = 10
radius_circle = 4

rainbow = [color.red, color.orange, color.yellow, color.green,
           color.cyan, color.blue, color.magenta, vector(1,0.5,0.8),
           color.white, vector(0.5, 0, 1)]

for i in range(n):
    angle = 2 * pi * i / n
    x = radius_circle * cos(angle)
    z = radius_circle * sin(angle)
    ball = sphere(pos=vector(x, 0, z), radius=0.4,
                  color=rainbow[i], make_trail=True, trail_radius=0.05)
    balls.append(ball)

t = 0
dt = 0.01
rotation_speed = 0.5

while True:
    rate(60)
    t = t + dt
    for i in range(n):
        angle = 2 * pi * i / n + rotation_speed * t
        balls[i].pos.x = radius_circle * cos(angle)
        balls[i].pos.z = radius_circle * sin(angle)
```

</details>

### 💡 상상 → 코드 창작 (최종)

> **도전**: 이 교재에서 배운 모든 것을 활용하여, 아래 조건을 모두 만족하는 프로그램을 만들어 보세요.

**필수 조건**

- 3D 물체가 **5개 이상** 등장할 것
- **while 루프**로 애니메이션이 동작할 것
- **함수**를 최소 1개 정의하여 사용할 것
- **위젯**(슬라이더, 버튼 등) 최소 1개 포함할 것
- **조건문**으로 어떤 판단을 할 것 (충돌, 경계, 상태 변화 등)

**주제는 완전히 자유**입니다. 위 5가지 프로젝트 아이디어를 참고해도 좋고, 전혀 새로운 것을 만들어도 좋습니다!

---

## 📖 배운 파이썬 문법 총정리

> 📖 **파이썬 문법**: 15장에 걸쳐 배운 모든 문법을 한 곳에 정리합니다. 이 박스를 프로젝트 작업 중 언제든 참고하세요!

**변수와 자료형**

- `x = 10` — 정수
- `speed = 3.5` — 실수(소수점)
- `name = "공"` — 문자열
- `alive = True` — 불리언(참/거짓)
- `pos = vector(1, 2, 3)` — 3D 벡터

**벡터 연산**

- `v1 + v2` — 벡터 덧셈
- `v * 3` — 스칼라 곱
- `mag(v)` — 벡터의 크기(길이)
- `norm(v)` — 단위벡터(방향만)
- `v.x`, `v.y`, `v.z` — 각 성분 접근

**VPython 3D 물체**

- `sphere(pos, radius, color)` — 구
- `box(pos, size, color)` — 상자
- `cylinder(pos, axis, radius, color)` — 원기둥
- `arrow(pos, axis, color)` — 화살표
- `cone(pos, axis, radius)` — 원뿔
- `ring(pos, axis, radius, thickness)` — 링
- `curve(pos=[...])` — 곡선
- `label(pos, text)` — 텍스트 라벨

**물체 속성**

- `obj.pos` — 위치
- `obj.color` — 색상
- `obj.visible` — 보이기/숨기기
- `obj.make_trail = True` — 궤적 표시

**조건문**

```python
if score >= 100:
    print("승리!")
elif score >= 50:
    print("거의 다 왔어!")
else:
    print("계속 도전!")
```

**for 반복문**

```python
for i in range(10):
    sphere(pos=vector(i, 0, 0), radius=0.3)
```

**while 반복문 (애니메이션 루프)**

```python
dt = 0.01
while True:
    rate(100)
    # 매 프레임 실행할 코드
```

**리스트**

- `my_list = []` — 빈 리스트
- `my_list.append(item)` — 항목 추가
- `my_list[0]` — 첫 번째 항목 접근
- `len(my_list)` — 길이
- `for item in my_list:` — 순회

**함수**

```python
def create_planet(position, planet_color, planet_radius):
    planet = sphere(pos=position, radius=planet_radius,
                    color=planet_color, make_trail=True)
    return planet
```

**위젯**

- `slider(min, max, value, bind)` — 슬라이더
- `button(text, bind)` — 버튼
- `menu(choices, bind)` — 드롭다운 메뉴
- `wtext(text)` — 텍스트 표시
- `checkbox(text, bind)` — 체크박스

**그래프**

```python
g = graph(title="제목", xtitle="x", ytitle="y")
curve1 = gcurve(graph=g, color=color.red)
curve1.plot(x_value, y_value)
```

**키보드와 마우스**

```python
scene.bind('keydown', key_handler)
scene.bind('click', click_handler)
```

**물리 시뮬레이션 3줄 패턴**

```python
force = calculate_force()          # 힘 계산
velocity = velocity + (force / mass) * dt  # 속도 업데이트
obj.pos = obj.pos + velocity * dt          # 위치 업데이트
```

---

## 🎉 축하합니다! — 30시간의 여정을 마치며

여러분은 해냈습니다.

Chapter 1에서 `sphere()`를 처음 실행하던 순간을 떠올려 보세요. 그때 여러분은 "프로그래밍"이 무엇인지도 잘 몰랐고, `from vpython import *`라는 한 줄이 왜 필요한지도 이해하기 어려웠을 것입니다.

그런데 지금은요?

여러분은 **만유인력으로 행성이 도는 태양계**를 코드로 만들 수 있습니다. **키보드로 조작하는 3D 게임**도 만들 수 있습니다. 슬라이더를 움직이면 실시간으로 물리 실험 조건이 바뀌는 **인터랙티브 대시보드**도 만들 수 있습니다. 분자의 3차원 구조를 시각화하고, 마우스 클릭으로 건물을 짓는 시뮬레이터도 만들 수 있습니다.

이것은 단순히 "코딩을 배운" 것이 아닙니다. 여러분이 진짜 얻은 것은 **컴퓨팅 사고력**입니다.

- **분해** — 복잡한 문제를 작은 조각으로 나누는 힘
- **패턴 인식** — "이건 전에 풀었던 것과 비슷하다"고 알아채는 눈
- **추상화** — 핵심만 뽑아내고 나머지는 무시하는 능력
- **알고리즘 설계** — 해결 방법을 단계별로 설계하는 기술

이 네 가지 능력은 프로그래밍을 넘어서, 수학 문제를 풀 때, 과학 실험을 설계할 때, 글을 쓸 때, 심지어 일상의 복잡한 상황을 정리할 때도 여러분을 도와줄 것입니다.

### 15개 챕터에서 걸어온 길

**Part 1: 3D 세계에 첫 발을 내딛다 (Chapter 1~3)**

- 처음 3D 물체를 만들고, 좌표를 이해하고, 색상과 크기로 장면을 꾸몄습니다

**Part 2: 움직임의 세계 (Chapter 4~6)**

- 변수로 물체를 제어하고, while 루프로 애니메이션을 만들고, 조건문으로 판단하는 프로그램을 만들었습니다

**Part 3: 데이터와 구조 (Chapter 7~9)**

- for 반복문으로 대량의 물체를 효율적으로 만들고, 리스트로 관리하고, 충돌 감지로 상호작용하는 세계를 만들었습니다

**Part 4: 시뮬레이션의 세계 (Chapter 10~12)**

- dt로 시간을 쪼개 물리를 시뮬레이션하고, 그래프로 데이터를 분석하고, 키보드와 마우스로 3D 세계와 대화했습니다

**Part 5: 함수, 위젯, 그리고 종합 프로젝트 (Chapter 13~15)**

- 함수로 코드를 정리하고, 위젯으로 인터랙티브한 프로그램을 만들고, 이 모든 것을 종합하여 나만의 프로젝트를 완성했습니다

15개 챕터, 30시간이라는 시간 동안 여러분은 **생각하는 방법**을 배웠습니다. 코드는 도구였고, VPython은 캔버스였습니다. 진짜 작품은 여러분의 머릿속에서 만들어진 것입니다.

---

## 🚀 이 다음에는?

이 교재를 끝낸 여러분 앞에는 넓은 세상이 펼쳐져 있습니다.

**파이썬을 더 깊이 배우고 싶다면**

- **파이썬 기초 심화** — 딕셔너리, 클래스(객체지향), 파일 입출력, 예외 처리
- **파이게임(Pygame)** — 2D 게임을 본격적으로 만들 수 있는 라이브러리
- **플라스크(Flask)** — 웹 애플리케이션을 만드는 프레임워크

**과학·수학 시뮬레이션을 더 하고 싶다면**

- **matplotlib** — 과학자들이 사용하는 그래프 라이브러리
- **numpy** — 대규모 수치 계산 라이브러리
- **VPython 고급** — 텍스처, 조명, compound 물체 등 더 깊은 기능

**데이터와 인공지능에 관심이 있다면**

- **판다스(pandas)** — 데이터 분석 라이브러리
- **사이킷런(scikit-learn)** — 머신러닝 입문
- **텐서플로(TensorFlow) / 파이토치(PyTorch)** — 딥러닝 프레임워크

**어떤 길을 선택하든**, 여러분은 이미 가장 중요한 것을 갖추고 있습니다 — **"어떤 문제든 코드로 풀어보겠다"**는 자신감과, 그것을 가능하게 하는 컴퓨팅 사고력.

### 마지막으로

프로그래밍은 혼자 하는 것이 아닙니다. 모르는 것이 있으면 검색하세요. 다른 사람의 코드를 읽어 보세요. 직접 만든 것을 친구에게 보여주세요. 안 되는 코드 앞에서 고민하는 시간이 바로 실력이 늘어나는 시간입니다.

그리고 기억하세요 — 여러분이 이 교재에서 만든 모든 3D 물체, 모든 애니메이션, 모든 시뮬레이션은 **여러분의 생각에서 시작된 것**입니다. 코드는 생각을 현실로 옮기는 다리일 뿐입니다.

그 다리를 이제 여러분은 직접 놓을 수 있습니다.

> 🌟 **30시간의 여정을 함께한 여러분에게**: 처음 `sphere()`를 실행하던 날부터 오늘까지, 한 줄 한 줄 코드를 쓰며 성장한 여러분을 진심으로 축하합니다. 여러분은 이제 **생각을 코드로, 코드를 3차원으로** 옮길 수 있는 사람입니다. 이 능력을 가지고, 세상을 더 재미있게 만들어 주세요!
