# Ch.3 — 다양한 물체, 다양한 속성

**Part 1: 3D 첫 걸음** | 핵심: `box`, `cylinder`, `cone`

---

## 🎬 오늘의 장면

놀이터를 상상해 보세요. 시소, 미끄럼틀, 그네, 그리고 넓은 잔디밭. 이 놀이터를 한번 코드로 만들어 봤습니다.

```python
GlowScript 3.2 VPython
# 잔디밭
box(pos=vector(0,-0.1,0), size=vector(20,0.2,12), color=color.green)
# 시소 — 받침대(원기둥) + 널빤지(상자)
cylinder(pos=vector(-5,-0.1,0), axis=vector(0,1,0), radius=0.3, color=color.gray(0.5))
box(pos=vector(-5,1,0), size=vector(5,0.2,1), color=vector(0.6,0.3,0.1))
# 미끄럼틀 — 사다리(기둥) + 경사면(상자)
box(pos=vector(2,1.5,0), size=vector(0.3,3,1), color=color.blue)
box(pos=vector(4,0.8,0), size=vector(4,0.15,1), color=color.yellow)
# 그네 — 기둥(원기둥) + 좌석(공)
cylinder(pos=vector(-1,0,3), axis=vector(0,4,0), radius=0.15, color=color.red)
cylinder(pos=vector(1,0,3), axis=vector(0,4,0), radius=0.15, color=color.red)
sphere(pos=vector(0,1.5,3), radius=0.3, color=color.orange)
```

마우스로 돌려보세요. 잔디밭 위에 시소, 미끄럼틀, 그네가 보입니다!

<div class="glowscript-demo" markdown>
<div class="demo-label">마우스로 돌려보세요!</div>
<iframe src="../demos/ch03_scene.html"></iframe>
</div>

**이 놀이터는 `sphere` 하나로는 만들 수 없었습니다.** `box`, `cylinder`, `cone`... 다양한 물체를 조합하면 무엇이든 만들 수 있어요!

오늘은 새로운 3D 물체들을 만나고, 각 물체만의 특별한 속성을 발견해 봅시다.

---

## 🔍 코드 읽기 챌린지

아래 코드를 **실행하지 말고** 머릿속으로 그려 보세요.

```python
GlowScript 3.2 VPython
box()
```

??? question "화면에 무엇이 보일까요?"

    **하얀 정육면체**가 화면 한가운데에 나타납니다.

    `sphere()`가 공을 만들었듯이, `box()`는 상자를 만듭니다.
    아무 속성도 안 주면 가로, 세로, 깊이가 모두 1인 하얀 정육면체가 됩니다.

그러면 이건 어떨까요?

```python
GlowScript 3.2 VPython
box(size=vector(4, 1, 2), color=color.blue)
```

??? question "이번에는 어떤 모양일까요?"

    **넓고 납작한 파란 상자**가 나타납니다!

    - `size=vector(4, 1, 2)` → 가로 4, 세로 1, 깊이 2
    - 가로가 세로보다 훨씬 크니까 넓적한 판 모양이 됩니다.

    `sphere`는 `radius` 하나로 크기를 정했는데, `box`는 `size`로 세 방향의 길이를 각각 정합니다. 벌써 차이가 보이죠?

하나 더!

```python
GlowScript 3.2 VPython
cylinder(color=color.green)
```

??? question "이건 무슨 모양일까요?"

    **초록색 원기둥**이 나타납니다. 그런데 세로로 서 있는 게 아니라... **옆으로 누워 있습니다!**

    왜일까요? `cylinder`는 기본적으로 x 방향(오른쪽)으로 뻗습니다.
    세로로 세우려면 방향을 바꿔줘야 해요. 어떻게 하는지는 곧 배웁니다!

---

## 🛠️ 직접 만들어보기

### 실험 1: box 탐험 — size의 비밀

먼저 기본 상자부터 시작합시다.

```python
GlowScript 3.2 VPython
box()
```

하얀 정육면체가 나타납니다. 이제 `size`를 써서 모양을 바꿔 봅시다.

```python
GlowScript 3.2 VPython
box(size=vector(4, 1, 2), color=color.blue)
```

