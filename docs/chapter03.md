# Chapter 3: 색칠하고 꾸미기 — 속성과 표현

**Part 1: 3D 세계에 첫 발을 내딛다**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **color 속성으로 물체에 다양한 색상을 입힐 수 있다** — 내장 색상부터 RGB 커스텀 색상까지
- **opacity, texture, make_trail 등 시각 속성을 활용할 수 있다** — 투명도, 질감, 궤적 효과
- **여러 물체를 조합하여 하나의 장면(scene)을 구성할 수 있다** — '나만의 방 꾸미기' 프로젝트

> 🎨 **이번 시간에 만들 것**: 다양한 색상과 시각 효과를 활용하여 '나만의 방'을 3D로 꾸밉니다. 반투명 창문, 나무 질감 책상, 움직이는 궤적을 남기는 물체까지 — 코드로 예술을 하는 시간입니다!

---

## 💡 왜 이걸 배우나요?

### 색이 없는 세상은 재미없다

지난 두 장에서 여러분은 3D 물체를 만들고, 좌표를 이용해 원하는 위치에 배치하는 법을 배웠습니다. 그런데 솔직히, 흰색 물체만 덩그러니 놓여 있으면 좀 밋밋하지 않나요?

현실 세계를 떠올려 보세요. 우리 눈에 보이는 모든 것에는 **색상**, **질감**, **투명도**가 있습니다. 빨간 사과, 투명한 유리컵, 나뭇결이 보이는 책상, 하늘을 가로지르며 궤적을 남기는 비행기... 이런 시각적 속성들이 세상을 풍성하게 만듭니다.

프로그래밍에서도 마찬가지입니다. 물체에 **속성(attribute)**을 부여하는 것은 단순한 꾸미기가 아닙니다. 이것은 **"데이터로 시각적 의미를 표현하는 것"** — 프로그래밍의 가장 강력한 능력 중 하나입니다.

예를 들어, 과학 시뮬레이션에서 온도가 높은 물체를 빨간색으로, 차가운 물체를 파란색으로 표현하면 어떨까요? 데이터가 눈에 보이는 순간, 이해의 깊이가 달라집니다.

### 🧠 이번 장의 사고력 포인트

- **추상화(Abstraction)**: 빛의 삼원색(RGB)이라는 원리를 `vector(R, G, B)` 세 숫자로 추상화합니다
- **패턴 인식**: 모든 VPython 물체의 속성은 `속성명=값` 형태라는 일관된 패턴을 발견합니다
- **조합(Composition)**: 단순한 물체들을 합쳐 복잡한 장면을 구성하는 "조합의 힘"을 경험합니다

---

## 📚 핵심 개념

### 개념 1: 빛의 삼원색 — RGB 색상 원리

**🎭 비유로 시작하기**

물감을 섞어본 적이 있나요? 빨강과 노랑을 섞으면 주황색, 파랑과 노랑을 섞으면 초록색이 됩니다. 물감은 "색을 섞을수록 어두워지는" 방식입니다.

그런데 컴퓨터 화면은 다릅니다. 컴퓨터는 **빛**으로 색을 만듭니다. 빛의 삼원색 — **빨강(Red)**, **초록(Green)**, **파랑(Blue)** — 을 섞으면 **섞을수록 밝아집니다**. 세 가지를 모두 최대로 켜면? 흰색이 됩니다! 모두 끄면? 검정색이죠.

**📖 정확한 정의**

RGB 색상 모델은 빨강(R), 초록(G), 파랑(B) 세 가지 빛의 강도를 조합하여 색상을 표현하는 방식입니다. VPython에서는 각 값을 **0(꺼짐)부터 1(최대 밝기)** 사이의 숫자로 지정합니다.

> 📖 **파이썬 문법: vector(R, G, B)로 색상 만들기**
>
> VPython에서 커스텀 색상을 만들 때는 `vector(R, G, B)` 형식을 사용합니다. 각 값은 0에서 1 사이의 소수입니다.
>
> ```python
> color=vector(1, 0, 0)      # 빨강 (R만 최대)
> color=vector(0, 1, 0)      # 초록 (G만 최대)
> color=vector(0, 0, 1)      # 파랑 (B만 최대)
> color=vector(1, 1, 0)      # 노랑 (R+G)
> color=vector(1, 0, 1)      # 자홍 (R+B)
> color=vector(0, 1, 1)      # 청록 (G+B)
> color=vector(1, 1, 1)      # 흰색 (전부 최대)
> color=vector(0, 0, 0)      # 검정 (전부 꺼짐)
> color=vector(0.5, 0.5, 0.5)  # 회색 (전부 절반)
> ```
>
> 💡 일반적으로 색상은 0~255 범위를 쓰지만, VPython은 0~1 범위를 사용합니다. 255 기준 값을 변환하려면 255로 나누면 됩니다. 예: `RGB(255, 128, 0)` → `vector(1, 0.5, 0)`

**💻 예시로 확인하기**

```python
from vpython import *

# RGB 색상 원리를 눈으로 확인하기
# 빨강 + 초록 = 노랑
sphere(pos=vector(-4, 0, 0), color=vector(1, 0, 0), radius=0.8)   # 빨강
sphere(pos=vector(-2, 0, 0), color=vector(0, 1, 0), radius=0.8)   # 초록
sphere(pos=vector(0, 0, 0), color=vector(1, 1, 0), radius=0.8)    # 노랑 (R+G)

# 빨강 + 파랑 = 자홍
sphere(pos=vector(2, 0, 0), color=vector(0, 0, 1), radius=0.8)    # 파랑
sphere(pos=vector(4, 0, 0), color=vector(1, 0, 1), radius=0.8)    # 자홍 (R+B)
```

---

### 개념 2: VPython 내장 색상

**🎭 비유로 시작하기**

크레파스 상자를 열면 "빨강", "파랑", "초록" 같은 이름표가 붙어 있죠. 매번 물감을 섞을 필요 없이 이름만 말하면 바로 쓸 수 있습니다. VPython도 자주 쓰는 색상에 이름을 붙여 두었습니다.

