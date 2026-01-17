# Finance Manager - System Zarządzania Budżetem Domowym

Projekt zaliczeniowy z przedmiotu: **Programowanie Obiektowe / Inżynieria Oprogramowania**.

Aplikacja służy do zarządzania budżetem domowym w modelu "Rodzinnym" (wspólne saldo, wielu domowników). System składa się z backendu napisanego w Java Spring Boot oraz nowoczesnej warstwy wizualnej zbudowanej w React z TypeScript.

---

## 📋 Cel Projektu

Celem projektu jest stworzenie aplikacji umożliwiającej użytkownikowi zarządzanie budżetem domowym poprzez rejestrowanie wydatków, przychodów oraz generowanie szczegółowych raportów finansowych. System ma wspierać świadome planowanie finansów oraz analizę sytuacji ekonomicznej gospodarstwa domowego.

---

## 🌟 Główne Funkcjonalności

### 1. Zarządzanie Budżetem Rodzinnym
* **Wspólne Saldo:** Wszystkie przychody i wydatki sumują się do jednego, globalnego portfela rodziny.
* **Wielu Użytkowników:** System obsługuje transakcje wykonywane przez różnych domowników (np. Mama, Tata, Dzieci).
* **Weryfikacja Tożsamości:** Każda operacja dodania środków lub wydatku wymaga podania prostego hasła użytkownika.

### 2. Obsługa Transakcji (Polimorfizm)
* **Rejestracja Przychodów (Income):** Możliwość dodawania wpływów z określeniem kategorii (np. `SALARY`, `GIFT`, `BUSINESS`, `INVESTMENT`, `RENTAL`, `BENEFIT`, `SALE`, `OTHER_INCOME`).
* **Rejestracja Wydatków (Expense):** Możliwość dodawania kosztów z określeniem kategorii (np. `HOUSING`, `FOOD`, `TRANSPORT`, `HEALTH`, `EDUCATION`, `ENTERTAINMENT`, `SHOPPING`, `INSURANCE`, `DEBT_PAYMENT`, `PERSONAL_CARE`, `TRAVEL`, `OTHER_EXPENSE`).
* **Kategoryzacja:** Ścisły podział typów operacji za pomocą typów wyliczeniowych (Enum).

### 3. Logika Biznesowa i Walidacja
* **Blokada Ujemnego Salda:** System nie pozwoli dodać wydatku, jeśli na wspólnym koncie brakuje środków (rzucany jest wyjątek `BudgetException`).
* **Walidacja Kwot:** Kwoty transakcji muszą być dodatnie.
* **Historia Operacji:** Pełny wgląd w listę transakcji z informacją o tym, kto, kiedy i na co wydał pieniądze.

### 4. Dane Startowe (Data Seeding)
* **Automatyczna Inicjalizacja:** Przy każdym uruchomieniu aplikacja automatycznie tworzy zestaw 4 domyślnych użytkowników, gotowych do działania.

### 5. Interfejs Użytkownika
* **Nowoczesny interfejs React:** Intuicyjna warstwa wizualna z panelem bocznym i responsywnym designem.
* **Filtrowanie transakcji:** Możliwość wyszukiwania transakcji po kategorii i użytkowniku.
* **Automatyczne odświeżanie:** Saldo i lista transakcji aktualizują się automatycznie po dodaniu nowej transakcji.

---

## 🏗️ Architektura Systemu

System został zaprojektowany zgodnie z zasadami **OOP** oraz architekturą warstwową:

### Backend (Java Spring Boot)
* **Controller** — warstwa prezentacji (REST API endpoints)
* **Service** — logika biznesowa i walidacja
* **Repository** — warstwa dostępu do danych (abstrakcja)
* **Model** — modele domenowe (encje)

### Frontend (React + TypeScript)
* **Components** — komponenty UI
* **Hooks** — logika biznesowa i komunikacja z API
* **Types** — definicje typów TypeScript

---

## 🔧 Backend (Java Spring Boot)

### 📋 Opis Projektu

System jest aplikacją typu REST API napisaną w języku Java (Spring Boot). Backend realizuje logikę biznesową zarządzania finansami, dbając o spójność danych, walidację operacji oraz poprawne mapowanie obiektowe. Projekt został zaprojektowany zgodnie z zasadami **OOP** oraz architekturą warstwową (Controller - Service - Repository - Model).

