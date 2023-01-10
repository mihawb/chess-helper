# Chess Helper

## Cel projektu

Głównym celem projektu było stworzenie aplikacji webowej umożliwiającej prostsze analizowanie pozycji szachowej z wykorzystaniem silnika szachowego. Poprzez użycie uczenia maszynowego aplikacja swoje działanie opiera tylko na przesłanym zdjęciu.

## Opis

W przypadku komputerowej analizy pozycji szachowej, gracze w praktycznie każdym przypadku zmuszeni są do ręcznego wprowadzania konfiguracji szachownicy, która ma zostać poddana ewaluacji. Takie rozwiązanie może okazać się monotonne oraz relatywnie czasochłonne. Zdecydowaliśmy się na spróbowanie innego, bardziej przyjaznego podejścia. Sięgamy po uczenie maszynowe.

Cała procedura rozpoczyna się poprzez zamieszczenie zdjęcia / zrzutu ekranu szachownicy, po czym za pomocą image processingu oraz wizji komputerowej dokonywana jest odpowiednia translacja wykrytych figur oraz ich pól do notacji FEN. Efekt tej translacji jest przetwarzany, a następnie generowana jest szachownica, którą użytkownik własnoręcznie może sprawdzić pod kątem poprawności pozycji (oraz nanieść ewentualne poprawki). Gdy sytuacja na planszy będzie odpowiadać sytuacji początkowej, gracz klikając odpowiedni przycisk wywoła przesłanie ustawienia do silnika (Stockfish), który zwróci ocenę pozycji oraz najlepszy ruch.

## Architektura

## Stos technologiczny
-React
-Docker
-Python
-Tensor Flow
-Open cv
## Zespół
- Michał Tomaczyk - GitHub: [link](https://github.com/KiczuPL)
- Daniel Stańkowski - GitHub: [link](https://github.com/Daniel-Stankowski)
- Michał Banaszczak - GitHub: [link](https://github.com/mihawb)
- Paweł Tęcza - GitHub: [link](https://github.com/p-tecza)
- Tomasz Gryczka - GitHub: [link](https://github.com/TomaszGryczka)
- Krzysztof Romański - GitHub: [link](https://github.com/spykur)

## Schemat działania
-użytkownik uruchamia aplikacje
-użytkownik dodaje zdjęcie szachownicy
-użytkownik może poprawić pozycję wyświetloną na stronie oraz wybiera stronę zaczynającą z danej pozycji
-użytkownik otrzymuje informacje jaki ruch jest optymalny w danej pozycji

## Link do demo YT

## How to use the repository
This repository utilises monorepo-like approach with trunk-based development.  
Each module **must** be located in its own root directory.  
Keep all CI/CD workflows in `.github/workflows` directory.  
`release` branch is used only for deployment to Azure Cloud.  

### Before first deployment
1. While creating new resource in Azure Portal choose `main` as deployment branch. This will generate boilerplate for CI/CD workflow.
2. Make necessary changes to the workflow according to module's needs. Remember to set push on `release` branch as trigger for Github Actions.
```
on:
  push:
    branches:
      - release
```
3. Push all recessary changes to `main`.
4. Checkout to `release`, pull all changes from `main`, resolve any merge conflicts and push to `release` branch. This will trigger deployment workflow.
```
git checkout release
git pull origin main
*resolve merge conflicts - which in this case boils down to accepting incoming changes*
git push origin release
```
5. Repeat steps `3.` and `4.` on every other deployment.

