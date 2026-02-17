# Chapter 1: VPython의 세계에 오신 것을 환영합니다

**Part 1: 3D 세계에 첫 발을 내딛다**

---

## 🎯 이 장에서 배우는 것

이번 시간이 끝나면 여러분은 이런 것을 할 수 있게 됩니다.

- **VPython 실행 환경을 준비**할 수 있다 — GlowScript 웹 환경 또는 로컬 설치
- **3D 물체를 코드로 생성**할 수 있다 — 구(sphere), 상자(box), 원기둥(cylinder)
- **프로그래밍의 본질**을 이해한다 — "컴퓨터에게 내리는 정확한 명령"

> 🖥️ **이번 시간에 만들 것**: 화면에 빨간 공, 파란 상자, 초록 기둥이 나란히 서 있는 3D 장면을 코드로 만듭니다. 마우스로 화면을 돌려보며 "내가 코드로 세상을 만들었다!"는 경험을 하게 됩니다.

---

## 💡 왜 이걸 배우나요?

### 코딩, 왜 3D로 시작할까?

여러분은 지금까지 프로그래밍이라고 하면 까만 화면에 흰 글씨가 줄줄 나오는 모습을 떠올렸을지도 모릅니다. `Hello World`를 출력하고... 그 다음엔? 솔직히 좀 심심하죠.

**VPython은 다릅니다.**

코드 한 줄을 쓰면, 눈앞에 3D 물체가 뿅 하고 나타납니다. 빨간 공이 둥둥 떠 있고, 마우스로 돌려보면 진짜 3D입니다. 코드를 한 줄 더 쓰면 상자가 나타나고, 또 한 줄 쓰면 기둥이 솟아오릅니다.

**"내가 쓴 코드가 눈에 보인다"** — 이것이 VPython으로 배우는 가장 큰 이유입니다.

그리고 이 교재의 진짜 목표는 코딩 기술 자체가 아닙니다. 여러분이 키우게 될 것은 **컴퓨팅 사고력(Computational Thinking)** — 문제를 분해하고, 패턴을 찾고, 핵심만 뽑아내고, 단계별 해결법을 설계하는 능력입니다. VPython은 그 사고를 3차원으로 눈에 보이게 만드는 도구일 뿐입니다.

### 🧠 이 교재에서 반복되는 3가지 사고 훈련

매 챕터마다 여러분은 이런 도전을 하게 됩니다.

- 🔍 **코드 → 결과 예측**: 코드를 읽고 "이걸 실행하면 어떤 모습일까?" 머릿속으로 그려보기
- 🔄 **결과 → 코드 역추적**: 3D 결과물을 보고 "이걸 만드려면 어떤 코드를 써야 할까?" 거꾸로 생각하기
- 💡 **상상 → 코드 창작**: 머릿속 아이디어를 코드로 직접 만들어내기

이 세 가지를 반복하다 보면, 어느 순간 **"생각을 코드로, 코드를 3차원으로"** 옮기는 것이 자연스러워집니다.

---

## 📚 핵심 개념

### 개념 1: 프로그래밍이란 무엇인가?

**🎭 비유로 시작하기**

여러분이 친구에게 길을 알려준다고 생각해 보세요.

> "학교 정문에서 나와서 오른쪽으로 가. 편의점이 보이면 왼쪽으로 꺾어. 세 번째 건물이야."

이 안내를 따르면 친구는 목적지에 도착합니다. 핵심은 뭘까요? **정확한 순서로, 모호하지 않은 명령을 내리는 것**입니다. "대충 저쪽"이라고 하면 친구는 길을 잃습니다.

**📖 정확한 정의**

프로그래밍이란 **컴퓨터에게 내리는 정확한 명령을 순서대로 작성하는 것**입니다. 컴퓨터는 사람과 달리 "대충"을 이해하지 못합니다. 대신, 정확하게 알려주면 실수 없이, 지치지 않고, 빛의 속도로 수행합니다.

**💻 예시로 확인하기**

```python
from vpython import *

sphere()
```

이 두 줄이 여러분의 첫 프로그램입니다. 첫 줄은 "VPython 도구를 준비해"라는 명령이고, 두 번째 줄은 "구(sphere)를 하나 만들어"라는 명령입니다. 실행하면? 화면 한가운데에 하얀 공이 나타납니다!

