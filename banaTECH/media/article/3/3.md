# 関数呼び出しからGUI上に画像を表示できない
少しはまったので

# やりたいこと
pythonを使い、ボタンを押したらファイルダイアログを開いて選択した画像ファイルをウィンドウ上に表示する

# 詰まったところ

```python:gui.py
#-*- coding: utf-8 -*-
import os, sys
import re
import tkinter as tk
import PIL
from PIL import Image, ImageTk
from tkinter import messagebox, filedialog

def pushed():
    fileType = [("png", "*.png"), ("jpg", "*jpg")] #画像の種類を選択
    iDir = "/Users/Desktop/"
    f = filedialog.askopenfilename(filetypes = fileType, initialdir = iDir)
    if re.match(r"(.*)\.png", f) :
        print("pngです")
        img = Image.open(open(str(f),"rb"))
        img.thumbnail((200,200), Image.ANTIALIAS)
        img = ImageTk.PhotoImage(img)
        canvas = tk.Canvas(bg="white", width=200, height=200)
        canvas.place(x=100, y=100)
        canvas.create_image(0,0,image=img, anchor=tk.NW)
    elif re.match(r"(.*)\.jpg", f) :
        print("jpgです")
        img = Image.open(open(str(f),"rb"))
        img.thumbnail((200,200), Image.ANTIALIAS)
        img = ImageTk.PhotoImage(img)
        canvas = tk.Canvas(bg="white", width=200, height=200)
        canvas.place(x=100, y=100)
        canvas.create_image(0,0,image=img, anchor=tk.NW)
    else :
        print("それ以外です")


def run ():
    root = tk.Tk()
    root.title("画像の表示")
    root.geometry("800x600+1000+10")
    root.protocol("WM_DELETE_WINDOW", root.quit)
    button = tk.Button(root,text="ファイル送信",command=pushed)
    button.pack()
    root.mainloop()

if __name__ == "__main__":
    run()
```

色々Tkinterについて調べたらこんな感じかなーと書いてみたら、うまくいかない。ファイルを選択してpng,jpg,それ以外かは判別されているが、画像が表示されず背景として設定した白一色になってしまう。また不思議なことに関数ではなく起動時に画像を表示するようにしたら表示された。
そしたらこんなブログを見つけた。
[tkinter.PhotoImageとガベージコレクション-神野さんに言われました。](http://sesenosannko.hatenablog.com/entry/2016/11/15/162430)
これによると関数先でcanvasを表示させようとすると画像の入った変数がガベージコレクションによって削除されてしまうようだ。削除されないためには画像の入った変数(今回の場合img)をグローバル変数にすればよいと。よって改善案はこんな感じ

```python:qiita.py
#-*- coding: utf-8 -*-
import os, sys
import re
import tkinter as tk
import PIL
from PIL import Image, ImageTk
from tkinter import messagebox, filedialog


def pushed():
    global img
    fileType = [("png", "*.png"), ("jpg", "*jpg")] #画像の種類を選択
    iDir = "/Users/Desktop/"
    f = filedialog.askopenfilename(filetypes = fileType, initialdir = iDir)
    if re.match(r"(.*)\.png", f) :
        print("pngです")
        img = Image.open(open(str(f),"rb"))
        img.thumbnail((200,200), Image.ANTIALIAS)
        img = ImageTk.PhotoImage(img)
        canvas = tk.Canvas(bg="white", width=200, height=200)
        canvas.place(x=100, y=100)
        canvas.create_image(0,0,image=img, anchor=tk.NW)
    elif re.match(r"(.*)\.jpg", f) :
        print("jpgです")
        img = Image.open(open(str(f),"rb"))
        img.thumbnail((200,200), Image.ANTIALIAS)
        img = ImageTk.PhotoImage(img)
        canvas = tk.Canvas(bg="white", width=200, height=200)
        canvas.place(x=100, y=100)
        canvas.create_image(0,0,image=img, anchor=tk.NW)
    else :
        print("それ以外です")


def run ():
    global root
    root = tk.Tk()
    root.title("画像の表示")
    root.geometry("800x600+1000+10")
    root.protocol("WM_DELETE_WINDOW", root.quit)
    button = tk.Button(root,text="ファイル送信",command=pushed)
    button.pack()
    root.mainloop()

if __name__ == "__main__":
    run()
```
def pushed()のimgをglobalにしただけだがこれでちゃんと動いた。pillowを使って画像のリサイズも行っている。pngとjpgで処理を分けているのは当初jpgは変換処理が必要と勘違いしていたためで意味はないです。

# まとめ
Tkinterで関数を使って画像を表示させたい場合画像を入れる変数はglobalにする。
こんな誰でもやりそうな処理でこんなにてこずるとは思わなかった。
あとvscodeのpylintではimg.thumbnailでそんなのないよ！と言われるが無視してかまわない。
