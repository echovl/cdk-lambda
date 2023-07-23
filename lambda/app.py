import json

from whisper import Whisper


def lambda_handler(event, context):
    whisper = Whisper()
    transcript = whisper.transcribe("https://dl.sndup.net/fq8z/audio.mp3")

    return {
        "statusCode": 200,
        "body": json.dumps(transcript),
    }
