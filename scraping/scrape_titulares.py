#!/usr/bin/env python
# coding: utf-8

# In[27]:


import requests
from bs4 import BeautifulSoup
import re
import random
import csv
import pandas as pd


# In[3]:


link = "https://www.elmundo.es/elecciones/elecciones-madrid.html"
contenido = requests.get(link)
contenido = contenido.text
soup = BeautifulSoup(contenido, 'html.parser')


# In[15]:


titulares = soup.find_all("div", class_="ue-c-cover-content__main")


# In[25]:


print(titulares[0].a["href"].strip())


# In[26]:


with open('titulares_EM.csv', mode='w') as f:
    writer = csv.writer(f, delimiter=';')
    writer.writerow(["titular", "fecha", "diario"])
    for titular in titulares:
        t = titular.h2.text.strip()
        f = titular.a["href"]
        writer.writerow([t, f, "El Mundo"])


# In[29]:


df = pd.read_csv("titulares_EM.csv", sep=";")


# In[30]:


df.head()


# In[ ]:




