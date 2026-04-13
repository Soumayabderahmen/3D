<?php
namespace App\Services;

use Twilio\Rest\Client;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    public function send(string $message)
    {
        try {
            $client = new Client(
                env('TWILIO_SID'),
                env('TWILIO_AUTH_TOKEN')
            );

            $client->messages->create(
                env('ADMIN_PHONE'),
                [
                    'from' => env('TWILIO_WHATSAPP_FROM'),
                    'body' => $message,
                ]
            );

            Log::info("WhatsApp message sent successfully.");

        } catch (\Exception $e) {
            Log::error("WhatsApp send failed: " . $e->getMessage());
        }
    }
}
