# Ch.15-A — 최종 프로젝트 A: 태양계 시뮬레이션

**Part 5: 설계와 완성** | 핵심: 함수 + 리스트 + 삼각함수 + 슬라이더

---

## 🎬 오늘의 미션: 태양계 시뮬레이션

태양 주위를 행성들이 돌고 있습니다. 슬라이더로 시간 속도를 조절하면 행성이 빠르게 또는 느리게 공전합니다.

**사용하는 개념**: sphere(태양+행성), for+리스트(여러 행성), 함수(행성 생성), slider(속도 조절), 애니메이션(공전), 삼각함수(원 궤도)

??? hint "설계 정리"

    **무엇이 움직이나요?** 행성 4개가 태양 주위를 원 궤도로 공전한다

    **사용자가 뭘 조절하나요?** 슬라이더로 공전 속도를 빠르게/느리게 조절

    **규칙:** 각 행성은 고유한 공전 반지름과 속도를 가진다. 안쪽 행성이 더 빠르다.

    **물체:** 노란 sphere(태양), 4색 sphere(행성), slider(속도), label(제목)

    **개념:** 변수(각도), for+리스트(행성 관리), 함수(행성 생성), slider(속도), 애니메이션, sin/cos(원 궤도)

---

## 🛠️ 단계별 구현 가이드

### Step 1: 무대 만들기 — 태양 배치

가장 먼저, 배경과 중심 물체를 만듭니다.

```python
GlowScript 3.2 VPython

scene.background = color.black
scene.caption = "태양계 시뮬레이션\n"

sun = sphere(pos=vector(0,0,0),
    radius=1.5,
    color=color.yellow,
    emissive=True)
```

실행하면 검은 우주 배경에 빛나는 노란 태양이 보입니다. `emissive=True`는 물체가 스스로 빛나는 것처럼 보이게 합니다.

### Step 2: 행성 만들기 — 함수와 리스트 활용

행성 하나하나를 따로 만드는 대신, 함수로 만들어 리스트에 담겠습니다.

```python
planets = []
angles = []

def add_planet(dist, size, col, spd):
    p = sphere(pos=vector(dist,0,0),
        radius=size,
        color=col,
        make_trail=True)
    planets.append(p)
    angles.append(0)
    return p
```

`make_trail=True`는 행성이 지나간 자리에 궤적을 남깁니다.

이제 행성을 추가합니다.

```python
dists = [3, 5, 7, 10]
sizes = [0.2, 0.35, 0.4, 0.3]
colors = [color.red, color.green,
    color.cyan, color.orange]
speeds = [0.03, 0.02, 0.015, 0.01]

for i in range(4):
    add_planet(dists[i], sizes[i],
        colors[i], speeds[i])
```

!!! tip "행성 수 바꾸기"

    리스트에 값을 추가하면 행성이 늘어납니다. 6개, 8개도 간단해요!

### Step 3: 슬라이더로 속도 조절

사용자가 시간 흐름 속도를 조절할 수 있게 합니다.

```python
speed_factor = 1

def set_speed(s):
    global speed_factor
    speed_factor = s.value

slider(min=0.1, max=5, value=1,
    bind=set_speed)
wtext(text="  시간 속도")
```

`speed_factor`는 기본값 1이고, 슬라이더를 오른쪽으로 밀면 최대 5배속까지 빨라집니다.

### Step 4: 애니메이션 루프 — 행성 공전

이제 핵심입니다. 행성을 원 궤도로 돌립니다.

```python
while True:
    rate(60)
    for i in range(len(planets)):
        angles[i] = angles[i] + speeds[i] * speed_factor
        r = dists[i]
        planets[i].pos = vector(
            r * cos(angles[i]),
            0,
            r * sin(angles[i]))
```

`cos`와 `sin`은 원 위의 좌표를 계산하는 수학 함수입니다. 각도가 조금씩 늘어나면서 행성이 원을 그리며 돕니다.