**📖 정확한 정의**

VPython의 `color` 모듈에는 미리 정의된 색상들이 있습니다. `color.이름` 형태로 사용합니다.

**VPython 내장 색상 목록**

- **color.red** — 빨간색 `vector(1, 0, 0)`
- **color.green** — 초록색 `vector(0, 1, 0)`
- **color.blue** — 파란색 `vector(0, 0, 1)`
- **color.yellow** — 노란색 `vector(1, 1, 0)`
- **color.orange** — 주황색 `vector(1, 0.6, 0)`
- **color.cyan** — 청록색 `vector(0, 1, 1)`
- **color.magenta** — 자홍색 `vector(1, 0, 1)`
- **color.white** — 흰색 `vector(1, 1, 1)`
- **color.black** — 검정색 `vector(0, 0, 0)`
- **color.purple** — 보라색 `vector(0.4, 0.2, 0.6)`

**💻 예시로 확인하기**

```python
from vpython import *

# 내장 색상 팔레트 만들기
colors = [color.red, color.orange, color.yellow, color.green,
          color.cyan, color.blue, color.purple, color.magenta]

for i in range(len(colors)):
    sphere(pos=vector(i * 1.5 - 5.25, 0, 0), color=colors[i], radius=0.6)
```

> 지금은 `for`와 리스트를 아직 배우지 않았으니, 이 코드의 구조를 다 이해하지 못해도 괜찮습니다. 핵심은 **VPython에 미리 이름 붙은 색상들이 있다**는 것입니다. 하나하나 직접 써 봐도 됩니다!

**내장 색상 vs 커스텀 색상 — 언제 뭘 쓸까?**

- **내장 색상**: 빠르게 원하는 색을 지정할 때. `color.red`처럼 이름만 쓰면 끝!
- **커스텀 색상**: 내장 색상에 없는 미묘한 색이 필요할 때. `vector(1, 0.4, 0.7)`처럼 직접 RGB 값을 조합

---

### 개념 3: 투명도(opacity)

**🎭 비유로 시작하기**

유리컵은 투명합니다. 물은 반투명하죠. 나무 블록은 완전히 불투명합니다. 같은 물체라도 투명도에 따라 완전히 다른 느낌을 줍니다.

**📖 정확한 정의**

`opacity`는 물체의 투명도를 설정하는 속성입니다. **0(완전 투명, 안 보임)**부터 **1(완전 불투명, 기본값)**까지의 값을 가집니다.

> 📖 **파이썬 문법: 키워드 인자(keyword argument)**
>
> VPython에서 물체를 만들 때 사용하는 `color=color.red`, `opacity=0.5` 같은 것을 **키워드 인자**라고 합니다.
>
> ```python
> sphere(pos=vector(0,0,0), color=color.red, radius=1, opacity=0.5)
> #      ^^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^   ^^^^^^^^   ^^^^^^^^^^^
> #      키워드=값           키워드=값        키워드=값   키워드=값
> ```
>
> 규칙은 간단합니다.
> - `속성이름=값` 형태로 쓴다
> - 여러 개를 쓸 때는 **쉼표(`,`)**로 구분한다
> - 순서는 상관없다 (`color`를 먼저 쓰든 `radius`를 먼저 쓰든 결과가 같다)

**💻 예시로 확인하기**

```python
from vpython import *

# 투명도 비교: 1.0 → 0.2까지 점점 투명해지기
sphere(pos=vector(-4, 0, 0), color=color.red, radius=1, opacity=1.0)
sphere(pos=vector(-2, 0, 0), color=color.red, radius=1, opacity=0.8)
sphere(pos=vector(0, 0, 0), color=color.red, radius=1, opacity=0.6)
sphere(pos=vector(2, 0, 0), color=color.red, radius=1, opacity=0.4)
sphere(pos=vector(4, 0, 0), color=color.red, radius=1, opacity=0.2)
```

실행하면 왼쪽의 빨간 공은 완전히 불투명하고, 오른쪽으로 갈수록 점점 투명해져서 거의 안 보이게 됩니다. 유리, 물, 안개 같은 효과를 낼 때 유용합니다!

---

### 개념 4: 텍스처(texture)

**🎭 비유로 시작하기**

아무것도 칠하지 않은 나무 블록과, 나뭇결 무늬가 보이는 나무 블록은 느낌이 전혀 다릅니다. 같은 모양이라도 **표면에 어떤 무늬가 있느냐**에 따라 사실감이 확 달라지죠. 이것이 텍스처(질감)입니다.

**📖 정확한 정의**

`texture`는 물체의 표면에 이미지를 입히는 속성입니다. VPython은 몇 가지 내장 텍스처를 제공합니다.

**VPython 내장 텍스처 목록**

- **textures.wood** — 나무 질감
- **textures.rock** — 돌 질감
- **textures.rug** — 천/카펫 질감
- **textures.metal** — 금속 질감
- **textures.earth** — 지구 표면
- **textures.stucco** — 벽 질감
- **textures.flower** — 꽃무늬 질감
- **textures.granite** — 화강암 질감

**💻 예시로 확인하기**

```python
from vpython import *

# 다양한 텍스처를 상자에 적용해 보기
box(pos=vector(-4, 0, 0), size=vector(2, 2, 2), texture=textures.wood)
box(pos=vector(-1, 0, 0), size=vector(2, 2, 2), texture=textures.rock)
box(pos=vector(2, 0, 0), size=vector(2, 2, 2), texture=textures.metal)
sphere(pos=vector(5, 0, 0), radius=1, texture=textures.earth)
```

실행하면 나무 상자, 돌 상자, 금속 상자, 그리고 지구가 나란히 나타납니다. 같은 `box`인데 텍스처 하나로 완전히 다른 물체처럼 보이죠!