넓고 납작한 파란 상자! `size=vector(가로, 세로, 깊이)` 패턴이 보이나요?

!!! tip "바꿔 보기"

    - `size=vector(1, 4, 1)` → 세로로 긴 기둥 모양
    - `size=vector(4, 4, 0.2)` → 얇은 벽 모양
    - `size=vector(1, 1, 5)` → 앞뒤로 긴 막대

    숫자 세 개를 바꿔 보면서 어떤 방향이 가로이고, 어떤 방향이 세로인지 직접 확인해 보세요!

### 실험 2: cylinder 탐험 — axis의 비밀

원기둥을 만들어 봅시다.

```python
GlowScript 3.2 VPython
cylinder(color=color.green)
```

옆으로 누운 초록 원기둥이 나타납니다. 이제 세워 봅시다!

```python
GlowScript 3.2 VPython
cylinder(axis=vector(0, 3, 0), color=color.green)
```

이번에는 **위로 선 기둥**이 됩니다! `axis=vector(0, 3, 0)`은 "y 방향(위쪽)으로 3만큼 뻗어라"라는 뜻입니다.

!!! tip "axis의 역할"

    `axis`는 **방향**과 **길이**를 동시에 정합니다.

    - `axis=vector(1, 0, 0)` → 오른쪽으로 길이 1 (기본값)
    - `axis=vector(0, 5, 0)` → 위쪽으로 길이 5
    - `axis=vector(0, 0, 3)` → 앞쪽으로 길이 3
    - `axis=vector(2, 2, 0)` → 대각선으로!

    다양한 방향을 시도해 보세요!

### 실험 3: cone 탐험 — 또 axis!

이번에는 원뿔입니다.

```python
GlowScript 3.2 VPython
cone(color=color.orange)
```

옆으로 누운 주황 원뿔이 나타납니다. 세워 볼까요?

```python
GlowScript 3.2 VPython
cone(axis=vector(0, 2, 0), color=color.orange)
```

위를 향해 선 원뿔! `cylinder`와 똑같이 `axis`로 방향을 정합니다.

**패턴 발견**: `cylinder`도 `axis`, `cone`도 `axis`! 둥근 물체들은 `axis`로 방향을 정하는 공통점이 있습니다.

!!! tip "바꿔 보기"

    - `cone(axis=vector(0, -2, 0), color=color.red)` → 거꾸로 뒤집힌 원뿔!
    - `cone(axis=vector(3, 0, 0), radius=0.5, color=color.yellow)` → 납작하고 긴 원뿔
    - `radius`를 바꾸면 밑면의 크기가 달라집니다.

### 실험 4: 물체 조합 — 간단한 로봇

이제 배운 물체들을 모두 합쳐서 로봇을 만들어 봅시다!

```python
GlowScript 3.2 VPython
# 몸통 (파란 상자)
box(pos=vector(0, 2, 0), size=vector(2, 2.5, 1), color=color.blue)
# 머리 (빨간 공)
sphere(pos=vector(0, 4, 0), radius=0.7, color=color.red)
# 왼팔 (초록 원기둥)
cylinder(pos=vector(-1, 3, 0), axis=vector(-1.5, 0, 0), radius=0.15, color=color.green)
# 오른팔 (초록 원기둥)
cylinder(pos=vector(1, 3, 0), axis=vector(1.5, 0, 0), radius=0.15, color=color.green)
# 왼다리 (회색 원기둥)
cylinder(pos=vector(-0.4, 0.8, 0), axis=vector(0, -1.5, 0), radius=0.2, color=color.gray(0.6))
# 오른다리 (회색 원기둥)
cylinder(pos=vector(0.4, 0.8, 0), axis=vector(0, -1.5, 0), radius=0.2, color=color.gray(0.6))
# 모자 (주황 원뿔)
cone(pos=vector(0, 4.5, 0), axis=vector(0, 1, 0), radius=0.7, color=color.orange)
```

실행하면 상자 몸통, 공 머리, 원기둥 팔다리, 원뿔 모자를 가진 로봇이 나타납니다! **4종류의 물체를 좌표로 배치**해서 하나의 장면을 만든 것입니다.