---

### 개념 2: VPython이란?

**🎭 비유로 시작하기**

레고를 떠올려 보세요. 레고 블록을 손으로 조립하면 자동차, 집, 우주선이 만들어집니다. VPython은 **코드로 조립하는 3D 레고**입니다. 손 대신 코드로, 블록 대신 구(sphere)·상자(box)·기둥(cylinder) 같은 3D 물체를 조합합니다.

**📖 정확한 정의**

VPython은 **파이썬(Python) 언어로 3D 물체를 만들고 조작하는 라이브러리**입니다. 원래 대학교 물리학 수업에서 시뮬레이션용으로 만들어졌는데, 코드가 너무 직관적이라 전 세계 교육 현장에서 사랑받고 있습니다.

**💻 예시로 확인하기**

```python
from vpython import *

# 빨간 공을 만든다
sphere(color=color.red)
```

실행하면 빨간 공이 화면 중앙에 나타납니다. `color=color.red`라는 명령 하나로 색상이 바뀌었습니다. 이처럼 VPython은 코드가 곧 결과물인, 가장 직관적인 프로그래밍 입문 도구입니다.

---

### 개념 3: "코드 한 줄 = 물체 하나"

**🎭 비유로 시작하기**

주문서를 떠올려 보세요. 카페에서 "아이스 아메리카노 한 잔"이라고 주문하면 음료 하나가 나옵니다. "아이스 아메리카노 한 잔, 카페라떼 한 잔"이라고 하면 두 잔이 나오죠.

VPython도 같습니다. 코드 한 줄 = 주문 한 건 = 물체 하나입니다.

**📖 정확한 정의**

VPython에서 `sphere()`, `box()`, `cylinder()` 같은 명령을 하나 쓸 때마다 3D 공간에 물체가 하나씩 생성됩니다. 명령어의 이름이 곧 물체의 종류입니다.

**💻 예시로 확인하기**

```python
from vpython import *

sphere()      # 구(공) 한 개
box()         # 상자 한 개
cylinder()    # 원기둥 한 개
```

실행하면 세 가지 물체가 화면에 나타납니다. (지금은 같은 위치에 겹쳐 있어서 잘 안 보일 수 있습니다. 곧 위치를 바꾸는 법도 배울 겁니다!)

---

## 🔨 따라하기

자, 이제 직접 해 봅시다! 아래 단계를 하나씩 따라 하세요.

### Step 1: VPython 실행 환경 준비하기

VPython을 사용하는 방법은 크게 두 가지입니다. 편한 쪽을 선택하세요.

**방법 A: GlowScript (웹 — 설치 없음, 추천! 🌟)**

