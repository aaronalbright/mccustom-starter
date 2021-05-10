embed:
	cat dist/embed.html | pbcopy

deploy:
	rsync -rvzL -i --update --ignore-existing -e ssh dist/ mcc.mi:2021/${PROJ_NAME}