> ⚠️ **텍스처와 색상을 동시에 쓰면?** 텍스처가 적용된 물체에 `color`를 지정하면, 텍스처에 색상 **틴트(tint)**가 입혀집니다. 예를 들어 나무 텍스처에 `color=color.red`를 주면 붉은 빛이 도는 나무가 됩니다.

---

### 개념 5: 궤적(make_trail)

**🎭 비유로 시작하기**

밤하늘의 별똥별을 떠올려 보세요. 별이 떨어지면서 뒤에 빛나는 꼬리를 남깁니다. 비행기 구름, 달팽이가 지나간 자리, 아이스링크 위 스케이트 날 자국... 움직이는 물체의 **궤적(trail)**은 "어디서 왔고 어디로 갔는지"를 보여줍니다.

**📖 정확한 정의**

`make_trail=True`는 물체가 움직일 때 지나간 경로를 선으로 표시하는 속성입니다. 나중에 애니메이션을 배우면 아주 유용하게 쓰게 됩니다.

**💻 미리보기 — 궤적이 보이는 움직이는 공**

```python
from vpython import *

# 궤적을 남기는 빨간 공
ball = sphere(pos=vector(-5, 0, 0), color=color.red, radius=0.3,
              make_trail=True, trail_color=color.yellow)

# 공을 오른쪽으로 이동시키기 (애니메이션 맛보기!)
while ball.pos.x < 5:
    rate(30)  # 초당 30번 업데이트
    ball.pos.x = ball.pos.x + 0.05
    ball.pos.y = 2 * sin(ball.pos.x)  # 물결 모양으로 이동
```

실행하면 빨간 공이 물결 모양으로 움직이면서 뒤에 노란색 궤적을 남깁니다. `while`과 `rate()`는 Chapter 6에서 자세히 배우니, 지금은 "궤적이 이렇게 멋지구나!" 정도만 느껴 보세요.

> 💡 **궤적 관련 주요 속성들**
>
> - **make_trail=True** — 궤적 켜기
> - **trail_color=color.yellow** — 궤적 색상 지정
> - **trail_radius=0.05** — 궤적 선의 굵기
> - **retain=50** — 최근 50개 위치만 궤적으로 유지 (너무 길어지는 것 방지)

---

### 개념 6: 장면(scene) 설정

**🎭 비유로 시작하기**

연극 무대를 생각해 보세요. 배우(물체)도 중요하지만, 조명, 배경색, 카메라 각도도 무대의 분위기를 결정합니다. VPython에서 `scene`은 바로 이 **무대 설정**입니다.

**📖 정확한 정의**

`scene`은 VPython의 3D 화면(캔버스) 자체를 나타내는 객체입니다. 배경색, 화면 크기, 카메라 위치 등을 설정할 수 있습니다.

**💻 예시로 확인하기**

```python
from vpython import *

# 장면 설정
scene.background = color.black       # 배경을 검정색으로 (우주 느낌!)
scene.width = 800                     # 화면 너비
scene.height = 600                    # 화면 높이
scene.title = "🌌 나의 우주 장면"      # 화면 위에 제목 표시

# 우주 장면 만들기
sphere(pos=vector(0, 0, 0), color=color.yellow, radius=2,
       emissive=True)  # emissive=True → 스스로 빛나는 효과
sphere(pos=vector(5, 0, 0), color=color.cyan, radius=0.5,
       texture=textures.earth)
sphere(pos=vector(-4, 3, 0), color=color.red, radius=0.3)
sphere(pos=vector(3, -2, 2), color=color.orange, radius=0.4)
```

> 📖 **파이썬 문법: 점(.) 표기법으로 속성 접근하기**
>
> `scene.background = color.black`에서 점(`.`)은 "~의"라는 뜻입니다.
>
> ```python
> scene.background = color.black   # scene의 background를 검정으로 설정
> scene.width = 800                # scene의 width를 800으로 설정
> ```
>
> 이것은 물체에도 똑같이 적용됩니다.
>
> ```python
> ball = sphere(color=color.red)
> ball.color = color.blue   # ball의 color를 파란색으로 변경
> ball.radius = 2           # ball의 radius를 2로 변경
> ```
>
> 이 문법은 앞으로 매우 자주 사용됩니다!

---

## 🔨 따라하기

자, 이제 배운 것을 모두 합쳐서 **'나만의 방'**을 3D로 꾸며 봅시다! 단계별로 따라 하세요.

### Step 1: 방의 구조 만들기 — 바닥과 벽

먼저 방의 기본 구조를 만듭니다. 바닥과 뒷벽, 옆벽을 배치하겠습니다.

```python
from vpython import *

# === 장면 설정 ===
scene.background = vector(0.9, 0.95, 1)  # 연한 하늘색 배경
scene.title = "🏠 나만의 방 꾸미기"

# === 방 구조 ===
# 바닥 — 나무 질감
floor = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 8),
            texture=textures.wood)

# 뒷벽 — 연한 베이지색
back_wall = box(pos=vector(0, 2.5, -4), size=vector(10, 5, 0.1),
                color=vector(1, 0.95, 0.85), opacity=0.9)

# 왼쪽 벽 — 같은 색상
left_wall = box(pos=vector(-5, 2.5, 0), size=vector(0.1, 5, 8),
                color=vector(1, 0.95, 0.85), opacity=0.9)
```

**실행 결과**: 나무 바닥과 두 면의 벽이 보입니다. 마우스로 화면을 돌려보면 방의 구조를 확인할 수 있습니다.

코드를 살펴봅시다.

- `texture=textures.wood` — 바닥에 나무 질감을 입혔습니다
- `color=vector(1, 0.95, 0.85)` — 연한 베이지색을 RGB로 직접 만들었습니다
- `opacity=0.9` — 벽을 살짝 투명하게 해서 뒤쪽이 약간 비치게 했습니다

---

### Step 2: 가구 배치하기 — 책상, 의자, 침대

빈 방에 가구를 넣어 봅시다. 상자를 조합하면 가구를 표현할 수 있습니다.

