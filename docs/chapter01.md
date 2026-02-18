# Ch.1 — VPython의 세계로!

**Part 1: 3D 첫 걸음** | 핵심: `sphere()`, `color`

---

## 🎬 오늘의 장면

빨간 공, 파란 공, 노란 공, 초록 공이 나란히 떠 있습니다.
마우스로 장면을 돌려보면 진짜 3D — 앞뒤로 깊이가 있어요!

<div class="glowscript-demo" markdown>
<div class="demo-label">마우스로 돌려보세요!</div>
<iframe src="../demos/ch01_scene.html"></iframe>
</div>

**이 장면은 코드 4줄로 만들었습니다.**

---

## 🔍 코드 읽기 챌린지

아래 코드를 **실행하지 말고** 읽어 보세요.

```python
GlowScript 3.2 VPython
sphere(color=color.red)
```

??? question "화면에 무엇이 보일까요?"

    **빨간 공 하나**가 화면 한가운데에 나타납니다.

    - `sphere()` → 공을 만들어라
    - `color=color.red` → 빨간색으로

    코드 한 줄이 3D 물체 하나를 만듭니다!

그러면 이건 어떨까요?

```python
GlowScript 3.2 VPython
sphere(color=color.red)
sphere(color=color.blue)
```

??? question "이번에는 무엇이 보일까요?"

    **빨간 공**과 **파란 공**이... 같은 위치에 겹쳐 있습니다!

    두 줄을 썼으니 공이 2개 만들어지지만, 위치를 지정하지 않으면 둘 다 정중앙에 생깁니다.
    겹쳐 있어서 하나만 보이는 것처럼 느껴질 수 있어요.

---

## 🛠️ 직접 만들어보기

### 실험 1: 첫 번째 공

