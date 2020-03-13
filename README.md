# banaTECH
Djangoを用いたWebサイトbanaTECHのソースコード
Webアプリやプログラミングやガジェットに関するブログを掲載
URL:https://banatech.dip.jp

## ローカルでの実行
　
```
> python banatech/manage.py runserver
```

## 管理ユーザー作成

```
> python banatech/manage.py createsuperuser
```

## データベース作成

```
> python banatech/manage.py makemaigration
> python banatech/manage.py migrate
```

## 新規アプリケーション作成

```
> python banatech/manage.py startapp ${appname}
```

## デプロイ(docker)

### nginx-app.confをletsencrypt認証用にする

```
> git checkout deploy-https
> sudo docker build -t django-https .
> sudo docker run -d -p 80:80 -p 443:443 -v /home/docker/code:/> home/docker/code -v /etc/letsencrypt:/etc/letsencrypt django-https
```