```python
from vpython import *

# === 장면 설정 ===
scene.background = vector(0.9, 0.95, 1)
scene.title = "🏠 나만의 방 꾸미기"

# === 방 구조 ===
floor = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 8),
            texture=textures.wood)
back_wall = box(pos=vector(0, 2.5, -4), size=vector(10, 5, 0.1),
                color=vector(1, 0.95, 0.85), opacity=0.9)
left_wall = box(pos=vector(-5, 2.5, 0), size=vector(0.1, 5, 8),
                color=vector(1, 0.95, 0.85), opacity=0.9)

# === 책상 (왼쪽 벽 근처) ===
# 책상 상판 — 나무 질감
desk_top = box(pos=vector(-3.5, 1.2, -2), size=vector(2.5, 0.1, 1.2),
               texture=textures.wood)
# 책상 다리 4개
desk_leg1 = cylinder(pos=vector(-4.6, 0, -2.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg2 = cylinder(pos=vector(-2.4, 0, -2.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg3 = cylinder(pos=vector(-4.6, 0, -1.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg4 = cylinder(pos=vector(-2.4, 0, -1.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))

# === 의자 (책상 앞) ===
# 의자 좌석
seat = box(pos=vector(-3.5, 0.7, -0.8), size=vector(0.8, 0.08, 0.8),
           color=vector(0.3, 0.2, 0.1))
# 의자 등받이
backrest = box(pos=vector(-3.5, 1.2, -1.15), size=vector(0.8, 1, 0.08),
               color=vector(0.3, 0.2, 0.1))

# === 침대 (오른쪽) ===
# 매트리스 — 파란색 계열
mattress = box(pos=vector(2.5, 0.5, -2.5), size=vector(3, 0.5, 2),
               color=vector(0.6, 0.7, 0.9))
# 베개 — 흰색 구
pillow = ellipsoid(pos=vector(2.5, 0.85, -3.2), length=0.8, height=0.3,
                   width=0.5, color=color.white)
```

**실행 결과**: 방 안에 나무 책상, 의자, 침대와 베개가 배치되었습니다. 물체를 조합하면 가구를 만들 수 있다는 것이 핵심입니다!

주목할 점을 정리합니다.

- **책상 = 상판(box) + 다리 4개(cylinder)** — 간단한 물체의 조합으로 복잡한 물체를 표현합니다
- **의자 = 좌석(box) + 등받이(box)** — 같은 종류의 물체라도 크기와 위치를 달리하면 다른 부분이 됩니다
- **베개 = ellipsoid(타원체)** — 둥글납작한 모양을 표현하기에 딱 좋습니다
- 색상을 `vector(0.4, 0.25, 0.1)`처럼 갈색 계열로 직접 만들어 나무 느낌을 냈습니다

---

### Step 3: 꾸미기 — 창문, 조명, 소품 추가

마지막으로 창문과 소품을 추가하여 방을 완성합시다!

```python
from vpython import *

# === 장면 설정 ===
scene.background = vector(0.9, 0.95, 1)
scene.title = "🏠 나만의 방 꾸미기"

# === 방 구조 ===
floor = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 8),
            texture=textures.wood)
back_wall = box(pos=vector(0, 2.5, -4), size=vector(10, 5, 0.1),
                color=vector(1, 0.95, 0.85), opacity=0.9)
left_wall = box(pos=vector(-5, 2.5, 0), size=vector(0.1, 5, 8),
                color=vector(1, 0.95, 0.85), opacity=0.9)

# === 창문 (뒷벽에 반투명 파란색) ===
window_frame = box(pos=vector(2, 3, -3.9), size=vector(2.2, 1.7, 0.15),
                   color=vector(0.8, 0.8, 0.8))
window_glass = box(pos=vector(2, 3, -3.85), size=vector(2, 1.5, 0.05),
                   color=vector(0.5, 0.8, 1), opacity=0.3)

# === 책상 ===
desk_top = box(pos=vector(-3.5, 1.2, -2), size=vector(2.5, 0.1, 1.2),
               texture=textures.wood)
desk_leg1 = cylinder(pos=vector(-4.6, 0, -2.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg2 = cylinder(pos=vector(-2.4, 0, -2.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg3 = cylinder(pos=vector(-4.6, 0, -1.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg4 = cylinder(pos=vector(-2.4, 0, -1.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))

# === 의자 ===
seat = box(pos=vector(-3.5, 0.7, -0.8), size=vector(0.8, 0.08, 0.8),
           color=vector(0.3, 0.2, 0.1))
backrest = box(pos=vector(-3.5, 1.2, -1.15), size=vector(0.8, 1, 0.08),
               color=vector(0.3, 0.2, 0.1))

# === 침대 ===
mattress = box(pos=vector(2.5, 0.5, -2.5), size=vector(3, 0.5, 2),
               color=vector(0.6, 0.7, 0.9))
pillow = ellipsoid(pos=vector(2.5, 0.85, -3.2), length=0.8, height=0.3,
                   width=0.5, color=color.white)

# === 소품들 ===
# 책상 위 노란 램프
lamp_base = cylinder(pos=vector(-4, 1.25, -2.3), axis=vector(0, 0.1, 0),
                     radius=0.2, color=color.yellow)
lamp_shade = cone(pos=vector(-4, 1.75, -2.3), axis=vector(0, -0.4, 0),
                  radius=0.3, color=color.yellow, opacity=0.7)

# 빨간 사과 (책상 위)
apple = sphere(pos=vector(-3, 1.35, -1.8), radius=0.12,
               color=color.red)
apple_stem = cylinder(pos=vector(-3, 1.47, -1.8), axis=vector(0, 0.1, 0),
                      radius=0.02, color=vector(0.4, 0.25, 0.1))

# 지구본 (책상 위)
globe = sphere(pos=vector(-3.8, 1.55, -1.7), radius=0.25,
               texture=textures.earth)
globe_stand = cylinder(pos=vector(-3.8, 1.25, -1.7),
                       axis=vector(0, 0.3, 0),
                       radius=0.03, color=vector(0.5, 0.5, 0.5))

# 바닥 러그 — 둥근 느낌
rug = cylinder(pos=vector(0, 0.01, 0.5), axis=vector(0, 0.02, 0),
               radius=1.5, color=vector(0.7, 0.2, 0.3), opacity=0.8)
```

