'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

import { MdEmail, MdPassword } from "react-icons/md"
import { Button, Input } from "@material-tailwind/react"
import { User } from "@/lib/types"
import { useUser } from "@/lib/globalStore"
import AlertDialog from "@/components/AlertDialog"
import { useRouter } from "next/navigation"

function Login() {
  const user = useUser()
  const router = useRouter()

  const [form, setForm] = useState<{ email?: string, password?: string }>({})

  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<{ state: boolean, message: string } | null>(null)

  useEffect(() => {
    if (user.value.id) {
      router.push('/organization');
    }

  }, [user.value])

  const Submit = async () => {
    if (!form.email) return;
    if (!form.password) return;

    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if (res.status === 200) {
      const userdata: User = await res.json();
      user.write({
        id: userdata.id,
        role: userdata.role,
        email: userdata.email,
        username: userdata.username
      });

      setStatus({ state: true, message: '[AuthAPI]: Successfully Registered!' });
    }
    else {
      setStatus({ state: false, message: '[AuthAPI]: Invalid Credentials!' });
    }

    setLoading(false);
  }

  return (
    <div className="w-full h-full flex flex-col center">
      <div className="w-full 2xl:w-1/5">
        <AlertDialog
          show={status ? true : false}
          onClose={() => setStatus(null)}
          isError={status ? status.state : undefined}
          color={status !== null ? status.state ? 'green' : 'red' : undefined}
          message={status ? status.message : undefined}
        />
      </div>
      <div className="w-full 2xl:w-1/5 p-8 border rounded-lg shadow-sm bg-gray-50 text-blue-gray-500">
        <div className="w-full my-5">
          <div className="text-3xl text-center font-semibold">Login</div>
        </div>

        <form action="" className="w-full my-10">
          <div className="w-full my-5">
            <Input
              required
              label="Email"
              type="text"
              icon={<MdEmail />}
              onChange={(ev) => setForm({ ...form, email: ev.target.value })}
            />
          </div>

          <div className="w-full my-5">
            <Input
              required
              label="Password"
              type="password"
              icon={<MdPassword />}
              onChange={(ev) => setForm({ ...form, password: ev.target.value })}
            />
          </div>

          <div className="w-full my-5">
            <Button
              fullWidth
              loading={loading}
              className="row center"
              onClick={() => Submit()}
            >
              <span>Login</span>
            </Button>
          </div>

          <div className="w-full my-5 text-center">
            <span className="mr-1">Don't have an account?</span>
            <Link href={'/register'} className="text-base text-blue-400 hover:underline">
              Create One
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login