??? question "cos와 sin이 뭔가요?"

    원 위의 한 점을 (x, z)로 표현하면 `x = r * cos(각도)`, `z = r * sin(각도)`입니다. 각도가 0에서 시작해 점점 커지면, 점이 원을 따라 한 바퀴 돕니다.

    지금은 공식을 외울 필요 없어요. "각도가 바뀌면 원을 그린다"는 것만 기억하면 됩니다!

### Step 5: 테스트하기

여기서 잠깐 멈추고 실행해 보세요. 확인할 것들입니다.

- 태양이 중앙에 있는가?
- 행성 4개가 각각 다른 거리에서 도는가?
- 안쪽 행성이 바깥 행성보다 빠른가?
- 슬라이더를 움직이면 속도가 바뀌는가?

문제가 있다면 다음 섹션을 참고하세요.

### Step 6: 마무리 — 제목과 리셋 버튼

제목 라벨과 리셋 버튼을 추가해서 완성도를 높입니다.

```python
label(pos=vector(0,8,0),
    text='나의 태양계',
    height=20,
    color=color.white,
    box=False)
```

리셋 버튼을 추가하면 궤적을 지우고 처음부터 다시 시작할 수 있습니다.

```python
def reset(b):
    for i in range(len(planets)):
        angles[i] = 0
        planets[i].clear_trail()

button(text="리셋", bind=reset)
```

---

## 🐛 흔한 문제와 해결

!!! bug "행성이 원이 아니라 이상한 궤도를 그려요!"

    `cos`와 `sin`에 같은 각도를 넣었는지 확인하세요. 그리고 `r`(공전 반지름)이 매 프레임 바뀌고 있지는 않은지 확인하세요. `r = dists[i]`처럼 고정된 값을 써야 합니다.

!!! bug "슬라이더가 작동하지 않아요!"

    `bind=set_speed`에서 함수 이름 뒤에 괄호 `()`를 붙이지 마세요. `bind=set_speed`가 맞고 `bind=set_speed()`는 틀립니다.

    또한 `global speed_factor`를 함수 안에 썼는지 확인하세요. 이걸 빼면 슬라이더를 움직여도 전역 변수가 바뀌지 않습니다.

!!! bug "리스트 인덱스 오류가 나요!"

    `planets`, `angles`, `dists`, `speeds` 리스트의 길이가 모두 같은지 확인하세요. 행성을 4개 만들었으면 네 리스트 모두 요소가 4개여야 합니다.

!!! bug "화면이 너무 빠르거나 느려요!"

    `rate(60)` 값을 확인하세요. 60이면 초당 60프레임입니다. 그리고 `speeds` 리스트의 값이 너무 크면 행성이 순간이동하듯 보일 수 있어요. 0.01~0.05 사이가 적당합니다.

---

## 📝 완성 예시

먼저 무대와 태양을 만듭니다.

```python
GlowScript 3.2 VPython

# WHAT: 우주 배경 설정
scene.background = color.black
scene.caption = "태양계 시뮬레이션\n"

# WHAT: 태양 — 중앙에 고정
# WHY: emissive=True로 스스로 빛나는 효과
sun = sphere(pos=vector(0,0,0),
    radius=1.5,
    color=color.yellow,
    emissive=True)
```

행성 생성 함수를 정의합니다.

```python
# WHAT: 행성 데이터를 담을 리스트
planets = []
angles = []

# WHAT: 행성을 만드는 함수
# WHY: 같은 패턴을 반복하지 않기 위해
def add_planet(dist, size, col, spd):
    p = sphere(pos=vector(dist,0,0),
        radius=size, color=col,
        make_trail=True)
    planets.append(p)
    angles.append(0)
```

행성 4개를 리스트와 for로 생성합니다.

