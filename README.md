Opis funkcjonalności systemu „Budżet domowy / menedżer finansów”

1. Cel projektu

Celem projektu jest stworzenie aplikacji w języku Java umożliwiającej użytkownikowi zarządzanie budżetem domowym poprzez rejestrowanie wydatków, przychodów oraz generowanie szczegółowych raportów finansowych. System ma wspierać świadome planowanie finansów oraz analizę sytuacji ekonomicznej gospodarstwa domowego.

⸻

2. Zakres funkcjonalny

2.1. Zarządzanie kategoriami

System umożliwia definiowanie kategorii dla przychodów i wydatków, np.:
	•	Wydatki: „Jedzenie”, „Mieszkanie”, „Transport”, „Hobby”, „Rachunki”
	•	Przychody: „Pensja”, „Premia”, „Dodatkowe zlecenia”

Funkcje:
	•	tworzenie nowej kategorii,
	•	modyfikowanie nazwy,
	•	usuwanie istniejącej kategorii (o ile nie zawiera powiązanych transakcji),
	•	pobieranie listy kategorii.

⸻

2.2. Rejestrowanie przychodów

Użytkownik może dodawać informacje o każdym uzyskanym przychodzie.

Dane przychodu:
	•	kwota,
	•	data uzyskania,
	•	kategoria,
	•	opis (opcjonalny).

Funkcje:
	•	dodawanie nowego przychodu,
	•	edycja istniejącej pozycji,
	•	usuwanie przychodu,
	•	wyszukiwanie i filtrowanie (po dacie, kategorii, zakresie kwot).

⸻

2.3. Rejestrowanie wydatków

Użytkownik może zapisywać każdą formę wydatku domowego.

Dane wydatku:
	•	kwota,
	•	data poniesienia,
	•	kategoria,
	•	opcjonalny opis.

Funkcje:
	•	dodawanie nowego wydatku,
	•	edycja wydatku,
	•	usuwanie wydatku,
	•	filtrowanie listy wydatków.

⸻

2.4. Balans budżetu

System automatycznie oblicza:
	•	sumę przychodów,
	•	sumę wydatków,
	•	bieżące saldo (przychody – wydatki).

Możliwe jest wyświetlanie salda:
	•	dziennego,
	•	tygodniowego,
	•	miesięcznego,
	•	rocznego,
	•	dla dowolnego zakresu dat.

⸻

2.5. Generowanie raportów

System umożliwia tworzenie raportów finansowych na podstawie danych użytkownika.

Typy raportów:
	1.	Raport miesięczny
	•	suma wydatków i przychodów,
	•	grupowanie według kategorii,
	•	procentowy udział wydatków w budżecie.
	2.	Raport roczny
	•	porównanie miesięcy,
	•	wykres przychody–wydatki (jeśli aplikacja GUI lub plik eksportu).
	3.	Raport kategorii
	•	zestawienie wydatków i przychodów dla wybranej kategorii,
	•	zmiany w czasie.

Funkcje raportów:
	•	generowanie raportu na żądanie,
	•	przeglądanie raportów w aplikacji.

⸻

2.6. Historia i filtrowanie

Użytkownik może przeglądać pełną historię operacji, z możliwością:
	•	filtrowania po typie (przychód / wydatek),
	•	filtrowania po kategorii,
	•	filtrowania po przedziale dat,
	•	sortowania po kwocie, dacie, kategorii.

⸻

2.7. Podstawowe funkcje systemowe
	•	trwałe przechowywanie danych (np. plik JSON, baza H2, SQLite),
	•	obsługa błędów i walidacji danych (np. brak pustych kwot, poprawność dat),
	•	modułowa architektura (np. warstwa modelu, serwisu, repozytorium),
	•	ewentualny interfejs:
	•	konsolowy,
	•	desktopowy (JavaFX/Swing),
	•	webowy (Spring Boot).

⸻

3. Wymagania niefunkcjonalne

3.1. Jakość i niezawodność
	•	Aplikacja musi zapewniać integralność danych.
	•	Operacje CRUD muszą działać szybko i stabilnie.

3.2. Skalowalność

Możliwość bezproblemowego zwiększania ilości danych finansowych.

3.3. Bezpieczeństwo
	•	walidacja danych wejściowych,
	•	możliwość tworzenia kopii zapasowych (opcjonalnie).

3.4. Przenośność
	•	aplikacja powinna działać na dowolnej platformie obsługującej JDK.

⸻