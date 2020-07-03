# banaTECH
Djangoを用いたWebサイトbanaTECHのソースコード
Webアプリやプログラミングやガジェットに関するブログを掲載
現在はLaraveに移行->(https://github.com/bana118/banatech_laravel)

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

2. SEACRET_KEY設定
banatech/banatech/local_settings.pyにSEACRET_KEYを設定

```python:local_settings.py
SECRET_KEY = 自分で設定
```

ランダム生成用プログラム

```python
from django.core.management.utils import get_random_secret_key

secret_key = get_random_secret_key()
text = 'SECRET_KEY = \'{0}\''.format(secret_key)
print(text)
```

3. nginx-app.confをletsencrypt認証用にする

```
> mv nginx-app.conf nginx-app.conf.prod
> mv nginx-app.conf.tmp nginx-app.conf
```

4. デプロイ

```
> sudo docker build -t django-https .
> sudo docker run -d -p 80:80 -p 443:443 -v /home/docker/code:/home/docker/code -v /etc/letsencrypt:/etc/letsencrypt django-https
```

5. letsencrypt認証

```
> apt-get install certbot
> sudo certbot certonly --webroot -w /home/docker/code/banatech/static -d banatech.dip.jp
```

6. nginx-app.confを本番用にする

```
> mv nginx-app.conf nginx-app.conf.temp
> mv nginx-app.conf.prod nginx-app.conf
```

7. 再度デプロイ

```
> sudo docker stop ${container_id}
> sudo docker rm ${exist_container_id}
> sudo docker build -t django-https .
> sudo docker run -d -p 80:80 -p 443:443 -v /home/docker/code:/> home/docker/code -v /etc/letsencrypt:/etc/letsencrypt django-https
```

8. letsencrypt更新確認

```
> sudo certbot renew --force-renew --dry-run --webroot-path /home/docker/code/banatech/static
```

9. letsencrypt自動更新

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
> sudo rm -rf docker/code/*
> sudo cp -pR banatech_django/* docker/code
> sudo docker restart ${container_id}
```

## docker内確認

```
sudo docker exec -i -t ${container_id} bash
```
