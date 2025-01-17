import type { APIRoute } from 'astro'
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server'
import type {
  GenerateRegistrationOptionsOpts,
  VerifyRegistrationResponseOpts,
  RegistrationResponseJSON
} from '@simplewebauthn/server'

const rpID = import.meta.env.WEBAUTHN_RP_ID || 'blog.chumyin.com'
const rpName = import.meta.env.WEBAUTHN_RP_NAME || '美麗的戈壁'
const expectedOrigin = import.meta.env.WEBAUTHN_ORIGIN || 'https://blog.chumyin.com'

// 存儲註冊挑戰（在生產環境中應該使用數據庫或 Redis）
const challengeStore = new Map<string, string>()

export const get: APIRoute = async () => {
  try {
    const userId = '1' // 在實際應用中，這應該是經過身份驗證的用戶 ID

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: Buffer.from(userId),
      userName: 'admin',
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred',
      },
    } as GenerateRegistrationOptionsOpts)

    // 存儲挑戰以供後續驗證
    challengeStore.set(userId, options.challenge)

    return new Response(JSON.stringify(options), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error generating registration options:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as RegistrationResponseJSON
    const userId = '1' // 在實際應用中，這應該是經過身份驗證的用戶 ID
    const expectedChallenge = challengeStore.get(userId)

    if (!expectedChallenge) {
      return new Response(JSON.stringify({ error: 'Challenge not found' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin,
      expectedRPID: rpID,
    } as VerifyRegistrationResponseOpts)

    if (verification.verified && verification.registrationInfo) {
      // 在實際應用中，這裡應該將認證器信息保存到數據庫
      const { credential } = verification.registrationInfo

      // 清理挑戰
      challengeStore.delete(userId)

      return new Response(JSON.stringify({ 
        success: true,
        credentialId: credential.id,
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new Response(JSON.stringify({ error: 'Verification failed' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error verifying registration:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