1. 웹 브라우저에서 **[glowscript.org](https://glowscript.org)** 에 접속합니다
2. 오른쪽 위 **"Sign in"** 을 클릭하여 Google 계정으로 로그인합니다
3. **"My Programs"** 를 클릭합니다
4. 왼쪽에 있는 폴더 이름(보통 자기 이름) 옆의 연필 아이콘을 클릭합니다
5. **"Create New Program"** 을 클릭하고 이름을 `chapter01`로 지정합니다
6. 에디터가 열리면, 맨 위에 `GlowScript 3.2 VPython`이 이미 적혀 있습니다 — 이것은 그대로 두세요!

> 💡 **GlowScript 팁**: GlowScript에서는 `from vpython import *`를 쓸 필요가 없습니다. 이미 자동으로 포함되어 있기 때문입니다. 하지만 이 교재의 모든 코드에는 `from vpython import *`를 포함시키겠습니다. 이렇게 하면 로컬 환경에서도 바로 복사-실행할 수 있기 때문입니다. GlowScript에서는 이 줄을 무시해도 됩니다.

**방법 B: 로컬 설치 (내 컴퓨터에서 직접)**

1. 파이썬이 설치되어 있어야 합니다 (python.org에서 3.8 이상 버전 다운로드)
2. 명령 프롬프트(Windows) 또는 터미널(Mac)을 열고 다음 명령을 입력합니다:

```python
# 터미널/명령 프롬프트에서 실행 (파이썬 코드가 아닙니다!)
# pip install vpython
```

3. 설치가 끝나면 파이썬 파일(`.py`)을 만들어 코드를 작성하고 실행합니다
4. 실행하면 웹 브라우저가 자동으로 열리면서 3D 장면이 표시됩니다

> ⚠️ 설치가 잘 안 된다면, GlowScript 방법을 사용하세요. 인터넷만 되면 누구나 바로 시작할 수 있습니다!

---

### Step 2: 첫 번째 3D 물체 만들기 — 구(sphere)

자, 환경이 준비되었으면 다음 코드를 입력하고 실행해 보세요.

```python
from vpython import *

# 나의 첫 3D 물체: 빨간 공!
sphere(color=color.red, radius=1)
```

**실행 결과**: 화면 가운데에 빨간 공이 하나 나타납니다. 마우스 오른쪽 버튼을 누른 채 드래그하면 화면을 돌려볼 수 있고, 스크롤하면 확대/축소됩니다. 진짜 3D입니다!

코드를 한 줄씩 살펴봅시다.

- `from vpython import *` — "VPython의 모든 도구를 사용하겠습니다"라는 선언
- `sphere(...)` — "구(공)를 만들어!"라는 명령
- `color=color.red` — "색상은 빨간색으로" (속성 지정)
- `radius=1` — "반지름은 1로" (크기 지정)

> 🎉 축하합니다! 여러분은 방금 프로그래머가 되었습니다. 코드로 3D 물체를 만들었으니까요!

---

### Step 3: 더 많은 물체 만들기 — 상자(box)와 원기둥(cylinder)

공만 만들면 심심하죠? 상자와 원기둥도 만들어 봅시다.

```python
from vpython import *

# 빨간 공 — 왼쪽에 배치
sphere(pos=vector(-3, 0, 0), color=color.red, radius=1)

# 파란 상자 — 가운데에 배치
box(pos=vector(0, 0, 0), color=color.blue, size=vector(2, 2, 2))

# 초록 기둥 — 오른쪽에 배치
cylinder(pos=vector(3, -1, 0), color=color.green, radius=0.5, axis=vector(0, 2, 0))
```

**실행 결과**: 빨간 공, 파란 상자, 초록 원기둥이 나란히 서 있는 3D 장면이 나타납니다!

새로 등장한 것들을 정리합니다.

- `pos=vector(-3, 0, 0)` — 물체의 위치를 지정합니다. `vector(x, y, z)`는 3D 좌표입니다. x가 음수면 왼쪽, 양수면 오른쪽입니다.
- `size=vector(2, 2, 2)` — 상자의 가로, 세로, 깊이를 지정합니다.
- `axis=vector(0, 2, 0)` — 원기둥이 뻗어나가는 방향과 길이입니다. `y` 방향으로 2만큼이니 위쪽으로 서 있습니다.

> 💡 **좌표 미리보기**: `vector(x, y, z)`에서 x는 좌우, y는 위아래, z는 앞뒤입니다. 다음 챕터에서 자세히 배우니 지금은 "위치를 정하는 숫자 세 개"라고만 기억하세요!

---

## 📝 전체 코드

이 장에서 만든 최종 작품의 전체 코드입니다. 복사해서 바로 실행할 수 있습니다.

```python
from vpython import *

# === WHAT: 세 가지 기본 3D 물체로 구성된 장면 만들기 ===
# --- WHY: 코드 한 줄 = 물체 하나라는 직관을 체험하기 위해 ---

# 빨간 구(공) — 왼쪽
sphere(pos=vector(-3, 0, 0), color=color.red, radius=1)

# 파란 상자 — 가운데
box(pos=vector(0, 0, 0), color=color.blue, size=vector(2, 2, 2))

# 초록 원기둥 — 오른쪽 (위를 향해 서 있음)
cylinder(pos=vector(3, -1, 0), color=color.green, radius=0.5, axis=vector(0, 2, 0))

# 바닥판 — 물체들이 놓여있는 느낌을 주기 위해
box(pos=vector(0, -1.5, 0), size=vector(12, 0.1, 4), color=color.white, opacity=0.3)
```

**실행하면 이런 장면이 보입니다**: 반투명한 흰색 바닥판 위에 빨간 공, 파란 상자, 초록 기둥이 나란히 서 있습니다. 마우스 오른쪽 버튼으로 드래그하면 카메라 각도를 바꿀 수 있고, 스크롤하면 확대/축소할 수 있습니다.

---

## 🧠 사고력 챌린지

여기서부터가 진짜입니다! 이 문제들을 통해 **컴퓨팅 사고력의 근육**을 키워 봅시다.

---

### 🔍 코드 → 결과 예측 (⭐)

> **문제**: 아래 코드를 실행하면 어떤 모습이 나올까요? **실행하지 말고** 머릿속으로 먼저 그려 보세요!

```python
from vpython import *

sphere(pos=vector(0, 3, 0), color=color.yellow, radius=1.5)
sphere(pos=vector(0, 0, 0), color=color.yellow, radius=1)
sphere(pos=vector(0, -2, 0), color=color.yellow, radius=0.5)
```

**생각해 볼 것**:
- 물체는 몇 개인가요?
- 모두 같은 종류인가요?
- 위치(pos)의 y값이 다릅니다. 어떻게 배치될까요?
- 크기(radius)가 다릅니다. 어떤 순서일까요?
- 색상은 어떤가요?

<details>
<summary>🔑 정답 확인하기</summary>

노란색 공 3개가 **세로로** 나란히 배치됩니다.

- 맨 위(y=3): 가장 큰 공(radius=1.5)
- 가운데(y=0): 중간 크기 공(radius=1)
- 맨 아래(y=-2): 가장 작은 공(radius=0.5)

**위쪽이 크고 아래쪽이 작은** 모양입니다. 뭔가 떠오르지 않나요? 거꾸로 된 눈사람 같기도 하고, 아이스크림처럼 보이기도 합니다!

핵심 포인트: `pos`의 y값이 클수록 위쪽에 위치합니다. `sphere()`가 세 번 등장했으니 공이 세 개 생깁니다.

</details>

---

### 🔄 결과 → 코드 역추적 (⭐)

> **문제**: 아래와 같은 장면을 만드는 코드를 작성해 보세요.

**장면 설명**:
- 화면 **왼쪽**(x=-2)에 **흰색 상자**가 있습니다 (크기: 가로 1, 세로 3, 깊이 1)
- 화면 **오른쪽**(x=2)에도 **흰색 상자**가 있습니다 (크기: 가로 1, 세로 3, 깊이 1)
- 두 상자 **위쪽**(y=2)을 연결하는 **노란 원기둥**이 있습니다 (반지름 0.3)
- 전체적으로 **축구 골대** 모양입니다

**힌트**:
- 먼저, 필요한 물체의 종류와 개수를 파악하세요
- 각 물체의 위치(pos)를 생각해 보세요
- 원기둥의 `axis`는 왼쪽 기둥에서 오른쪽 기둥까지의 방향과 길이입니다

<details>
<summary>💡 힌트 더 보기</summary>

- 상자 2개: `box()` 두 번
- 원기둥 1개: `cylinder()` 한 번
- 왼쪽 기둥의 pos는 `vector(-2, 0, 0)`
- 오른쪽 기둥의 pos는 `vector(2, 0, 0)`
- 가로대 원기둥은 왼쪽에서 시작하여 오른쪽으로 뻗어야 합니다 → `axis=vector(4, 0, 0)`

</details>

<details>
<summary>🔑 정답 예시</summary>

```python
from vpython import *

# 왼쪽 기둥
box(pos=vector(-2, 0, 0), size=vector(1, 3, 1), color=color.white)

# 오른쪽 기둥
box(pos=vector(2, 0, 0), size=vector(1, 3, 1), color=color.white)

# 위쪽 가로대
cylinder(pos=vector(-2, 2, 0), axis=vector(4, 0, 0), radius=0.3, color=color.yellow)
```

핵심 포인트: 결과물을 보고 "어떤 물체가 몇 개 필요한지" 분해하는 것이 첫 번째 단계입니다. 이것이 바로 **분해(Decomposition)** — 컴퓨팅 사고력의 핵심 요소입니다!

</details>

---

### 💡 상상 → 코드 창작 (⭐)

> **문제**: VPython에서 사용할 수 있는 세 가지 물체(`sphere`, `box`, `cylinder`)를 조합하여 **여러분이 원하는 무엇이든** 만들어 보세요!

**아이디어가 안 떠오른다면**:
- 🤖 로봇 얼굴 (상자 = 머리, 구 = 눈, 원기둥 = 안테나)
- 🏠 간단한 집 (상자 = 몸체, 원기둥 = 굴뚝)
- 🎄 크리스마스 트리 (원기둥 = 줄기, 구 = 장식)
- 🍄 버섯 (원기둥 = 줄기, 구 = 갓)

**규칙**:
- `from vpython import *`로 시작할 것
- 물체를 **3개 이상** 사용할 것
- **2가지 이상의 색상**을 사용할 것
- 정답은 없습니다! 자유롭게 만들어 보세요

<details>
<summary>🔑 예시 답안: 버섯 만들기</summary>

```python
from vpython import *

# 버섯 줄기 — 흰색 원기둥
cylinder(pos=vector(0, -1, 0), axis=vector(0, 2, 0), radius=0.3, color=color.white)

# 버섯 갓 — 빨간 구(반쪽만 보이도록 위치 조정)
sphere(pos=vector(0, 1.2, 0), radius=1, color=color.red)

# 버섯 갓 위의 점 — 작은 흰색 구들
sphere(pos=vector(0.3, 1.8, 0.3), radius=0.15, color=color.white)
sphere(pos=vector(-0.3, 1.9, -0.2), radius=0.15, color=color.white)
sphere(pos=vector(0, 2.1, 0), radius=0.15, color=color.white)

# 바닥 — 초록색 상자
box(pos=vector(0, -1.1, 0), size=vector(5, 0.1, 5), color=color.green)
```

이것은 하나의 예시일 뿐입니다. 여러분만의 창의적인 작품을 만들어 보세요!

</details>

---

## ⚠️ 자주 하는 실수

프로그래밍을 처음 하면 누구나 실수합니다. 아래는 이 장에서 가장 흔한 실수와 해결법입니다.

**실수 1: `from vpython import *`를 빠뜨림**

```python
# ❌ 이렇게 하면 오류가 납니다
sphere(color=color.red)
# NameError: name 'sphere' is not defined
```

```python
# ✅ 맨 위에 import를 추가하세요
from vpython import *
sphere(color=color.red)
```

> 모든 VPython 코드의 첫 줄은 반드시 `from vpython import *`입니다. GlowScript에서는 자동으로 포함되지만, 로컬 환경에서는 꼭 필요합니다.

**실수 2: 괄호를 빠뜨리거나 짝이 맞지 않음**

```python
# ❌ 괄호가 없으면 물체가 만들어지지 않습니다
from vpython import *
sphere
```

```python
# ❌ 괄호 짝이 맞지 않으면 오류가 납니다
from vpython import *
sphere(color=color.red
```

```python
# ✅ 괄호를 열면 반드시 닫아야 합니다
from vpython import *
sphere(color=color.red)
```

> 괄호 `()`는 항상 쌍으로! 열었으면 닫아야 합니다.

**실수 3: 대소문자를 틀림**

```python
# ❌ Sphere (대문자 S) → 오류!
from vpython import *
Sphere(color=color.red)
```

```python
# ✅ sphere (소문자 s) → 정상!
from vpython import *
sphere(color=color.red)
```

> 파이썬은 대소문자를 구분합니다. `sphere`와 `Sphere`는 다른 단어입니다!

**실수 4: 쉼표를 빠뜨림**

```python
# ❌ 속성 사이에 쉼표가 없으면 오류!
from vpython import *
sphere(color=color.red radius=1)
```

```python
# ✅ 속성 사이에 쉼표로 구분합니다
from vpython import *
sphere(color=color.red, radius=1)
```

> 여러 속성을 쓸 때는 반드시 쉼표(`,`)로 구분하세요.

---

## ✅ 스스로 점검하기

이 장을 잘 이해했는지 스스로 확인해 봅시다. 아래 질문에 답할 수 있다면 성공입니다!

- [ ] **VPython 실행 환경을 준비했나요?** GlowScript에서 새 프로그램을 만들거나, 로컬에 `pip install vpython`으로 설치했나요?
- [ ] **`sphere()`를 실행하면 어떤 일이 일어나는지 설명할 수 있나요?** → 화면 가운데에 흰색 공이 하나 나타납니다
- [ ] **`box()`와 `cylinder()`도 만들어 봤나요?** 세 가지 물체의 모양 차이를 알고 있나요?
- [ ] **`color=color.red`가 무엇을 하는지 설명할 수 있나요?** → 물체의 색상을 빨간색으로 지정합니다
- [ ] **`pos=vector(3, 0, 0)`이 무엇을 하는지 대략 알고 있나요?** → 물체를 오른쪽으로 3만큼 이동시킵니다
- [ ] **프로그래밍이 무엇인지 한 문장으로 설명할 수 있나요?** → 컴퓨터에게 내리는 정확한 명령을 순서대로 작성하는 것

> 💪 체크가 4개 이상이면 다음 장으로 넘어갈 준비가 된 것입니다!

---

## 🚀 더 해보기

시간이 남거나 더 도전하고 싶다면 아래를 시도해 보세요!

### 도전 1: VPython의 다른 물체들 탐색하기

`sphere`, `box`, `cylinder` 외에도 VPython에는 여러 가지 물체가 있습니다. 아래 코드를 하나씩 실행해 보세요.

```python
from vpython import *

# 화살표
arrow(pos=vector(-6, 0, 0), axis=vector(2, 0, 0), color=color.red)

# 원뿔
cone(pos=vector(-3, 0, 0), axis=vector(0, 2, 0), radius=1, color=color.orange)

# 피라미드
pyramid(pos=vector(0, 0, 0), size=vector(2, 2, 2), color=color.yellow)

# 타원체 (럭비공 모양)
ellipsoid(pos=vector(3, 0, 0), length=2, height=1, width=1, color=color.cyan)

# 링(도넛)
ring(pos=vector(6, 0, 0), axis=vector(0, 1, 0), radius=1, thickness=0.2, color=color.magenta)
```

> 🔎 각 물체의 속성(pos, axis, size 등)을 바꿔보면서 어떻게 변하는지 관찰해 보세요!

### 도전 2: 물체 5개 이상으로 장면 만들기

배운 물체들을 조합해서 좀 더 복잡한 장면을 만들어 보세요. 예를 들어:
- 탑 쌓기 (상자를 점점 작게 쌓아 올리기)
- 태양계 모형 (구 여러 개)
- 간단한 동물 (구 + 원기둥 조합)

### 도전 3: 색상 탐험

VPython에서 사용할 수 있는 색상들을 탐험해 보세요.

```python
from vpython import *

# VPython의 기본 색상들
sphere(pos=vector(-5, 0, 0), color=color.red, radius=0.8)
sphere(pos=vector(-3, 0, 0), color=color.orange, radius=0.8)
sphere(pos=vector(-1, 0, 0), color=color.yellow, radius=0.8)
sphere(pos=vector(1, 0, 0), color=color.green, radius=0.8)
sphere(pos=vector(3, 0, 0), color=color.cyan, radius=0.8)
sphere(pos=vector(5, 0, 0), color=color.magenta, radius=0.8)

# 직접 색상을 만들 수도 있습니다! (R, G, B 각각 0~1 범위)
sphere(pos=vector(0, 2, 0), color=vector(1, 0.5, 0.8), radius=1)  # 핑크색
```

> `color=vector(R, G, B)` 형식으로 원하는 색상을 직접 만들 수 있습니다. R(빨강), G(초록), B(파랑) 각각 0에서 1 사이의 값을 넣으세요.

---

## 🔗 다음 장으로

이번 장에서 우리는 VPython의 세계에 첫 발을 디뎠습니다.

**배운 것 정리**:
- 프로그래밍 = 컴퓨터에게 내리는 정확한 명령
- VPython = 코드로 3D 물체를 만드는 도구
- `sphere()`, `box()`, `cylinder()` = 기본 3D 물체
- `color`, `pos`, `radius`, `size`, `axis` = 물체의 속성

하지만 아직 물체들의 위치를 정확하게 제어하지는 못했습니다. `vector(3, 0, 0)`이 정확히 무엇인지, x·y·z가 각각 어디를 가리키는지 궁금하지 않나요?

**다음 장 "좌표의 비밀 — 3D 공간 이해하기"** 에서는 3D 좌표계를 완전히 이해하고, 물체를 원하는 위치에 정확히 배치하는 방법을 배웁니다. 눈사람도 만들어 볼 거예요! ⛄

> 🌟 **오늘의 한마디**: 여러분은 오늘 코드 몇 줄로 3D 세계를 만들었습니다. 이것은 작은 시작이지만, 모든 위대한 프로그램은 이렇게 시작됩니다. 다음 시간이 기대되지 않나요?
