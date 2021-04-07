#!/usr/bin/env python
# coding: utf-8

import requests
from bs4 import BeautifulSoup
import re
import random
import csv
import pandas as pd

link = "https://www.elmundo.es/elecciones/elecciones-madrid.html"
contenido = requests.get(link)
contenido = contenido.text
soup = BeautifulSoup(contenido, 'html.parser')

titulares = soup.find_all("div", class_="ue-c-cover-content__main")

with open('titulares.csv', mode='w') as f:
    writer = csv.writer(f, delimiter=';')
    writer.writerow(["titular", "fecha", "diario"])
    for titular in titulares:
        t = titular.h2.text.strip()
        f = titular.a["href"]
        writer.writerow([t, f, "El Mundo"])