**실행 결과**: 완성입니다! 나무 바닥 위에 책상, 의자, 침대가 있고, 창문으로 연한 빛이 들어오며, 책상 위에는 램프, 사과, 지구본이 놓여 있습니다. 바닥에는 따뜻한 색상의 러그까지!

---

## 📝 전체 코드

이 장에서 만든 '나만의 방' 최종 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 다양한 색상과 시각 속성으로 '나만의 방' 꾸미기 ===
# --- WHY: 속성(color, opacity, texture)을 활용하여 풍부한 3D 장면을 구성하기 위해 ---

# 장면 설정
scene.background = vector(0.9, 0.95, 1)
scene.title = "🏠 나만의 방 꾸미기"

# ─── 방 구조 ─────────────────────────────
# 바닥 (나무 질감)
floor = box(pos=vector(0, -0.05, 0), size=vector(10, 0.1, 8),
            texture=textures.wood)

# 뒷벽 (연한 베이지)
back_wall = box(pos=vector(0, 2.5, -4), size=vector(10, 5, 0.1),
                color=vector(1, 0.95, 0.85), opacity=0.9)

# 왼쪽 벽
left_wall = box(pos=vector(-5, 2.5, 0), size=vector(0.1, 5, 8),
                color=vector(1, 0.95, 0.85), opacity=0.9)

# ─── 창문 (반투명 유리) ──────────────────
window_frame = box(pos=vector(2, 3, -3.9), size=vector(2.2, 1.7, 0.15),
                   color=vector(0.8, 0.8, 0.8))
window_glass = box(pos=vector(2, 3, -3.85), size=vector(2, 1.5, 0.05),
                   color=vector(0.5, 0.8, 1), opacity=0.3)

# ─── 책상 (나무 질감 + 다리 4개) ─────────
desk_top = box(pos=vector(-3.5, 1.2, -2), size=vector(2.5, 0.1, 1.2),
               texture=textures.wood)