```python
# WHAT: 행성별 설정값
# WHY: 리스트로 관리하면 행성 추가가 쉽다
dists = [3, 5, 7, 10]
sizes = [0.2, 0.35, 0.4, 0.3]
colors = [color.red, color.green,
    color.cyan, color.orange]
speeds = [0.03, 0.02, 0.015, 0.01]

for i in range(4):
    add_planet(dists[i], sizes[i],
        colors[i], speeds[i])
```

슬라이더와 리셋 버튼을 추가합니다.

```python
# WHAT: 시간 속도 조절 슬라이더
speed_factor = 1

def set_speed(s):
    global speed_factor
    speed_factor = s.value

slider(min=0.1, max=5, value=1,
    bind=set_speed)
wtext(text="  시간 속도  ")
```

```python
# WHAT: 리셋 버튼
def reset(b):
    for i in range(len(planets)):
        angles[i] = 0
        planets[i].clear_trail()

button(text="리셋", bind=reset)
```

제목 라벨을 추가합니다.

```python
label(pos=vector(0,8,0),
    text='나의 태양계',
    height=20,
    color=color.white,
    box=False)
```

마지막으로 애니메이션 루프입니다.

```python
# WHAT: 메인 루프 — 매 프레임 행성 위치 갱신
# WHY: cos/sin으로 원 궤도를 계산
while True:
    rate(60)
    for i in range(len(planets)):
        angles[i] = angles[i] + speeds[i] * speed_factor
        r = dists[i]
        planets[i].pos = vector(
            r * cos(angles[i]),
            0,
            r * sin(angles[i]))
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 슬라이더로 공전 속도를 조절해 보세요!</div>
<iframe src="../demos/ch15a_final.html"></iframe>
</div>

??? success "실행 결과"

    검은 우주에 빛나는 노란 태양이 중앙에 있고, 빨강/초록/하늘/주황 행성 4개가 각자의 궤도를 따라 돕니다.

    안쪽 행성(빨강)이 가장 빠르고, 바깥 행성(주황)이 가장 느립니다. 행성이 지나간 자리에 궤적이 남아 원 궤도가 눈에 보입니다.

    슬라이더를 오른쪽으로 밀면 5배속, 왼쪽으로 밀면 0.1배속. 리셋 버튼을 누르면 궤적이 사라지고 처음부터 다시 시작합니다.

---

## 💡 업그레이드 아이디어

### 행성 이름표 달기

각 행성 옆에 이름을 표시할 수 있습니다.

```python
names = ["수성", "금성", "지구", "화성"]
name_labels = []
for i in range(len(planets)):
    lb = label(pos=planets[i].pos,
        text=names[i],
        height=12,
        xoffset=20)
    name_labels.append(lb)
```

메인 루프에서 라벨 위치를 매 프레임 업데이트하면 행성을 따라다닙니다.

### 행성 크기 슬라이더

슬라이더를 하나 더 추가해서 행성 크기를 실시간으로 바꿔 보세요.

```python
def set_size(s):
    for p in planets:
        p.radius = sizes[planets.index(p)] * s.value

slider(min=0.5, max=3, value=1,
    bind=set_size)
wtext(text="  행성 크기")
```

### 버튼으로 행성 추가

버튼을 누를 때마다 새 행성이 추가되는 기능은 어떨까요?

```python
def add_new(b):
    d = 3 + len(planets) * 2
    c = vector(random(), random(), random())
    add_planet(d, 0.25, c, 0.04/len(planets))

button(text="행성 추가", bind=add_new)
```

---

## ✅ 3줄 정리

1. **설계 → 분해 → 구현 → 테스트**가 프로젝트의 핵심 사이클입니다 — 코드부터 쓰지 말고 먼저 계획합니다
2. `cos`과 `sin`으로 **원 궤도**를 계산하고, `for + 리스트`로 여러 행성을 한꺼번에 관리합니다
3. `slider`로 실행 중에 값을 바꿀 수 있습니다 — `global` 키워드를 잊지 마세요
