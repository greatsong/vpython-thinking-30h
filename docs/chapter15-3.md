# Ch.15-C — 최종 프로젝트 C: 3D 수족관

**Part 5: 설계와 완성** | 핵심: 3D 이동 + 함수 + 버튼 + 랜덤

---

## 🎬 오늘의 미션: 나만의 3D 수족관

지금까지 우리가 만든 대부분의 프로그램은 **평면**(x-y)에서 움직였습니다.
오늘은 다릅니다. 물고기가 **앞뒤, 좌우, 위아래** — 진짜 3D로 헤엄칩니다.

수조 안에서 물고기가 자유롭게 돌아다니고, 버튼을 누르면 먹이가 떨어지고, 물고기들이 먹이를 향해 모여듭니다. 바닥에서는 거품이 보글보글 올라옵니다.

보고만 있어도 힐링되는 수족관을 만들어 봅시다.

오늘의 미션: **3D 공간을 자유롭게 헤엄치는 물고기 수족관을 설계하고 완성하기.**

---

## 📋 설계하기

### 세 가지 질문으로 정리

**무엇이 움직이나요?**
물고기가 수조 안에서 3D로 헤엄치고, 먹이가 위에서 아래로 떨어지고, 거품이 아래에서 위로 올라간다.

**사용자가 뭘 조절하나요?**
버튼으로 먹이를 주고, 슬라이더로 물고기 속도를 조절한다.

**어떤 규칙이 적용되나요?**
물고기는 수조 벽에 닿으면 방향을 바꾼다. 먹이가 있으면 가까운 물고기가 먹이 쪽으로 헤엄친다. 먹이에 닿으면 먹이가 사라진다.

### 물체 목록

- **수조 바닥** (box, 모래색)
- **물고기 12마리** (sphere, 알록달록, 3D 이동)
- **먹이** (sphere, 노란색, 위에서 아래로 떨어짐)
- **수초 6개** (cylinder, 초록색, 바닥에서 위로)
- **거품** (sphere, 반투명, 아래에서 위로)
- **먹이 주기 버튼** (button)
- **속도 슬라이더** (slider)
- **제목 라벨** (label)

### 사용하는 개념

- **sphere, box, cylinder** — 물고기, 수조, 수초, 거품, 먹이
- **for + 리스트** — 물고기 12마리, 수초 6개, 거품/먹이 관리
- **random()** — 물고기 위치·색·방향, 거품 생성 위치
- **함수** — create_fish(), drop_food()
- **button** — 먹이 주기 (Ch.14)
- **slider** — 물고기 속도 조절 (Ch.14)
- **조건문** — 벽 충돌 시 방향 전환, 먹이 감지 시 방향 변경
- **애니메이션** — while True + rate() (Ch.6)
- **3D 좌표** — x, y, z 모두 사용 — 이 프로젝트만의 특별한 점!

---

## 🛠️ 단계별 구현 가이드

### Step 1: 수조 만들기 — 바닥과 배경

바다 느낌의 배경과 모래색 바닥을 만듭니다.

```python
GlowScript 3.2 VPython

scene.background = vector(0.1, 0.2, 0.4)
scene.caption = "나의 3D 수족관\n"

# 수조 크기
W = 20   # 가로 (x)
H = 12   # 세로 (y)
D = 14   # 깊이 (z)

# 모래 바닥
box(pos=vector(0, -H/2, 0),
    size=vector(W, 0.3, D),
    color=vector(0.85, 0.75, 0.55))
```

실행하면 어두운 파란 배경에 모래색 바닥이 보입니다. 벌써 수조 느낌이 나죠?

### Step 2: 물고기 만들기 — 함수 + 리스트 + 3D 랜덤

물고기를 만드는 함수를 정의합니다. 핵심은 **x, y, z 세 방향 모두** 랜덤 위치와 이동 방향을 갖는 것입니다.

```python
fishes = []
fish_dirs = []

def create_fish():
    x = random()*W*0.8 - W*0.4
    y = random()*H*0.6 - H*0.2
    z = random()*D*0.8 - D*0.4
    f = sphere(
        pos=vector(x, y, z),
        radius=0.25 + random()*0.2,
        color=vector(
            random(),
            random()*0.5 + 0.5,
            random()))
    fishes.append(f)
    dx = random()*0.08 - 0.04
    dy = random()*0.04 - 0.02
    dz = random()*0.06 - 0.03
    fish_dirs.append(vector(dx, dy, dz))

for i in range(12):
    create_fish()
```

