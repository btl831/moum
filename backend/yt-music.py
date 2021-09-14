# [Youtube music crawler]
# "link" : 링크 / "singer" : 가수 이름
# "title" : 곡 제목 / "image" : 썸네일 URL

# pip install
# selenium / beautifulsoup4 / lxml

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

import sys
from os import path
if __name__ == '__main__':
    if __package__ is None:
        sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
        from songAPI.models import Song
        
# Youtube music login
driver = webdriver.Chrome('chromedriver.exe')
driver.maximize_window()
driver.get("https://www.youtube.com/premium")
print("\n로그인 진행 후에 새창 활성화를 해주세요!!!\n")

# Detecting Login
# 로그인 진행 후에 새창 활성화!!
YOUTUBE_MUSIC = "https://music.youtube.com/"
while True:
    time.sleep(1)
    if(len(driver.window_handles) > 1):
        driver.switch_to.window(driver.window_handles[1])
        if(driver.current_url == YOUTUBE_MUSIC):
            driver.get(driver.current_url)
            break
        else:
            driver.close()
            driver.switch_to.window(driver.window_handles[0])

while True:
    if "browse" in driver.current_url:
        # Infinite Scroll
        driver.implicitly_wait(2)
        element = driver.find_element_by_tag_name('body')
        for i in range(0,3):
            element.send_keys(Keys.END)
            time.sleep(1)

        # Scraping data
        base_url = 'https://youtube.com/'
        soup = BeautifulSoup(driver.page_source, 'lxml')

        singer = soup.select_one('div.secondary-flex-columns > yt-formatted-string > a.yt-simple-endpoint').text
        lists_title = soup.select('div.title-column > yt-formatted-string > a.yt-simple-endpoint')
        imgtags = soup.select('ytmusic-thumbnail-renderer > yt-img-shadow#image > img#img')

        images = []
        for img in imgtags:
            images.append(img['src'])

        datalist = []
        for i in range(len(lists_title)):
            link = lists_title[i]['href']
            if(link is not None):
                link = link[:link.index("&")]
                title = lists_title[i].text
                image = images[i].replace("w60", "w544").replace("h60", "h544")
                datalist.append({
                    "link" : base_url + link,
                    "singer" : singer,
                    "title" : title,
                    "image" : image
                })

        # Saving data
        for d in datalist:
            Song.objects.create(
                link = d['link'],
                singer = d['singer'],
                title = d['title'],
                image = d['image']
            )
        driver.get("https://music.youtube.com/")
        print("\nData saved.\n")
        