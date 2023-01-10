# Chess Helper

## Cel projektu
Celem projektu jest stworzenie programu, pozwlającego na podstawie obrazu (screenu) szachownicy określić aktualny stan rozgrywki oraz zaproponować optymalne zagrania.
## Opis
Po uruchomieniu aplikacji internetowej użytkownik może wgrać zdjęcie szachownicy które następnie jest zeskanowane oraz wyświetlona zostaje pozycja odczytana ze zdjęcia przez aplikacje. Użytkownik może ręcznie edytować pozycje oraz wybrać stronę która ma rozpocząć grę z podanej pozycji.
## Architektura

## Stos technologiczny

## Zespół
- Michał Tomaczyk - GitHub: [link](https://github.com/KiczuPL)
- Daniel Stańkowski - GitHub: [link](https://github.com/Daniel-Stankowski)
- Michał Banaszczak - GitHub: [link](https://github.com/mihawb)
- Paweł Tęcza - GitHub: [link](https://github.com/p-tecza)
- Tomasz Gryczka - GitHub: [link](https://github.com/TomaszGryczka)
- Krzysztof Romański - GitHub: [link](https://github.com/spykur)
## Link do YouTube

## Rozpiska zadań

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