!!! tip "바꿔 보기"

    - 팔의 `axis` 방향을 바꿔서 만세 자세로 만들어 보세요
    - 몸통 색, 머리 색을 바꿔서 나만의 로봇으로 꾸며 보세요
    - 눈(작은 검은 공 2개)을 추가해 보세요!

---

## 🔄 역추적 챌린지

이번에는 **거꾸로**! 완성된 장면 설명을 읽고, 코드를 직접 작성해 보세요.

**장면 설명**: 빨간 지붕의 작은 집이 있습니다.

<div class="scene-preview">
  <div class="obj" style="left: 30%; top: 35%; width: 120px; height: 80px; border-radius: 4px; background: linear-gradient(135deg, #ffeaa7, #fdcb6e);"></div>
  <div style="position: absolute; left: 27.5%; top: 12%; width: 0; height: 0; border-left: 72px solid transparent; border-right: 72px solid transparent; border-bottom: 55px solid #e74c3c;"></div>
  <div class="obj" style="left: 58%; top: 5%; width: 14px; height: 35px; border-radius: 2px; background: linear-gradient(to right, #95a5a6, #7f8c8d);"></div>
  <div class="obj" style="left: 43%; top: 55%; width: 22px; height: 40px; border-radius: 3px 3px 0 0; background: linear-gradient(135deg, #8B5E3C, #6D4C2A);"></div>
</div>

- 벽은 **노란 상자**: 위치 `vector(0, 1, 0)`, 크기 가로 3, 세로 2, 깊이 3
- 지붕은 **빨간 원뿔**: 위치 `vector(0, 2, 0)`, 위로 1.5만큼 뻗음, 밑면 반지름 2.2
- 굴뚝은 **회색 원기둥**: 위치 `vector(1, 2.5, 0)`, 위로 1만큼, 반지름 0.15
- 문은 **갈색 작은 상자**: 위치 `vector(0, 0.5, 1.51)`, 크기 가로 0.6, 세로 1, 깊이 0.05

**생각의 순서**:

1. 물체는 총 몇 개? 어떤 종류?
2. 각 물체의 고유 속성은? (box는 size, cone은 axis+radius...)
3. 위치(pos)는 어떻게 배치하면 집처럼 보일까?

??? hint "힌트"

    물체는 4개: box 2개(벽, 문) + cone 1개(지붕) + cylinder 1개(굴뚝)

    - 벽: `box(pos=..., size=..., color=color.yellow)`
    - 지붕: `cone(pos=..., axis=vector(0, 1.5, 0), radius=2.2, color=color.red)`
    - 굴뚝: `cylinder(pos=..., axis=vector(0, 1, 0), radius=0.15, color=...)`
    - 문: `box(pos=..., size=vector(0.6, 1, 0.05), color=...)`

??? success "정답 예시"

    ```python
    GlowScript 3.2 VPython
    # 벽 (노란 상자)
    box(pos=vector(0,1,0), size=vector(3,2,3), color=color.yellow)
    # 지붕 (빨간 원뿔)
    cone(pos=vector(0,2,0), axis=vector(0,1.5,0), radius=2.2, color=color.red)
    # 굴뚝 (회색 원기둥)
    cylinder(pos=vector(1,2.5,0), axis=vector(0,1,0), radius=0.15, color=color.gray(0.5))
    # 문 (갈색 작은 상자)
    box(pos=vector(0,0.5,1.51), size=vector(0.6,1,0.05), color=vector(0.55,0.27,0.07))
    ```

    핵심: 물체마다 사용하는 속성이 다릅니다.
    벽(box)은 `size`, 지붕(cone)은 `axis+radius`, 굴뚝(cylinder)은 `axis+radius`.
    물체의 종류에 따라 "어떤 속성이 필요한지"를 떠올리는 것이 중요합니다!

---

## 📖 알고 넘어가기

Ch.1에서 `sphere`를 배웠습니다. 오늘은 3가지 물체가 더 추가되었어요. 각 물체마다 모양을 정하는 방법이 다릅니다.

