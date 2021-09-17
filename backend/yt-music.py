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

if __name__ == '__main__':
    from songAPI.models import Song, Profile
        
# Youtube music login
driver = webdriver.Chrome('chromedriver.exe')
driver.maximize_window()
driver.get("https://www.youtube.com/premium")

# Detecting Login
# 로그인 진행 후에 새창 활성화!!
YOUTUBE_MUSIC = "https://music.youtube.com/"
while True:
    time.sleep(1)
    if(len(driver.window_handles) > 1):
        driver.switch_to.window(driver.window_handles[1])
        if(driver.current_url == YOUTUBE_MUSIC):
            break
        else:
            driver.close()
            driver.switch_to.window(driver.window_handles[0])

while True:
    if "browse" in driver.current_url:
        # Select singer
        data = input('\nSongs will be scraped.\nIf you want to escape, input "quit".\nInput singer_id : ')
        if(data == "quit"):
            driver.get(YOUTUBE_MUSIC)
            continue
        try:
            singer_id = Profile.objects.get(pk=data)
        except Profile.DoesNotExist:
            print("\n[!] There's no profile data.\n[!] You must select another singer_id.")
            print("\n[!] If you want to escape, input 'quit'")
            continue
        except ValueError:
            print("\n[!] Input value must be number type.")
            continue

        # Infinite Scroll
        driver.implicitly_wait(2)
        element = driver.find_element_by_tag_name('body')
        for i in range(0,3):
            element.send_keys(Keys.END)
            time.sleep(1)

        # Scraping Data
        base_url = 'https://youtube.com/'
        soup = BeautifulSoup(driver.page_source, 'lxml')

        lists_secondary = soup.select('div.secondary-flex-columns > yt-formatted-string > a.yt-simple-endpoint')
        lists_title = soup.select('div.title-column > yt-formatted-string > a.yt-simple-endpoint')
        imgtags = soup.select('ytmusic-thumbnail-renderer > yt-img-shadow#image > img#img')

        images = []
        for img in imgtags:
            images.append(img['src'])
        for i in range(len(lists_title)):
            link = lists_title[i]['href']
            if(link is not None):
                link = link[:link.index("&")]
                singer = lists_secondary[i*2].text
                title = lists_title[i].text
                image = images[i].replace("w60", "w544").replace("h60", "h544")                
                Song.objects.create(
                    link = base_url + link,
                    singer = singer,
                    title = title,
                    image = image,
                    singer_id = singer_id
            )
        driver.get(YOUTUBE_MUSIC)
        print("\nData saved.\n")
    elif "channel" in driver.current_url:
        data = input('\nDoes scrap this profile image?\nInput any key to proceed: ')
        if("channel" not in driver.current_url):
            print("\n[!] you are off the page.")
        else:
            print("\nScraping profile image starts.")
            # scraping data
            soup = BeautifulSoup(driver.page_source, 'lxml')
            singer = soup.select_one('div.content-container > yt-formatted-string.title').text
            imgtag = soup.select_one('ytmusic-fullbleed-thumbnail-renderer > picture > source')

            # saving data
            Profile.objects.create(
                singer = singer,
                profile = imgtag['srcset'].replace('w540', 'w1920').replace('h225', 'h800')
            )

            driver.get(YOUTUBE_MUSIC)
            print("\nData saved.\n")