desk_leg1 = cylinder(pos=vector(-4.6, 0, -2.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg2 = cylinder(pos=vector(-2.4, 0, -2.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg3 = cylinder(pos=vector(-4.6, 0, -1.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))
desk_leg4 = cylinder(pos=vector(-2.4, 0, -1.5), axis=vector(0, 1.2, 0),
                     radius=0.05, color=vector(0.4, 0.25, 0.1))

# ─── 의자 ────────────────────────────────
seat = box(pos=vector(-3.5, 0.7, -0.8), size=vector(0.8, 0.08, 0.8),
           color=vector(0.3, 0.2, 0.1))
backrest = box(pos=vector(-3.5, 1.2, -1.15), size=vector(0.8, 1, 0.08),
               color=vector(0.3, 0.2, 0.1))

# ─── 침대 ────────────────────────────────
mattress = box(pos=vector(2.5, 0.5, -2.5), size=vector(3, 0.5, 2),
               color=vector(0.6, 0.7, 0.9))
pillow = ellipsoid(pos=vector(2.5, 0.85, -3.2), length=0.8, height=0.3,
                   width=0.5, color=color.white)

# ─── 소품 ────────────────────────────────
# 책상 위 노란 램프
lamp_base = cylinder(pos=vector(-4, 1.25, -2.3), axis=vector(0, 0.1, 0),
                     radius=0.2, color=color.yellow)
lamp_shade = cone(pos=vector(-4, 1.75, -2.3), axis=vector(0, -0.4, 0),
                  radius=0.3, color=color.yellow, opacity=0.7)

# 빨간 사과
apple = sphere(pos=vector(-3, 1.35, -1.8), radius=0.12, color=color.red)
apple_stem = cylinder(pos=vector(-3, 1.47, -1.8), axis=vector(0, 0.1, 0),
                      radius=0.02, color=vector(0.4, 0.25, 0.1))

# 지구본
globe = sphere(pos=vector(-3.8, 1.55, -1.7), radius=0.25,
               texture=textures.earth)
globe_stand = cylinder(pos=vector(-3.8, 1.25, -1.7),
                       axis=vector(0, 0.3, 0),
                       radius=0.03, color=vector(0.5, 0.5, 0.5))

# 바닥 러그
rug = cylinder(pos=vector(0, 0.01, 0.5), axis=vector(0, 0.02, 0),
               radius=1.5, color=vector(0.7, 0.2, 0.3), opacity=0.8)
```

**실행하면 이런 장면이 보입니다**: 나무 바닥 위에 베이지색 벽으로 둘러싸인 방 안에 책상(지구본, 사과, 램프 포함), 의자, 침대, 반투명 유리 창문, 바닥 러그가 배치된 아늑한 3D 방입니다. 마우스로 드래그하여 다양한 각도에서 감상할 수 있습니다.

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 색상과 속성에 대한 **컴퓨팅 사고력**을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐)

> **문제**: 아래 코드를 실행하면 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 먼저 그려 보세요!

```python
from vpython import *

scene.background = color.black

sphere(pos=vector(0, 0, 0), color=color.yellow, radius=2, emissive=True)

sphere(pos=vector(4, 0, 0), color=color.cyan, radius=0.5)
sphere(pos=vector(4, 0, 0), color=color.cyan, radius=1, opacity=0.2)

sphere(pos=vector(-3, 2, 0), color=color.red, radius=0.3)
sphere(pos=vector(2, -3, 0), color=color.orange, radius=0.4)
sphere(pos=vector(-4, -1, 1), color=color.white, radius=0.15)
sphere(pos=vector(1, 3, -1), color=color.white, radius=0.1)
```

**생각해 볼 것**

- 배경은 무슨 색인가요?
- 가운데에 있는 큰 노란 구는 무엇을 닮았나요? (`emissive=True`는 "스스로 빛나는 효과"입니다)
- `vector(4, 0, 0)` 위치에는 구가 두 개 겹쳐 있습니다. 하나는 작고 불투명하고, 하나는 크고 거의 투명합니다. 이것은 무엇을 표현한 것 같나요?
- 나머지 작은 구들은 무엇을 표현한 것 같나요?

<details>
<summary>🔑 정답 확인하기</summary>

검정색 배경(우주)에 **태양계**를 간단하게 표현한 장면입니다!

- **가운데 큰 노란 구(radius=2, emissive=True)** — 스스로 빛나는 태양
- **오른쪽 청록색 구 2개** — 작은 구는 행성, 큰 투명한 구는 대기 또는 오로라를 표현
- **빨강, 주황, 흰색 작은 구들** — 다른 행성이나 별들

핵심 포인트: `opacity`로 투명한 대기를 표현하고, `emissive=True`로 빛나는 태양을 표현했습니다. 같은 `sphere()`라도 속성(색상, 투명도, 크기)이 달라지면 완전히 다른 의미를 가진 물체가 됩니다. 이것이 **속성의 힘**입니다!

</details>

---

### 🔄 결과 → 코드 역추적 (⭐⭐)

> **문제**: 아래와 같은 장면을 만드는 코드를 작성해 보세요.

**장면 설명: "신호등"**

- 배경은 **하늘색** `vector(0.6, 0.85, 1)`
- 신호등 기둥: 검정색 원기둥, 위치 `vector(0, 0, 0)`에서 위쪽으로 높이 4, 반지름 0.15
- 신호등 본체: 검정색 상자, 위치 `vector(0, 4, 0)`, 크기 가로 1, 세로 2.5, 깊이 0.8
- 빨간 불: 빨간색 구, 위치 `vector(0, 4.8, 0.5)`, 반지름 0.3, **`emissive=True`** (빛나는 효과)
- 노란 불: 노란색 구, 위치 `vector(0, 4.0, 0.5)`, 반지름 0.3, **`opacity=0.4`** (꺼진 상태를 표현)
- 초록 불: 초록색 구, 위치 `vector(0, 3.2, 0.5)`, 반지름 0.3, **`opacity=0.4`** (꺼진 상태를 표현)
- 바닥: 회색 상자, 위치 `vector(0, -0.05, 0)`, 크기 가로 6, 세로 0.1, 깊이 4

**힌트**

- 총 7개의 물체가 필요합니다 (기둥, 본체, 불 3개, 바닥, scene 설정)
- 빨간 불만 `emissive=True`(켜진 상태), 나머지 불은 `opacity=0.4`(꺼진 상태)
- "빛나는 것"과 "흐릿한 것"으로 켜짐/꺼짐을 표현하는 것이 포인트입니다

<details>
<summary>💡 힌트 더 보기</summary>

구조를 분해하면 이렇습니다.

- **scene.background** 설정 (1줄)
- **cylinder** 1개 (기둥)
- **box** 1개 (신호등 본체)
- **sphere** 3개 (빨강/노랑/초록 불)
- **box** 1개 (바닥)

빨간 불에는 `emissive=True`를 주고, 노란/초록 불에는 `opacity=0.4`를 줍니다.

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

# 장면 설정
scene.background = vector(0.6, 0.85, 1)

# 신호등 기둥
cylinder(pos=vector(0, 0, 0), axis=vector(0, 4, 0),
         radius=0.15, color=color.black)

# 신호등 본체
box(pos=vector(0, 4, 0), size=vector(1, 2.5, 0.8),
    color=color.black)

# 빨간 불 (켜진 상태 — emissive!)
sphere(pos=vector(0, 4.8, 0.5), radius=0.3,
       color=color.red, emissive=True)

# 노란 불 (꺼진 상태 — 투명하게)
sphere(pos=vector(0, 4.0, 0.5), radius=0.3,
       color=color.yellow, opacity=0.4)

# 초록 불 (꺼진 상태 — 투명하게)
sphere(pos=vector(0, 3.2, 0.5), radius=0.3,
       color=color.green, opacity=0.4)

# 바닥
box(pos=vector(0, -0.05, 0), size=vector(6, 0.1, 4),
    color=vector(0.5, 0.5, 0.5))
```

핵심 포인트: "켜진 불"은 `emissive=True`로, "꺼진 불"은 `opacity=0.4`로 표현했습니다. 같은 `sphere`라도 속성 하나 차이로 "켜짐"과 "꺼짐"이라는 **상태를 시각적으로 구분**할 수 있습니다. 이것이 바로 데이터를 시각화하는 첫 걸음입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐)

> **문제**: 이번 장에서 배운 색상, 투명도, 텍스처 속성을 활용하여 **'나만의 수족관'**을 3D로 만들어 보세요!

**아이디어 가이드**

- 🐠 **물고기**: 타원체(ellipsoid)로 몸통, 삼각형(cone)으로 꼬리, 구(sphere)로 눈
- 🌊 **물**: 큰 상자에 파란색 + opacity=0.2로 물을 표현
- 🪸 **산호/해초**: 원기둥(cylinder)을 초록/빨강으로 배치
- 🫧 **거품**: 작은 구에 opacity=0.3으로 반투명 거품
- 🏰 **장식물**: 상자나 피라미드로 수중 성 만들기
- **바닥**: 모래색(vector(0.9, 0.8, 0.6)) 또는 돌 텍스처

**규칙**

- `from vpython import *`로 시작할 것
- **색상을 5가지 이상** 사용할 것 (내장 색상 + 커스텀 RGB 혼합)
- **opacity를 최소 2곳**에 사용할 것
- 물체를 **7개 이상** 사용할 것
- 정답은 없습니다! 자유롭게 만들어 보세요

<details>
<summary>🔑 예시 답안: 간단한 수족관</summary>

```python
from vpython import *

# 장면 설정
scene.background = vector(0.1, 0.15, 0.3)
scene.title = "🐠 나의 수족관"

# 수조 (투명한 파란 물)
water = box(pos=vector(0, 1, 0), size=vector(8, 4, 5),
            color=vector(0.3, 0.6, 0.9), opacity=0.15)

# 바닥 (모래)
sand = box(pos=vector(0, -1, 0), size=vector(8, 0.3, 5),
           color=vector(0.9, 0.8, 0.6))

# 물고기 1 — 주황색
fish1_body = ellipsoid(pos=vector(-2, 1.5, 0), length=1.2, height=0.5,
                       width=0.4, color=color.orange)
fish1_tail = cone(pos=vector(-2.6, 1.5, 0), axis=vector(-0.5, 0, 0),
                  radius=0.3, color=color.orange)
fish1_eye = sphere(pos=vector(-1.5, 1.6, 0.2), radius=0.08,
                   color=color.white)

# 물고기 2 — 파란색
fish2_body = ellipsoid(pos=vector(1.5, 2, 0.5), length=0.8, height=0.4,
                       width=0.3, color=vector(0.2, 0.5, 1))
fish2_tail = cone(pos=vector(2, 2, 0.5), axis=vector(0.4, 0, 0),
                  radius=0.25, color=vector(0.2, 0.5, 1))

# 해초 — 초록 원기둥들
seaweed1 = cylinder(pos=vector(-3, -0.8, -1), axis=vector(0.2, 2, 0),
                    radius=0.08, color=color.green)
seaweed2 = cylinder(pos=vector(-2.5, -0.8, -1.5), axis=vector(-0.1, 1.8, 0),
                    radius=0.08, color=vector(0.1, 0.7, 0.3))
seaweed3 = cylinder(pos=vector(3, -0.8, 0.5), axis=vector(0.15, 2.2, 0),
                    radius=0.08, color=vector(0.2, 0.8, 0.2))

# 거품 — 반투명 흰 구
bubble1 = sphere(pos=vector(0, 2.5, 0.3), radius=0.12,
                 color=color.white, opacity=0.3)
bubble2 = sphere(pos=vector(1, 1.8, -0.5), radius=0.08,
                 color=color.white, opacity=0.25)
bubble3 = sphere(pos=vector(-1.5, 2.8, 0.1), radius=0.15,
                 color=color.white, opacity=0.3)

# 돌 — 회색 구
rock1 = sphere(pos=vector(2.5, -0.7, 1), radius=0.35,
               color=vector(0.5, 0.5, 0.5))
rock2 = sphere(pos=vector(2.8, -0.75, 0.7), radius=0.25,
               color=vector(0.6, 0.55, 0.5))
```

이것은 하나의 예시일 뿐입니다. 산호를 추가하거나, 물고기를 더 넣거나, 해적 보물 상자를 만들어 보세요!

</details>

---

## ⚠️ 자주 하는 실수

이 장에서 특히 자주 발생하는 실수들을 정리합니다.

**실수 1: RGB 값 범위를 잘못 씀 (0~255 vs 0~1)**

```python
# ❌ RGB(255, 128, 0)을 그대로 넣으면 매우 밝은 흰색이 됩니다!
from vpython import *
sphere(color=vector(255, 128, 0))
```

```python
# ✅ VPython은 0~1 범위! 255로 나누어서 변환하세요
from vpython import *
sphere(color=vector(255/255, 128/255, 0/255))  # = vector(1, 0.5, 0) 주황색
```

> VPython의 RGB 범위는 **0~1**입니다. 웹에서 찾은 RGB 값(0~255)을 쓸 때는 반드시 255로 나누세요!

**실수 2: opacity 값을 0으로 설정하여 물체가 보이지 않음**

```python
# ❌ opacity=0이면 완전 투명 → 안 보입니다!
from vpython import *
sphere(color=color.red, opacity=0)
```

```python
# ✅ "거의 투명"하게 하려면 0.1 ~ 0.2를 사용하세요
from vpython import *
sphere(color=color.red, opacity=0.15)
```

> `opacity=0`은 물체가 존재하지만 완전히 안 보이는 상태입니다. "투명한 유리"를 표현하고 싶다면 0.1~0.3 정도를 쓰세요.

**실수 3: texture 이름 오타**

```python
# ❌ textures가 아니라 texture라고 쓰면 오류!
from vpython import *
box(texture=texture.wood)  # AttributeError!
```

```python
# ✅ textures (복수형 s 포함!)
from vpython import *
box(texture=textures.wood)
```

> `textures`에는 **s**가 붙습니다! `textures.wood`, `textures.rock` 등 복수형입니다.

**실수 4: scene 설정을 물체 생성 뒤에 씀**

```python
# ⚠️ 물체를 먼저 만들고 scene을 설정하면 깜빡임이 생길 수 있습니다
from vpython import *
sphere(color=color.red)
scene.background = color.black  # 나중에 설정 → 처음에 흰 배경이 잠깐 보임
```

```python
# ✅ scene 설정은 가능하면 물체 생성 전에 합니다
from vpython import *
scene.background = color.black  # 먼저 설정!
sphere(color=color.red)
```

> `scene` 설정(배경색, 크기 등)은 코드 **맨 위쪽**(from vpython import * 바로 다음)에 쓰는 것이 좋습니다.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **`color=vector(1, 0.5, 0)`이 무슨 색인지 설명할 수 있나요?** → R=1(빨강 최대), G=0.5(초록 절반), B=0(파랑 없음) = 주황색
- [ ] **VPython의 내장 색상을 5가지 이상 말할 수 있나요?** → color.red, color.green, color.blue, color.yellow, color.orange, color.cyan, color.magenta, color.white, color.black, color.purple
- [ ] **`opacity=0.3`이 무엇을 의미하는지 설명할 수 있나요?** → 투명도 30% (꽤 투명한 상태)
- [ ] **`texture=textures.wood`가 무엇을 하는지 알고 있나요?** → 물체 표면에 나무 질감 이미지를 입힙니다
- [ ] **`make_trail=True`는 어떤 효과를 주나요?** → 물체가 움직일 때 지나간 경로를 선으로 표시합니다
- [ ] **`scene.background`를 어떻게 바꾸는지 알고 있나요?** → `scene.background = color.black` 또는 `scene.background = vector(R, G, B)`
- [ ] **여러 물체를 조합하여 가구나 사물을 만들 수 있나요?** → 상자+원기둥 = 책상, 구+원기둥 = 사과 등

> 💪 체크가 5개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: 그라데이션 색상 탐험

RGB 값을 조금씩 바꿔가며 색상이 어떻게 변하는지 관찰해 보세요.

```python
from vpython import *

scene.background = color.black

# 빨강 → 노랑 그라데이션 (G 값을 0에서 1로 점점 올리기)
sphere(pos=vector(-5, 0, 0), color=vector(1, 0, 0), radius=0.6)
sphere(pos=vector(-4, 0, 0), color=vector(1, 0.2, 0), radius=0.6)
sphere(pos=vector(-3, 0, 0), color=vector(1, 0.4, 0), radius=0.6)
sphere(pos=vector(-2, 0, 0), color=vector(1, 0.6, 0), radius=0.6)
sphere(pos=vector(-1, 0, 0), color=vector(1, 0.8, 0), radius=0.6)
sphere(pos=vector(0, 0, 0), color=vector(1, 1, 0), radius=0.6)

# 노랑 → 초록 그라데이션 (R 값을 1에서 0으로 점점 내리기)
sphere(pos=vector(1, 0, 0), color=vector(0.8, 1, 0), radius=0.6)
sphere(pos=vector(2, 0, 0), color=vector(0.6, 1, 0), radius=0.6)
sphere(pos=vector(3, 0, 0), color=vector(0.4, 1, 0), radius=0.6)
sphere(pos=vector(4, 0, 0), color=vector(0.2, 1, 0), radius=0.6)
sphere(pos=vector(5, 0, 0), color=vector(0, 1, 0), radius=0.6)
```

> 🔎 R, G, B 중 하나의 값만 조금씩 바꾸면 어떤 색 변화가 일어나는지 패턴을 찾아 보세요!

### 도전 2: 나만의 방에 물체 더 추가하기

전체 코드에서 출발하여, 아래 것들을 추가로 만들어 보세요.

- **시계**: 원기둥(flat) + 화살표(arrow)로 벽에 붙은 시계
- **책장**: 상자를 여러 개 쌓아 올리기
- **화분**: 원기둥(화분) + 구 또는 cone(식물)
- **창밖 풍경**: 초록색 구(나무)를 창문 뒤에 배치

### 도전 3: 같은 물체, 다른 느낌

같은 구(sphere)를 다양한 속성으로 만들어 보고, 어떻게 다른 느낌을 주는지 비교해 보세요.

```python
from vpython import *

scene.background = vector(0.2, 0.2, 0.3)

# 같은 크기, 같은 위치 패턴 — 속성만 다르게!
# 금속 느낌
sphere(pos=vector(-4, 0, 0), radius=1, color=vector(0.8, 0.8, 0.9),
       shininess=1)

# 지구
sphere(pos=vector(-1.5, 0, 0), radius=1, texture=textures.earth)

# 유리구슬 느낌
sphere(pos=vector(1.5, 0, 0), radius=1, color=vector(0.5, 0.8, 1),
       opacity=0.4)

# 태양 느낌
sphere(pos=vector(4, 0, 0), radius=1, color=color.yellow,
       emissive=True)
```

> 🎨 같은 `sphere(radius=1)`인데 속성에 따라 금속, 지구, 유리구슬, 태양 — 완전히 다른 물체로 느껴집니다. **속성이 곧 표현력**입니다!

---

## 🔗 다음 장으로

이번 장에서 우리는 3D 물체에 **생명력**을 불어넣었습니다.

**배운 것 정리**

- **RGB 색상**: `vector(R, G, B)`로 어떤 색이든 만들 수 있다 (각 값은 0~1)
- **내장 색상**: `color.red`, `color.blue` 등 이름으로 바로 쓸 수 있는 색상들
- **투명도**: `opacity=0~1`로 유리, 물, 안개 같은 투명한 물체를 표현
- **텍스처**: `texture=textures.wood` 등으로 표면에 질감을 입히기
- **궤적**: `make_trail=True`로 물체의 이동 경로를 추적
- **장면 설정**: `scene.background`, `scene.title` 등으로 무대를 꾸미기
- **조합의 힘**: 단순한 물체들을 합치면 책상, 가구, 방 전체를 만들 수 있다

지금까지 우리는 물체를 만들고, 위치를 잡고, 색칠하고 꾸미는 법을 배웠습니다. 하지만 아직 한 가지 아쉬운 점이 있습니다. 물체를 만들 때마다 `sphere(...)`, `sphere(...)`, `sphere(...)` 하고 매번 새로 써야 한다는 것이죠. 같은 공을 100개 만들려면 코드 100줄을 써야 할까요?

**다음 장 "변수 — 이름표를 붙여 기억하기"** 에서는 물체에 이름(변수)을 붙여서 나중에 다시 찾아 속성을 바꾸는 방법을 배웁니다. `ball = sphere(color=color.red)`라고 이름을 붙이면, 나중에 `ball.color = color.blue`로 색을 바꿀 수 있습니다. 물체를 "기억"하는 법을 배우는 시간입니다! 🏷️

> 🌟 **오늘의 한마디**: 여러분은 오늘 코드로 색을 입히고, 질감을 부여하고, 투명도를 조절하면서 3D 세계를 꾸몄습니다. 프로그래밍은 단순히 논리적인 작업이 아니라, **표현의 도구**이기도 합니다. 코드 한 줄로 물체에 영혼을 불어넣는 이 감각을 기억하세요!
