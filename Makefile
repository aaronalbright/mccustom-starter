embed:
	cat build/embed.html | pbcopy

deploy:
	rsync -rvzL -i --update --ignore-existing -e ssh build/ mia.mi:miamiherald.com/static/media/projects/2019/deploy-test