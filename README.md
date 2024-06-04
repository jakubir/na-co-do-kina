# Projekt "Na co do kina?"

### Autor - Jakub Irla

## Opis projektu

"Na co do kina?" to prosta aplikacja, która ma na celu ułatwienie użytkownikom wyboru filmu do obejrzenia w kinie. Aplikacja oferuje funkcjonalność filtrowania filmów według gatunków, które interesują użytkownika, a także sortowania filmów według różnych kryteriów. Po wybraniu filmu, użytkownik ma możliwość przeczytania jego opisu oraz obejrzenia zwiastunów.

## Jak uruchomić aplikację?

Aby uruchomić aplikację należy wejść na stronę: https://stackblitz.com/~/github.com/jakubir/na-co-do-kina, i poczekać na załadowanie projektu. W przypadku błędu niewyświetlania zdjęć, podgląd należy otworzyć w nowym oknie.

Inną opcją jest pobranie projektu na lokalne urządzenie i użycie kolejno komend:
- npm install
- npm install @angular/cli -g
- ng serve

## Wykorzystane API

Aplikacja korzysta z API dostarczanego przez stronę https://api.themoviedb.org/, która dostarcza informacje o filmach.

## Zależności

Do stworzenia aplikacji wykorzystano następujące narzędzia i biblioteki:
- Angular CLI: 17.3.3
- Angular: 17.3.2
- Bootstrap: 5.3
- Node: 20.12.1

## Wykorzystane funkcjonalności Angular'a

Aplikacja wykorzystuje następujące funkcjonalności:
- Wykorzystanie właściwości Input i Output do komunikacji między komponentami
- Wykorzystanie serwisów
- Wykorzystanie dyrektyw ngIF, ngFor, ngClass, ngStyle
- Wykorzystanie komponentów
- Wykorzystanie routingu
- Wykorzystanie pipe'ów do wyświetlania daty (w polskim formacie)

## Ważne cechy aplikacji 

Oto kilka cech aplikacji, które stanowią jej najciekawszą część:
- Automatyczne ładowanie dodatkowych treści, po przewinięciu na dół strony
- Działające filtry i wyszukiwarka
- Możliwość zobaczenie zwiastuna lub zwiastunów (w postaci karuzeli)
- Wykorzystanie bogate źródła danych w postaci API
- Dynamiczne zmienianie tytułu strony

## Problemy

Źródłem problemów powyższej aplikacji jest zewnętrzne API. Problemy te obejmują przede wszystkim:
- nieaktualne wyniki
- różnice między danymi w poszczególnych endpoitach
- nieprawidłowe kody zwiastunów
- brak tłumaczenia tytułów (wyświetlanie ich w oryginalnej formie)