`dx`, `dy`, `dz` — 세 방향 모두 이동 속도가 있습니다. `dy`가 가장 작은 이유는 물고기가 위아래로는 천천히 움직이는 게 자연스럽기 때문이에요.

!!! tip "물고기 수 바꾸기"

    `range(12)`의 숫자를 바꾸면 물고기 수가 달라집니다. 20마리, 30마리도 가능하지만 너무 많으면 느려질 수 있어요!

### Step 3: 헤엄치기 — 애니메이션 + 방향 전환

물고기를 매 프레임 움직이고, 수조 벽에 닿으면 방향을 바꿉니다.

```python
fish_speed = 1

while True:
    rate(60)

    for i in range(len(fishes)):
        # 이동
        fishes[i].pos += fish_dirs[i] * fish_speed

        # 가끔 방향을 살짝 바꾸기 (자연스러운 헤엄)
        if random() < 0.02:
            fish_dirs[i].x = random()*0.08 - 0.04
            fish_dirs[i].z = random()*0.06 - 0.03

        # 수조 벽 체크
        if abs(fishes[i].pos.x) > W/2 - 1:
            fish_dirs[i].x = -fish_dirs[i].x
        if fishes[i].pos.y > H/2 - 1 or fishes[i].pos.y < -H/2 + 1:
            fish_dirs[i].y = -fish_dirs[i].y
        if abs(fishes[i].pos.z) > D/2 - 1:
            fish_dirs[i].z = -fish_dirs[i].z
```

`random() < 0.02`는 매 프레임 2% 확률로 방향을 바꿉니다. 이 작은 장치가 물고기의 움직임을 **자연스럽게** 만듭니다. 일직선으로만 왔다갔다하면 로봇 같겠죠?

실행해 보세요! 물고기들이 수조 안에서 3D로 헤엄치는 걸 볼 수 있습니다.

??? question "왜 abs()를 쓰나요?"

    `abs()`는 절댓값입니다. `abs(fishes[i].pos.x) > W/2 - 1`은 "x좌표가 오른쪽 벽이든 왼쪽 벽이든, 벽에 가까우면"이라는 뜻입니다. `fishes[i].pos.x > W/2 - 1 or fishes[i].pos.x < -W/2 + 1`을 줄여 쓴 것이에요.

### Step 4: 먹이 주기 — 버튼 + 충돌 감지

버튼을 누르면 먹이가 위에서 떨어지고, 물고기가 먹이를 향해 헤엄칩니다.

`while True` 위에 추가합니다.

```python
food_list = []

def drop_food(b):
    for i in range(5):
        f = sphere(
            pos=vector(
                random()*W*0.6 - W*0.3,
                H/2 - 1,
                random()*D*0.6 - D*0.3),
            radius=0.1,
            color=color.yellow)
        food_list.append(f)

button(text="먹이 주기", bind=drop_food)
```

메인 루프 안에 먹이 떨어짐과 물고기 먹이 감지 코드를 추가합니다.

```python
    # 먹이 떨어짐
    for f in food_list:
        if not f.visible:
            continue
        f.pos.y -= 0.02

        # 바닥에 닿으면 사라짐
        if f.pos.y < -H/2:
            f.visible = False

        # 가까운 물고기가 먹이 쪽으로 방향 전환
        for i in range(len(fishes)):
            dist = mag(fishes[i].pos - f.pos)
            if dist < 3:
                # 먹이 방향으로 서서히 회전
                toward = (f.pos - fishes[i].pos) * 0.01
                fish_dirs[i] = fish_dirs[i] + toward

            # 먹이 먹기
            if dist < fishes[i].radius + f.radius:
                f.visible = False
```

핵심은 `(f.pos - fishes[i].pos) * 0.01`입니다. 이것은 "먹이 방향을 가리키는 벡터"에 0.01을 곱해서 **아주 살짝** 방향을 꺾는 것입니다. 급격하게 꺾지 않고 서서히 방향을 바꾸니까 자연스러워 보여요.