### 🏛️ Zastosowanie OOP (Programowania Obiektowego)

W projekcie położono główny nacisk na poprawne modelowanie obiektowe:

1. **Dziedziczenie i Abstrakcja:**
   * Klasa abstrakcyjna `Transaction` definiuje wspólny stan (kwota, opis, data, użytkownik).
   * Klasy `Income` oraz `Expense` dziedziczą po `Transaction`, rozszerzając ją o specyficzne kategorie.

2. **Polimorfizm:**
   * Serwis operuje na liście ogólnej `List<Transaction>`, ale zachowanie (np. typ transakcji w JSON) zależy od konkretnej instancji obiektu.
   * Metoda `calculateGlobalBalance()` wykorzystuje `instanceof` do rozróżnienia typów transakcji.

3. **Hermetyzacja:**
   * Pola klas są prywatne, dostęp odbywa się przez metody dostępowe. Logika biznesowa jest ukryta w Serwisie, a nie w Kontrolerze.

4. **Interfejsy:**
   * `TransactionRepository` definiuje kontrakt dla warstwy danych, umożliwiając łatwą wymianę implementacji (np. z In-Memory na bazę danych).

### 🛠️ Stack Technologiczny

* **Język:** Java 17
* **Framework:** Spring Boot 3.2.1
* **Baza danych:** In-Memory (Java Collections API - `ConcurrentHashMap`)
* **Budowanie:** Maven
* **API:** REST / JSON

### 📂 Struktura Plików Backend

```text
src/main/java/app/
├── BudgetApplication.java              # Main + Konfiguracja użytkowników (CommandLineRunner)
├── controller/
│   └── BudgetController.java          # Endpointy REST API
├── service/
│   └── BudgetService.java             # Logika biznesowa, walidacja, autentykacja
├── model/
│   ├── User.java                      # Model użytkownika
│   ├── Transaction.java               # Klasa abstrakcyjna transakcji
│   ├── Income.java                    # Klasa przychodu (dziedziczy po Transaction)
│   └── Expense.java                   # Klasa wydatku (dziedziczy po Transaction)
├── enums/
│   ├── IncomeCategory.java            # Kategorie przychodów (Enum)
│   └── ExpenseCategory.java          # Kategorie wydatków (Enum)
├── repository/
│   ├── TransactionRepository.java     # Interfejs repozytorium
│   └── InMemoryTransactionRepository.java  # Implementacja In-Memory
└── exception/
    ├── BudgetException.java           # Wyjątek domenowy
    ├── ErrorResponse.java             # Model odpowiedzi błędu
    └── GlobalExceptionHandler.java    # Globalna obsługa wyjątków
```

### 🔌 Endpointy REST API

Base URL: `http://localhost:8080/api/budget`

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/users` | Pobieranie listy wszystkich użytkowników |
| GET | `/transactions` | Pobieranie wszystkich transakcji |
| GET | `/balance` | Pobieranie aktualnego salda budżetu |
| POST | `/income` | Dodawanie przychodu (wymaga: userId, password, amount, description, category) |
| POST | `/expense` | Dodawanie wydatku (wymaga: userId, password, amount, description, category) |

### 🔒 Walidacja i Bezpieczeństwo

* **Autentykacja użytkownika:** Każda operacja wymaga podania poprawnego hasła użytkownika.
* **Walidacja kwot:** Kwoty muszą być dodatnie, w przeciwnym razie rzucany jest `BudgetException`.
* **Kontrola salda:** Wydatki nie mogą przekroczyć dostępnego salda (wspólny budżet rodzinny).
* **Obsługa błędów:** Globalny handler przechwytuje wyjątki i zwraca odpowiednie odpowiedzi HTTP.

### 🚀 Uruchomienie Backendu

```bash
# Uruchomienie aplikacji Spring Boot
mvn spring-boot:run

# Lub w IDE (IntelliJ IDEA / Eclipse)
# Uruchom klasę BudgetApplication.java
```

Aplikacja będzie dostępna pod adresem `http://localhost:8080`.

---

## 🎨 Frontend (React + TypeScript)

