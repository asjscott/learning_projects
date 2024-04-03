from django import forms

class NewItemForm(forms.Form):
    CATEGORIES = [("", ""), ("DIY", "DIY"), ("Fashion", "Fashion"), ("Home", "Home"), ("Sports", "Sports"), ("Toys", "Toys")]
    title = forms.CharField(label='Title ', required=True, max_length=100, widget=forms.TextInput(attrs={
        "class": "form-control",
        "placeholder": "Title"
    }))
    description = forms.CharField(label="Description ", required=True, widget=forms.Textarea(attrs={
        "class": "form-control",
        "placeholder": "Item description",
    }))
    starting_bid = forms.DecimalField(label="Starting Bid ", initial="0.00", widget=forms.NumberInput(attrs={
        "class": "form-control",
        "step": "0.01",
    }))
    image_url = forms.URLField(label="Image URL", required=False, widget=forms.TextInput(attrs={
        "class": "form-control",
        "placeholder": "image url",
    }))
    category = forms.ChoiceField(label="Category ", choices=CATEGORIES, widget=forms.Select(attrs={
        "class": "form-control",
        "placeholder": "Select a category"
    }))