### Step 5: 슬라이더로 속도 조절

물고기 수영 속도를 실시간으로 바꿀 수 있게 합니다.

`while True` 위에 추가합니다.

```python
def set_fish_speed(s):
    global fish_speed
    fish_speed = s.value

slider(min=0.2, max=3, value=1,
    bind=set_fish_speed)
wtext(text="  물고기 속도")
```

슬라이더를 왼쪽으로 밀면 느릿느릿 슬로우 모션, 오른쪽으로 밀면 초고속 수영!

### Step 6: 꾸미기 — 수초와 거품

수초와 거품을 추가해서 진짜 수족관처럼 만듭니다.

`while True` 위에 수초를 심습니다.

```python
# 수초 — 바닥에서 위로 자라는 초록 기둥
for i in range(6):
    x = random()*W*0.8 - W*0.4
    z = random()*D*0.8 - D*0.4
    h = 1 + random()*3
    cylinder(
        pos=vector(x, -H/2, z),
        axis=vector(0, h, 0),
        radius=0.08,
        color=vector(0.1, 0.5+random()*0.3, 0.1))
```

거품 리스트를 만들고, 메인 루프 안에서 거품을 생성하고 올립니다.

```python
bubbles = []
```

메인 루프 안에 추가합니다.

```python
    # 거품 생성 (매 프레임 5% 확률)
    if random() < 0.05:
        bx = random()*W*0.6 - W*0.3
        bz = random()*D*0.6 - D*0.3
        b = sphere(
            pos=vector(bx, -H/2 + 0.5, bz),
            radius=0.05 + random()*0.08,
            color=vector(0.7, 0.85, 1),
            opacity=0.4)
        bubbles.append(b)

    # 거품 올라감
    for b in bubbles:
        if not b.visible:
            continue
        b.pos.y += 0.03 + random()*0.01
        if b.pos.y > H/2:
            b.visible = False
```

마지막으로 제목을 달아 줍니다.

```python
label(pos=vector(0, H/2 + 1, 0),
    text='나의 3D 수족관',
    height=20,
    color=color.white,
    box=False)
```

---

## 🐛 흔한 문제와 해결

!!! bug "물고기가 벽을 뚫고 나가요!"

    경계 체크에서 `W/2`가 아니라 `W/2 - 1`처럼 약간 안쪽을 기준으로 해야 합니다. 물고기가 정확히 벽 위치에서 방향을 바꾸면 한 프레임 동안 벽 밖에 있을 수 있어요.

!!! bug "물고기가 먹이 근처에서 빙글빙글 돌아요!"

    `toward` 벡터의 크기가 너무 크면 먹이를 지나쳐서 반대쪽으로 갔다가 다시 돌아오는 걸 반복합니다. `0.01` 대신 `0.005`처럼 더 작은 값을 쓰면 부드럽게 접근합니다.

!!! bug "거품이 점점 느려져요!"

    `bubbles` 리스트가 계속 커지면 보이지 않는 거품까지 매 프레임 처리해서 느려집니다. 업그레이드 아이디어의 "리스트 정리" 코드를 참고하세요.

!!! bug "먹이 버튼을 여러 번 누르면 너무 많아져요!"

    `food_list`에 먹이가 쌓이는 것이 원인입니다. 버튼 함수 맨 앞에 이전 먹이를 정리하는 코드를 넣으면 됩니다: `for f in food_list: f.visible = False`

---

## 📝 완성 예시

무대와 수조를 만듭니다.

```python
GlowScript 3.2 VPython

# WHAT: 바다색 배경
scene.background = vector(0.1, 0.2, 0.4)
scene.caption = "나의 3D 수족관\n"

# WHAT: 수조 크기
W = 20
H = 12
D = 14

# WHAT: 모래 바닥
box(pos=vector(0, -H/2, 0),
    size=vector(W, 0.3, D),
    color=vector(0.85, 0.75, 0.55))
```

물고기 생성 함수를 정의하고 12마리를 만듭니다.

