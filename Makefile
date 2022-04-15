embed:
	cat dist/partials/embed.html | pbcopy

deploy:
	rsync -rvzL -i --update --ignore-existing -e ssh dist/ mcc.mi:$(shell date +'%Y')/${PROJ_NAME}

## Must set up gcloud cli to use these commands
bucket:
	gsutil -m rsync -r -x ".DS_Store|partials/" dist/ gs://mc-high-impact/$(shell date +'%Y')/$(notdir $(CURDIR))

test-bucket:
	gsutil -m rsync -n -r -x ".DS_Store|partials/" dist/ gs://mc-high-impact/$(shell date +'%Y')/$(notdir $(CURDIR))

.PHONY: bucket \
		test-bucket   \
		embed  \
		deploy \