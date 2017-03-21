import sys
import logging
from django.db import migrations, models
from BucketFactory import Bucket

class Facebook(Bucket):

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.info("Facebook bucket instance")


    def get_token(self, social_account):
        """Get a facebook OAuth2 token"""
        self.logger.info(social_account)
        sys.exit(0)


    def post(self, social_account):
        """New facebook post"""
        pass


    def reshare(self, social_account):
        """Re-shar an existing post given the post url"""
        pass


    def fav(self, social_account):
        """Like an existing post"""
        pass