!!! note "box() — 상자 만들기"

    ```python
    box(pos=vector(x,y,z), size=vector(가로,세로,깊이), color=색)
    ```

    - **size** = `vector(가로, 세로, 깊이)`. 기본값: `vector(1,1,1)` (정육면체)
    - **pos** = 상자의 중심 위치. 기본값: `vector(0,0,0)`
    - size의 세 숫자를 바꾸면 넓적한 판, 세로 기둥, 얇은 벽 등 무엇이든 만들 수 있음

!!! note "cylinder() — 원기둥 만들기"

    ```python
    cylinder(pos=vector(x,y,z), axis=vector(dx,dy,dz), radius=굵기, color=색)
    ```

    - **axis** = 뻗어나가는 방향과 길이. 기본값: `vector(1,0,0)` (오른쪽으로 길이 1)
    - **radius** = 원기둥의 굵기(반지름). 기본값: `1`
    - **pos** = 원기둥의 시작점 위치
    - 세로로 세우려면 `axis=vector(0, 높이, 0)`

!!! note "cone() — 원뿔 만들기"

    ```python
    cone(pos=vector(x,y,z), axis=vector(dx,dy,dz), radius=밑면반지름, color=색)
    ```

    - **axis** = 뻗어나가는 방향과 길이 (뾰족한 끝 방향)
    - **radius** = 밑면의 반지름. 기본값: `1`
    - **pos** = 밑면 중심 위치
    - `cylinder`와 같은 속성 구조! 끝만 뾰족해질 뿐

!!! tip "패턴을 발견하셨나요?"

    - **sphere** → `radius`만으로 크기 결정 (둥글기만 하니까!)
    - **box** → `size`로 가로/세로/깊이 각각 결정 (직사각형이니까!)
    - **cylinder, cone** → `axis`로 방향+길이, `radius`로 굵기 결정

    물체의 **모양**을 생각하면 어떤 속성이 필요한지 자연스럽게 떠오릅니다.
    둥근 것은 `radius`, 네모난 것은 `size`, 뻗어나가는 것은 `axis`!

---

## 🐛 버그 사냥

아래 코드에는 각각 버그가 하나씩 숨어 있습니다. 찾아서 고쳐 보세요!

### 버그 1: 상자가 안 커져요!

!!! bug "box를 크게 만들고 싶은데, 오류가 납니다"

    ```python
    GlowScript 3.2 VPython
    box(radius=2, color=color.blue)
    ```

??? success "정답"

    `box`에는 `radius`가 없습니다! 상자의 크기를 정하려면 `size`를 써야 합니다.

    ```python
    GlowScript 3.2 VPython
    box(size=vector(2,2,2), color=color.blue)
    ```

    `radius`는 둥근 물체(`sphere`, `cylinder`, `cone`)에서 쓰는 속성이에요. 네모난 `box`는 `size=vector(가로, 세로, 깊이)`로 크기를 정합니다.

### 버그 2: 원기둥 모양이 이상해요!

!!! bug "cylinder에 size를 썼더니 예상과 다릅니다"

    ```python
    GlowScript 3.2 VPython
    cylinder(size=vector(3, 1, 1), color=color.green)
    ```

??? success "정답"

    `cylinder`는 `size` 대신 `axis`와 `radius`를 씁니다!

    ```python
    GlowScript 3.2 VPython
    cylinder(axis=vector(3, 0, 0), radius=0.5, color=color.green)
    ```

    `box`는 `size`, `cylinder`는 `axis+radius` — 물체마다 크기를 정하는 방법이 다릅니다. `cylinder`에 `size`를 쓰면 VPython이 내부적으로 변환하긴 하지만, 의도한 모양이 안 나올 수 있어요.

### 버그 3: 기둥이 왜 옆으로 누워 있죠?

!!! bug "세로 기둥을 만들었는데 옆으로 누워 있습니다"

    ```python
    GlowScript 3.2 VPython
    cylinder(pos=vector(0, 0, 0), radius=0.3, color=color.red)
    ```

