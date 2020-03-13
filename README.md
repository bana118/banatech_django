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

1. チェックアウト

```
> git checkout deploy-https
```

2. nginx-app.confをletsencrypt認証用にする

```
> mv nginx-app.conf nginx-app.conf.prod
> mv nginx-app.conf.tmp nginx-app.conf
```

3. デプロイ

```
> sudo docker build -t django-https .
> sudo docker run -d -p 80:80 -p 443:443 -v /home/docker/code:/> home/docker/code -v /etc/letsencrypt:/etc/letsencrypt django-https
```

4. letsencrypt認証

```
> apt-get install certbot
> sudo certbot certonly --webroot -w /home/docker/code/banatech/static -d banatech.dip.jp
```

5. nginx-app.confを本番用にする

```
> mv nginx-app.conf nginx-app.conf.temp
> mv nginx-app.conf.prod nginx-app.conf
```

6. 再度デプロイ

```
> sudo docker rm ${exist_container_id}
> sudo docker build -t django-https .
> sudo docker run -d -p 80:80 -p 443:443 -v /home/docker/code:/> home/docker/code -v /etc/letsencrypt:/etc/letsencrypt django-https
```

7. letsencrypt更新確認

```
> sudo certbot renew --force-renew --dry-run --webroot-path /home/docker/code/banaTECH/static
```

8. letsencrypt自動更新

```
> crontab -e
```
crontabに以下追記

```
0 4 1 * * sudo certbot renew && sudo docker restart ${container_id}
```

## 更新

```
> sudo git pull
> cd ..
> sudo rm -rf code/*
> sudo cp -pR banaTECH/* docker/code
> sudo docker restart ${container_id}
```