```python
# WHAT: 물고기 리스트와 생성 함수
# WHY: 3D 이동을 위해 dx, dy, dz 세 방향 모두 필요
fishes = []
fish_dirs = []

def create_fish():
    x = random()*W*0.8 - W*0.4
    y = random()*H*0.6 - H*0.2
    z = random()*D*0.8 - D*0.4
    f = sphere(
        pos=vector(x, y, z),
        radius=0.25 + random()*0.2,
        color=vector(
            random(),
            random()*0.5 + 0.5,
            random()))
    fishes.append(f)
    dx = random()*0.08 - 0.04
    dy = random()*0.04 - 0.02
    dz = random()*0.06 - 0.03
    fish_dirs.append(vector(dx, dy, dz))

for i in range(12):
    create_fish()
```

수초를 바닥에 심습니다.

```python
# WHAT: 수초 — 바닥 장식
# WHY: 높이를 랜덤으로 해서 자연스럽게
for i in range(6):
    x = random()*W*0.8 - W*0.4
    z = random()*D*0.8 - D*0.4
    h = 1 + random()*3
    cylinder(
        pos=vector(x, -H/2, z),
        axis=vector(0, h, 0),
        radius=0.08,
        color=vector(0.1, 0.5+random()*0.3, 0.1))
```

먹이 시스템과 버튼을 추가합니다.

```python
# WHAT: 먹이 리스트와 먹이 주기 버튼
food_list = []

def drop_food(b):
    for i in range(5):
        f = sphere(
            pos=vector(
                random()*W*0.6 - W*0.3,
                H/2 - 1,
                random()*D*0.6 - D*0.3),
            radius=0.1,
            color=color.yellow)
        food_list.append(f)

button(text="먹이 주기", bind=drop_food)
```

속도 슬라이더를 추가합니다.

```python
# WHAT: 물고기 속도 조절
fish_speed = 1

def set_fish_speed(s):
    global fish_speed
    fish_speed = s.value

slider(min=0.2, max=3, value=1,
    bind=set_fish_speed)
wtext(text="  물고기 속도")
```

제목과 거품 리스트를 준비합니다.

```python
label(pos=vector(0, H/2 + 1, 0),
    text='나의 3D 수족관',
    height=20,
    color=color.white,
    box=False)

bubbles = []
```

마지막으로 메인 루프입니다.

```python
# WHAT: 메인 루프
while True:
    rate(60)

    # WHAT: 물고기 이동
    for i in range(len(fishes)):
        fishes[i].pos += fish_dirs[i] * fish_speed

        # 가끔 방향 살짝 변경
        if random() < 0.02:
            fish_dirs[i].x = random()*0.08 - 0.04
            fish_dirs[i].z = random()*0.06 - 0.03

        # 수조 벽 체크
        if abs(fishes[i].pos.x) > W/2 - 1:
            fish_dirs[i].x = -fish_dirs[i].x
        if fishes[i].pos.y > H/2 - 1 or fishes[i].pos.y < -H/2 + 1:
            fish_dirs[i].y = -fish_dirs[i].y
        if abs(fishes[i].pos.z) > D/2 - 1:
            fish_dirs[i].z = -fish_dirs[i].z

    # WHAT: 먹이 떨어짐 + 물고기 먹이 감지
    for f in food_list:
        if not f.visible:
            continue
        f.pos.y -= 0.02
        if f.pos.y < -H/2:
            f.visible = False

        for i in range(len(fishes)):
            dist = mag(fishes[i].pos - f.pos)
            # WHY: 거리 3 이내면 먹이 쪽으로 서서히 방향 전환
            if dist < 3:
                toward = (f.pos - fishes[i].pos) * 0.01
                fish_dirs[i] = fish_dirs[i] + toward
            if dist < fishes[i].radius + f.radius:
                f.visible = False

    # WHAT: 거품 생성 (5% 확률)
    if random() < 0.05:
        bx = random()*W*0.6 - W*0.3
        bz = random()*D*0.6 - D*0.3
        b = sphere(
            pos=vector(bx, -H/2 + 0.5, bz),
            radius=0.05 + random()*0.08,
            color=vector(0.7, 0.85, 1),
            opacity=0.4)
        bubbles.append(b)

    # WHAT: 거품 올라감
    for b in bubbles:
        if not b.visible:
            continue
        b.pos.y += 0.03 + random()*0.01
        if b.pos.y > H/2:
            b.visible = False
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 먹이를 주고 물고기 속도를 조절해 보세요!</div>
<iframe src="../demos/ch15c_final.html"></iframe>
</div>

??? success "실행 결과"

    어두운 파란 배경에 모래색 바닥, 초록 수초가 보입니다. 알록달록한 물고기 12마리가 수조 안을 3D로 자유롭게 헤엄칩니다.

    마우스로 화면을 돌려 보면 물고기가 앞뒤로도 움직이는 게 보여요! 바닥에서는 반투명한 거품이 보글보글 올라옵니다.

    "먹이 주기" 버튼을 누르면 노란 먹이 5개가 위에서 떨어지고, 근처 물고기가 먹이 쪽으로 모여듭니다. 슬라이더로 속도를 올리면 활발하게, 내리면 느긋하게 헤엄칩니다.

---

## 💡 업그레이드 아이디어

### 물고기 크기 변화

먹이를 먹은 물고기가 조금씩 커지게 하면 재미있습니다.

```python
            if dist < fishes[i].radius + f.radius:
                f.visible = False
                fishes[i].radius += 0.01