??? success "정답"

    `axis`를 지정하지 않으면 기본값 `vector(1, 0, 0)` — 즉 **x 방향(오른쪽)**으로 뻗습니다.
    세로로 세우려면 axis를 y 방향으로 바꿔야 합니다!

    ```python
    GlowScript 3.2 VPython
    cylinder(pos=vector(0,0,0), axis=vector(0,3,0), radius=0.3, color=color.red)
    ```

    `axis=vector(0, 3, 0)`은 "y 방향(위쪽)으로 길이 3"이라는 뜻입니다.
    `cylinder`와 `cone`은 항상 `axis` 방향을 확인하세요!

---

## 💡 상상 챌린지

> **미션: box, cylinder, cone, sphere를 조합해서 무언가를 만들어 보세요!**

**아이디어**:

- **로봇** — 상자 몸통 + 공 머리 + 원기둥 팔다리
- **집** — 상자 벽 + 원뿔 지붕 + 원기둥 굴뚝
- **자동차** — 상자 차체 + 원기둥(또는 cylinder) 바퀴
- **나무** — 원기둥 줄기 + 원뿔(또는 공) 나뭇잎
- **로켓** — 원기둥 몸체 + 원뿔 머리 + 원뿔 날개

**규칙**:

- **3종류 이상**의 물체 사용 (예: box + cylinder + sphere)
- **5개 이상**의 물체로 구성
- **2가지 이상**의 색 사용
- 코드는 `GlowScript 3.2 VPython`으로 시작

??? success "예시: 나무"

    ```python
    GlowScript 3.2 VPython
    # 줄기 (갈색 원기둥)
    cylinder(pos=vector(0,0,0), axis=vector(0,3,0), radius=0.3, color=vector(0.55,0.27,0.07))
    # 나뭇잎 아래층 (큰 초록 원뿔)
    cone(pos=vector(0,2.5,0), axis=vector(0,2.5,0), radius=1.8, color=color.green)
    # 나뭇잎 중간층 (중간 원뿔)
    cone(pos=vector(0,3.5,0), axis=vector(0,2,0), radius=1.4, color=vector(0,0.8,0))
    # 나뭇잎 꼭대기 (작은 원뿔)
    cone(pos=vector(0,4.5,0), axis=vector(0,1.5,0), radius=1, color=vector(0,0.6,0))
    # 사과 (빨간 공)
    sphere(pos=vector(0.8,3,0.5), radius=0.15, color=color.red)
    sphere(pos=vector(-0.5,3.5,-0.3), radius=0.15, color=color.red)
    ```

    원기둥 1개(줄기) + 원뿔 3개(나뭇잎) + 공 2개(사과) = 6개의 물체, 3종류!
    정답은 없습니다. 여러분만의 작품을 자유롭게 만들어 보세요!

---

## 📝 오늘의 완성 코드

처음에 보여드렸던 **놀이터** 장면의 전체 코드입니다.

```python
GlowScript 3.2 VPython
# === WHAT: 다양한 물체를 조합해 놀이터 만들기 ===
# --- WHY: box, cylinder, cone, sphere 각각의 속성 차이를 익히기 ---

# 잔디밭 (초록 상자를 납작하게)
box(pos=vector(0,-0.1,0), size=vector(20,0.2,12), color=color.green)

# 시소 받침대 (원기둥을 세로로 세우기)
cylinder(pos=vector(-5,-0.1,0), axis=vector(0,1,0), radius=0.3, color=color.gray(0.5))
# 시소 널빤지 (상자를 넓고 얇게)
box(pos=vector(-5,1,0), size=vector(5,0.2,1), color=vector(0.6,0.3,0.1))
```

```python
GlowScript 3.2 VPython
# 놀이터 만들기 (이어서)

# 미끄럼틀 사다리 (세로로 선 상자)
box(pos=vector(2,1.5,0), size=vector(0.3,3,1), color=color.blue)
# 미끄럼틀 경사면 (넓고 얇은 상자)
box(pos=vector(4,0.8,0), size=vector(4,0.15,1), color=color.yellow)

# 그네 왼쪽 기둥 (원기둥을 세로로)
cylinder(pos=vector(-1,0,3), axis=vector(0,4,0), radius=0.15, color=color.red)
# 그네 오른쪽 기둥
cylinder(pos=vector(1,0,3), axis=vector(0,4,0), radius=0.15, color=color.red)
# 그네 좌석 (공)
sphere(pos=vector(0,1.5,3), radius=0.3, color=color.orange)
# 그네 가로대 (가로 원기둥)
cylinder(pos=vector(-1,4,3), axis=vector(2,0,0), radius=0.1, color=color.red)
```