Aplikacja posiada nowoczesną warstwę wizualną zbudowaną w React z TypeScript, która zapewnia intuicyjny interfejs użytkownika do zarządzania budżetem domowym.

### 🛠️ Technologie

Frontend został zbudowany przy użyciu następujących technologii:
* **React 19.2.0** — biblioteka do budowy interfejsów użytkownika
* **TypeScript** — typowanie statyczne dla bezpieczeństwa kodu
* **Vite** — narzędzie do szybkiego budowania i rozwoju aplikacji
* **Tailwind CSS 4.1.18** — framework CSS do stylizacji
* **@tanstack/react-query** — zarządzanie stanem serwera i cache'owaniem (zależność zainstalowana, gotowa do użycia)

### 🏗️ Architektura Komponentów

Aplikacja wykorzystuje architekturę opartą na komponentach funkcyjnych z custom hooks do zarządzania logiką biznesową i komunikacją z API.

#### Komponenty Główne

* **App.tsx** — główny komponent aplikacji zarządzający stanem logowania i layoutem
* **Login.tsx** — komponent logowania z wyborem użytkownika i weryfikacją hasła
* **BalanceDisplay.tsx** — wyświetlanie aktualnego salda budżetu (zielone/czerwone w zależności od wartości)
* **TransactionForm.tsx** — formularz dodawania nowych transakcji (przychodów i wydatków)
* **TransactionList.tsx** — lista wszystkich transakcji z możliwością filtrowania

#### Custom Hooks

Aplikacja wykorzystuje custom hooks do enkapsulacji logiki komunikacji z API:

* **useApi.ts** — bazowy hook do wykonywania zapytań HTTP (GET, POST, DELETE)
* **useUsers.ts** — pobieranie listy użytkowników
* **useTransactions.ts** — pobieranie i zarządzanie transakcjami
* **useBalance.ts** — pobieranie aktualnego salda
* **useAddTransaction.ts** — dodawanie nowych transakcji (przychodów/wydatków)

#### Typy TypeScript

Wszystkie modele danych są zdefiniowane w `types/index.ts`:
* **User** — model użytkownika
* **Transaction** — model transakcji
* **ExpenseCategory** — kategorie wydatków (HOUSING, FOOD, TRANSPORT, HEALTH, EDUCATION, ENTERTAINMENT, SHOPPING, INSURANCE, DEBT_PAYMENT, PERSONAL_CARE, TRAVEL, OTHER_EXPENSE)
* **IncomeCategory** — kategorie przychodów (SALARY, BUSINESS, INVESTMENT, RENTAL, GIFT, BENEFIT, SALE, OTHER_INCOME)
* **Balance** — model salda budżetu

### 📐 Layout Aplikacji

Aplikacja wykorzystuje layout z panelem bocznym (sidebar):

* **Header** — górny pasek z tytułem aplikacji, informacją o zalogowanym użytkowniku i przyciskiem wylogowania
* **Sidebar (lewa strona, 320px)** — panel boczny zawierający:
  - Wyświetlanie salda budżetu
  - Formularz dodawania transakcji
* **Main content (prawa strona)** — główna zawartość z:
  - Listą wszystkich transakcji
  - Filtrowaniem po kategorii i użytkowniku

### ⚙️ Funkcjonalności Interfejsu

#### Logowanie
* Wybór użytkownika z listy rozwijanej
* Wprowadzanie hasła
* Weryfikacja po stronie klienta
* Wyświetlanie błędów w przypadku nieprawidłowych danych

#### Wyświetlanie Salda
* Automatyczne obliczanie i wyświetlanie aktualnego salda
* Kolorowe oznaczenie: zielone dla dodatniego salda, czerwone dla ujemnego
* Automatyczne odświeżanie po dodaniu transakcji

#### Dodawanie Transakcji
* Wybór typu transakcji (Przychód/Wydatek)
* Wybór kategorii odpowiedniej dla typu transakcji
* Wprowadzanie kwoty (walidacja wartości dodatnich)
* Wprowadzanie opisu transakcji
* Automatyczne odświeżanie salda i listy transakcji po dodaniu
* Wyświetlanie komunikatów o sukcesie/błędzie