```

### 리스트 정리 (성능 최적화)

거품과 먹이가 쌓이면 느려질 수 있습니다. 보이지 않는 항목을 주기적으로 정리해 보세요.

```python
    # 100프레임마다 리스트 정리
    if random() < 0.01:
        bubbles[:] = [b for b in bubbles
            if b.visible]
        food_list[:] = [f for f in food_list
            if f.visible]
```

### 물고기 추가 버튼

버튼을 누를 때마다 물고기가 한 마리 추가되는 기능은 어떨까요?

```python
def add_fish(b):
    create_fish()

button(text="물고기 추가", bind=add_fish)
```

### 배경 색 슬라이더

슬라이더로 수조의 물 색상을 바꿔 보세요. 낮/밤 분위기를 연출할 수 있습니다.

```python
def set_light(s):
    v = s.value
    scene.background = vector(
        0.1*v, 0.2*v, 0.4*v)

slider(min=0.2, max=1.5, value=1,
    bind=set_light)
wtext(text="  조명")
```

---

## ✅ 3줄 정리

1. **x, y, z 세 방향**을 모두 사용하면 진짜 3D 시뮬레이션이 됩니다 — 2D와 3D의 차이는 `dz` 하나 추가하는 것뿐입니다!
2. `random() < 0.02`처럼 **확률적 방향 전환**이 자연스러운 움직임의 비결입니다 — 작은 랜덤이 큰 차이를 만듭니다
3. `(목표 - 현재위치) * 작은값`으로 **서서히 방향을 꺾는 기법**은 게임과 시뮬레이션에서 자주 쓰입니다

---

## 🎉 마무리: 15챕터를 완주한 여러분에게

여러분은 해냈습니다.

Ch.1에서 `sphere()` 한 줄로 하얀 공을 만들었던 것을 기억하시나요?
그때는 "이게 뭐지?" 싶었을 겁니다.

그런데 지금 여러분은 함수로 물체를 자동 생성하고, 리스트로 수십 개의 물체를 관리하고, 슬라이더와 버튼으로 사용자가 조절할 수 있는 인터랙티브 시뮬레이션을 만들고 있습니다.

**15챕터 전의 여러분과 지금의 여러분은 완전히 다른 사람입니다.**

프로그래밍은 끝이 아니라 시작입니다.
여러분이 배운 것은 VPython이라는 하나의 도구이지만, 그 안에서 익힌 **사고방식** — 문제를 분해하고, 패턴을 찾고, 추상화하고, 테스트하는 능력 — 은 어떤 프로그래밍 언어에서든, 어떤 분야에서든 통합니다.

궁금한 것이 생기면 코드를 써서 실험해 보세요.
"이걸 바꾸면 어떻게 될까?" — 이 질문이 여러분을 계속 성장시킬 겁니다.

**15챕터를 완주한 여러분, 정말 축하합니다!**

여러분의 3D 세계는 이제 막 시작되었습니다.