!!! tip "한 파일에 합쳐서 실행하세요"

    위의 두 코드 블록은 설명을 위해 나눈 것입니다.
    실제로 실행할 때는 `GlowScript 3.2 VPython`을 맨 위에 한 번만 쓰고
    나머지 코드를 한꺼번에 붙여 넣으세요!

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 놀이터</div>
<iframe src="../demos/ch03_final.html"></iframe>
</div>

**속성 사용 패턴 정리**:

- 잔디밭: `box`의 `size`에서 세로(y)를 0.2로 → 납작한 바닥
- 시소 받침대: `cylinder`의 `axis`를 y방향으로 → 세로 기둥
- 미끄럼틀: `box` 2개로 사다리(세로) + 경사면(가로)
- 그네 기둥: `cylinder`의 `axis=vector(0,4,0)` → 높이 4인 세로 기둥
- 각 물체의 **종류에 맞는 속성**을 사용한 것이 핵심입니다!

---

## ✅ 3줄 정리

1. **`box()`는 `size=vector(가로, 세로, 깊이)`로 모양을 정한다** — 세 숫자로 직사각형의 세 변을 각각 조절
2. **`cylinder()`와 `cone()`은 `axis`로 방향과 길이를, `radius`로 굵기를 정한다** — axis를 바꾸면 세로, 가로, 대각선 어디로든 뻗을 수 있다
3. **다양한 물체를 좌표로 배치하면 어떤 장면이든 만들 수 있다** — sphere + box + cylinder + cone 조합은 무한한 가능성!

---

## 🚀 더 탐험하기

### 탐험 1: 다른 물체 맛보기

VPython에는 더 많은 3D 물체가 있습니다. 하나씩 실행해 보세요!

```python
GlowScript 3.2 VPython
# 화살표 — 방향을 보여줄 때
arrow(pos=vector(-4,0,0), axis=vector(2,0,0), color=color.red)
# 링 — 도넛 모양
ring(pos=vector(0,0,0), axis=vector(0,1,0), radius=1, thickness=0.1, color=color.cyan)
# 나선 — 스프링 모양
helix(pos=vector(3,0,0), axis=vector(0,2,0), radius=0.5, color=color.orange)
```

`arrow`, `ring`, `helix`도 `axis`를 사용합니다! 패턴이 같죠?

### 탐험 2: 복잡한 장면 도전

학교, 공원, 놀이동산 등 더 복잡한 장면을 만들어 보세요. 물체를 10개 이상 사용하면 꽤 근사한 장면이 됩니다!

**아이디어**:

- **학교**: box(건물) + cylinder(깃대) + cone(깃대 꼭대기) + sphere(시계)
- **공원**: box(벤치) + cylinder(나무 줄기) + cone(나뭇잎) + sphere(풍선)
- **도시**: box(건물 여러 개) + cylinder(가로등) + sphere(가로등 불빛)

### 탐험 3: pyramid 맛보기

```python
GlowScript 3.2 VPython
# 피라미드 — 이집트 느낌!
pyramid(pos=vector(0,0,0), size=vector(3,2,3), color=color.yellow)
# 바닥
box(pos=vector(0,-0.05,0), size=vector(8,0.1,8), color=vector(0.8,0.7,0.5))
```

`pyramid`는 `box`처럼 `size`를 사용합니다. 네모난 밑면 위에 뾰족한 꼭대기가 있는 모양이에요!

---

**다음 시간**: Ch.4에서는 **변수**를 배웁니다. 로봇의 팔 색을 나중에 바꾸고 싶은데... 이름이 없으면 조종할 수 없죠! `arm = cylinder(...)` 처럼 물체에 이름을 붙이면, 언제든 찾아서 바꿀 수 있습니다. 코드가 훨씬 똑똑해지는 비결, 변수!