#### Lista Transakcji
* Tabelaryczne wyświetlanie wszystkich transakcji z następującymi kolumnami:
  - Data i godzina
  - Typ transakcji (Przychód/Wydatek) z kolorowym oznaczeniem
  - Użytkownik
  - Kategoria
  - Opis
  - Kwota (zielona dla przychodów, czerwona dla wydatków)
* Filtrowanie po kategorii — wybór z listy dostępnych kategorii
* Filtrowanie po użytkowniku — wybór z listy użytkowników
* Możliwość wyczyszczenia filtrów (opcja "Wszystkie")
* Automatyczne odświeżanie po dodaniu nowej transakcji

### 🔄 Zarządzanie Stanem

Aplikacja wykorzystuje podejście oparte na React hooks z centralnym zarządzaniem stanem w komponencie `App`:

* **Stan logowania** — zarządzany lokalnie w `App`
* **Stan transakcji** — zarządzany przez hook `useTransactions` w `App`, przekazywany jako props
* **Stan salda** — zarządzany przez hook `useBalance` w `App`, przekazywany jako props
* **Automatyczne odświeżanie** — po dodaniu transakcji następuje automatyczne odświeżenie zarówno salda, jak i listy transakcji

### 🎨 Stylizacja

Aplikacja wykorzystuje Tailwind CSS do stylizacji:

* **Responsywny design** — layout dostosowuje się do różnych rozmiarów ekranu
* **Spójny system kolorów** — zielony dla przychodów/dodatniego salda, czerwony dla wydatków/ujemnego salda
* **Nowoczesny wygląd** — czyste, minimalistyczne interfejsy z odpowiednimi cieniami i obramowaniami
* **Interaktywność** — hover effects, focus states, transitions

### 🚀 Uruchomienie Frontendu

```bash
cd frontend
npm install  # lub yarn install
npm run dev  # lub yarn dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173` (domyślny port Vite).

**Uwaga:** Backend musi być uruchomiony na porcie 8080, aby aplikacja mogła komunikować się z API.

---

## 🚀 Uruchomienie Całej Aplikacji

### Krok 1: Uruchomienie Backendu

```bash
# W głównym katalogu projektu
mvn spring-boot:run
```

Backend będzie dostępny pod adresem `http://localhost:8080`.

### Krok 2: Uruchomienie Frontendu

```bash
# W katalogu frontend
cd frontend
npm install  # lub yarn install
npm run dev  # lub yarn dev
```

Frontend będzie dostępny pod adresem `http://localhost:5173`.

### Krok 3: Użycie Aplikacji

1. Otwórz przeglądarkę i przejdź do `http://localhost:5173`
2. Wybierz użytkownika z listy (np. "Tata", "Mama", "Syn", "Córka")
3. Wprowadź odpowiednie hasło:
   - Tata: `admin123`
   - Mama: `mama2024`
   - Syn: `minecraft`
   - Córka: `kotki`
4. Po zalogowaniu możesz:
   - Przeglądać aktualne saldo
   - Dodawać przychody i wydatki
   - Przeglądać historię transakcji
   - Filtrować transakcje po kategorii i użytkowniku

---

## 📝 Zakres Funkcjonalny (Planowany)

### Zarządzanie Kategoriami
System umożliwia definiowanie kategorii dla przychodów i wydatków. Funkcje:
* Tworzenie nowej kategorii
* Modyfikowanie nazwy
* Usuwanie istniejącej kategorii (o ile nie zawiera powiązanych transakcji)
* Pobieranie listy kategorii

### Generowanie Raportów
System umożliwia tworzenie raportów finansowych na podstawie danych użytkownika.

Typy raportów:
1. **Raport miesięczny:**
   * Suma wydatków i przychodów
   * Grupowanie według kategorii
   * Procentowy udział wydatków w budżecie

2. **Raport roczny:**
   * Porównanie miesięcy
   * Wykres przychody–wydatki

3. **Raport kategorii:**
   * Zestawienie wydatków i przychodów dla wybranej kategorii
   * Zmiany w czasie

Funkcje raportów:
* Generowanie raportu na żądanie
* Przeglądanie raportów w aplikacji

---

## 📄 Licencja

Projekt zaliczeniowy — do użytku edukacyjnego.
