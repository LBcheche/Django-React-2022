from django.db.models.signals import pre_save
from django.contrib.auth.models import User

# This function is responsable to set a Signal Receiver (Listiner)
def updateUser(sender, instance, **kwargs):

    # print('Signal Triggered!')
    user = instance
    if user.email != '':
        user.username = user.email
        


# This function is responsable to fire a Signal Receiver 
# when the sender model triggers a pre_save event. 
pre_save.connect(updateUser,sender=User)
