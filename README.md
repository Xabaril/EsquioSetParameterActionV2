# Esquio (V2) Github Action set toggle parameter value for feature

With this Esquio Github action you can set a parameter value for a toggle in a feature in an Github Actions workflow.[Esquio](https://esquio.readthedocs.io/en/latest/).

Please read [Esquio readthedocs](https://esquio.readthedocs.io/en/latest/) first to fully understand Esquio Feature Toggle package configuration and possibilities.

## Parameters needed

- **esquioUrl**: Url to the ESquio Api. i.e.: https://myesquioui.deployment.com
- **esquioApiKey**: API key to authenticate to esquio. Recommended to store as [Github secret](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables)
- **productName**: Name of the product to which the feature belongs.
- **featureName**: Name of the feature to chich the toggle belongs.
- **toggleType**: Type of the toggle to set the parameter value.
- **parameterName**: Name of the parameter inside the toggle.
- **value**: Value to set to the parameter.

## Example

```YAML
      - name: Esquio rollout
        uses: actions/esquio-rollout
        id: esquio-rollout
        with:
          esquioUrl: 'https://esquiodemoui.azurewebsites.net/'
          esquioApiKey: ${{ secrets.apikey }}
          productName: 'Default'
          featureName: 'MatchScore'
          toggleType: 'Esquio.Toggles.GradualRolloutUserNameToggle,Esquio'
          parameterName: 'Percentage'
          value: '56'
```