[glowscript.org](https://glowscript.org)에 접속해서 **Sign in → My Programs → Create New Program**을 클릭하세요.

아래 코드를 입력하고 실행!

```python
GlowScript 3.2 VPython
sphere()
```

화면 한가운데에 **하얀 공**이 나타납니다.

- 마우스 오른쪽 버튼 드래그 → 카메라 회전
- 스크롤 → 확대/축소

!!! tip "실험: 색 바꾸기"

    `sphere()` → `sphere(color=color.red)` 로 바꿔 보세요.

    빨간 공이 되었나요? 이제 이것들도 시도해 보세요:

    - `color.blue` → ?
    - `color.green` → ?
    - `color.yellow` → ?
    - `color.cyan` → ?
    - `color.magenta` → ?
    - `color.orange` → ?

---

### 실험 2: 공의 크기

공의 크기를 바꿀 수 있을까요?

```python
GlowScript 3.2 VPython
sphere(radius=2, color=color.red)
```

아까보다 **훨씬 큰** 빨간 공이 나타납니다! `radius`는 공의 반지름이에요.

!!! tip "실험: 크기 비교"

    아래 코드를 실행해 보세요:

    ```python
    GlowScript 3.2 VPython
    sphere(radius=0.3, color=color.red)
    sphere(radius=1, color=color.blue)
    sphere(radius=2, color=color.green)
    ```

    세 공이 겹쳐 있어요! 왜냐하면 위치를 안 정했으니까요.
    가장 큰 초록 공이 나머지를 감싸고 있습니다.

---

### 실험 3: 공을 옆으로 나란히

공을 겹치지 않게 놓으려면 **위치**를 정해줘야 합니다.

```python
GlowScript 3.2 VPython
sphere(pos=vector(-2, 0, 0), color=color.red)
sphere(pos=vector(0, 0, 0), color=color.blue)
sphere(pos=vector(2, 0, 0), color=color.green)
```

빨간 공은 왼쪽(-2), 파란 공은 가운데(0), 초록 공은 오른쪽(2)!

- `pos` = position(위치)
- `vector(-2, 0, 0)` = "x 방향으로 -2만큼"

!!! tip "실험: 숫자 바꾸기"

    `-2`를 `-4`로 바꾸면? 빨간 공이 더 왼쪽으로 갑니다.
    `2`를 `5`로 바꾸면? 초록 공이 더 오른쪽으로 갑니다.

    **숫자가 곧 위치입니다.** 다음 챕터에서 좌표를 본격적으로 배워요!

---

### 실험 4: 나만의 색 만들기

VPython에서는 직접 색을 만들 수도 있어요.

```python
GlowScript 3.2 VPython
sphere(pos=vector(-3, 0, 0), color=vector(1, 0, 0))
sphere(pos=vector(-1, 0, 0), color=vector(1, 0.5, 0))
sphere(pos=vector(1, 0, 0), color=vector(1, 1, 0))
sphere(pos=vector(3, 0, 0), color=vector(0, 0.5, 1))
```

`color=vector(빨강, 초록, 파랑)` — 각 값은 0~1 사이.

- `vector(1, 0, 0)` → 빨강 100% = 빨간색
- `vector(1, 0.5, 0)` → 빨강 100% + 초록 50% = 주황색
- `vector(1, 1, 0)` → 빨강 + 초록 = 노란색
- `vector(0, 0.5, 1)` → 초록 50% + 파랑 100% = 하늘색

!!! tip "실험: 내 색 조합"

    `vector(0.5, 0, 0.5)`는 무슨 색일까요? 예측하고 실행해 보세요!

---

## 🔄 역추적 챌린지

이번에는 **거꾸로**. 결과를 보고 코드를 작성해 보세요.

**장면**: 노란 공이 왼쪽에, 보라색 공이 오른쪽에 있습니다. 보라색 공이 노란 공보다 큽니다.

<div class="scene-preview">
  <div class="obj" style="left: 30%; top: 42%; width: 35px; height: 35px; background: radial-gradient(circle at 35% 35%, #ffeaa7, #f39c12);"></div>
  <div class="obj" style="left: 60%; top: 35%; width: 65px; height: 65px; background: radial-gradient(circle at 35% 35%, #d6a2e8, #8e44ad);"></div>
</div>

**생각의 순서**:

1. 물체는 몇 개? → 2개
2. 종류는? → 둘 다 공(sphere)
3. 위치는? → 왼쪽, 오른쪽
4. 색상은? → 노랑, 보라
5. 크기 차이는? → 보라가 더 크다

??? hint "힌트"

    - 노란 공: `sphere(pos=vector(???, 0, 0), color=color.yellow)`
    - 보라색: `color=color.magenta` 또는 `color=vector(0.5, 0, 0.5)`
    - 크기 차이: `radius` 값을 다르게

??? success "정답 예시"

    ```python
    GlowScript 3.2 VPython
    sphere(pos=vector(-2, 0, 0), radius=0.5, color=color.yellow)
    sphere(pos=vector(2, 0, 0), radius=1.2, color=color.magenta)
    ```

    위치와 크기의 정확한 숫자는 달라도 괜찮아요!
    핵심은 "왼쪽에 작은 노란 공, 오른쪽에 큰 보라 공"이라는 **구조**를 맞추는 것입니다.

---

## 📖 알고 넘어가기

실험하면서 자연스럽게 배운 것을 정리합시다. 외울 필요 없어요!

!!! note "sphere() — 3D 공 만들기"

    ```python
    sphere(pos=vector(x, y, z), radius=크기, color=color.색이름)
    ```

    - **pos** — 위치. 안 쓰면 정중앙(0,0,0)
    - **radius** — 반지름. 안 쓰면 1
    - **color** — 색상. 안 쓰면 흰색

    모든 속성은 선택사항. `sphere()`만 써도 흰 공이 만들어집니다.

!!! note "색상 지정하는 두 가지 방법"

    **방법 1** — 이름으로: `color=color.red`, `color.blue`, `color.green` 등

    **방법 2** — 직접 만들기: `color=vector(R, G, B)` (각 값 0~1)

---

## 🐛 버그 사냥

아래 코드에는 각각 버그가 하나씩 있어요. 찾아서 고쳐 보세요!

!!! bug "버그 1"

    ```python
    GlowScript 3.2 VPython
    sphere(color=color.red
    ```

??? success "정답"

    닫는 괄호 `)`가 빠졌습니다!

    ```python
    sphere(color=color.red)
    ```

    괄호는 항상 짝을 맞춰야 해요.

!!! bug "버그 2"

    ```python
    GlowScript 3.2 VPython
    Sphere(color=color.blue)
    ```

??? success "정답"

    `Sphere` → `sphere` (소문자!)

    파이썬은 대소문자를 구분합니다. `Sphere`와 `sphere`는 완전히 다른 단어예요.

!!! bug "버그 3"

    ```python
    GlowScript 3.2 VPython
    sphere(color=color.green radius=2)
    ```

??? success "정답"

    속성 사이에 쉼표(`,`)가 빠졌습니다!

    ```python
    sphere(color=color.green, radius=2)
    ```

---

## 💡 상상 챌린지

`sphere()`만으로 무엇을 만들 수 있을까요?

**미션: 공(sphere)만 사용해서 무언가를 만들어 보세요!**

아이디어:

- **눈사람** — 흰 공 3개를 세로로 (아래가 크고 위가 작게)
- **신호등** — 빨강, 노랑, 초록 공을 세로로
- **무지개** — 7색 공을 나란히
- **미키마우스** — 큰 공 1개 + 작은 공 2개 (귀)

**규칙**: sphere만 사용, 3개 이상, 2가지 색 이상. 나머지는 자유!

??? success "예시: 눈사람"

    ```python
    GlowScript 3.2 VPython
    sphere(pos=vector(0, 0, 0), radius=1, color=color.white)
    sphere(pos=vector(0, 1.3, 0), radius=0.7, color=color.white)
    sphere(pos=vector(0, 2.2, 0), radius=0.5, color=color.white)
    sphere(pos=vector(0, 2.2, 0.5), radius=0.1, color=color.orange)
    ```

    하얀 공 3개 + 주황색 코 1개 = 눈사람!

    여러분만의 작품을 만들어 보세요. 정답은 없습니다!

---

## 📝 오늘의 완성 코드

처음에 보여드렸던 **4색 공** 장면입니다.

```python
GlowScript 3.2 VPython
# === WHAT: 4색 공 나란히 배치 ===
# === WHY: sphere + color + pos 조합 연습 ===

sphere(pos=vector(-3, 0, 0), radius=0.8, color=color.red)
sphere(pos=vector(-1, 0, 0), radius=0.8, color=color.blue)
sphere(pos=vector(1, 0, 0), radius=0.8, color=color.yellow)
sphere(pos=vector(3, 0, 0), radius=0.8, color=color.green)
```

<div class="glowscript-demo" markdown>
<div class="demo-label">실행 결과 — 4색 공 나란히</div>
<iframe src="../demos/ch01_scene.html"></iframe>
</div>

---

## ✅ 3줄 정리

1. **`sphere()`로 3D 공을 만든다** — 코드 한 줄이 물체 하나
2. **`color=`로 색을 입힌다** — 이름(`color.red`)이나 직접 만들기(`vector(R,G,B)`)
3. **`radius=`로 크기를, `pos=`로 위치를 정한다** — 안 쓰면 기본값(흰색, 크기 1, 정중앙)

---

## 🚀 더 탐험하기

### 탐험 1: 그라데이션 라인

공 10개를 나란히 놓되, 색이 점점 변하게 만들어 보세요.

```python
GlowScript 3.2 VPython
sphere(pos=vector(-4, 0, 0), color=vector(1, 0, 0))
sphere(pos=vector(-3, 0, 0), color=vector(0.9, 0.1, 0))
sphere(pos=vector(-2, 0, 0), color=vector(0.8, 0.2, 0))
sphere(pos=vector(-1, 0, 0), color=vector(0.7, 0.3, 0))
sphere(pos=vector(0, 0, 0), color=vector(0.5, 0.5, 0))
```

빨강에서 노랑으로 서서히 변합니다! 나머지 5개를 추가해서 무지개를 완성해 보세요.

### 탐험 2: 이모티콘 만들기

sphere만으로 이모티콘 얼굴을 만들어 보세요!

- 큰 노란 공 = 얼굴
- 작은 검은 공 2개 = 눈
- 작은 빨간 공 = 입

힌트: z 좌표(앞뒤)를 써서 눈과 입을 얼굴 앞쪽에 놓으면 됩니다.

### 탐험 3: 다른 물체 맛보기

다음 시간에 배울 물체들을 미리 시도해 보세요!

```python
GlowScript 3.2 VPython
box(color=color.blue)
cylinder(color=color.green)
cone(color=color.orange)
```

각각 어떤 모양인지 관찰해 보세요. Ch.3에서 본격적으로 다룹니다!

---

**다음 시간**: Ch.2에서는 `vector(x, y, z)`의 비밀을 파헤칩니다. 좌표를 이해하면 물체를 원하는 곳에 정확히 놓을 수 있어요!
